from fastapi import FastAPI, HTTPException, Path, Depends, Query
from typing import Annotated, List, Optional
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models for Creation
class ProductCreate(BaseModel):
   product_name: str
   inventory_count: int
   description: str
   price: float
   category_id: int
   subcategory_id: int
   # Include nutrition directly
   serve_size: str # eg. 2 tbsp (30g)
   calories: int
   protein: float # in grams (g)
   sodium: float # in miligrams (g)
   fiber: float # in grams (g)
   sugar: float # in grams (g)
class CategoryCreate(BaseModel):
   category_name: str
class SubCategoryCreate(BaseModel):
   sb_category_name: str
   category_id: int # foreign key
class ProductImageCreate(BaseModel):
   image_URL: str # Use from Amazon/Wholefoods
   image_sequence: int # Meta images, 0 is main

# Pydantic models
class ProductModel(BaseModel):
   product_id: int
   product_name: str
   inventory_count: int
   description: str
   price: float
   category_id: int
   subcategory_id: int
   main_image_url: Optional[str] = None

   class Config:
      orm_mode = True
      from_attributes = True
class CategoryModel(BaseModel):
   category_id: int
   category_name: str

   class Config:
      orm_mode = True
class SubCategoryModel(BaseModel):
   sb_category_id: int
   category_id: int
   sb_category_name: str

   class Config:
      orm_mode = True
class NutritionModel(BaseModel):
   nutrition_id: int
   serve_size: str # eg. 2 tbsp (30g)
   calories: int
   protein: float # in grams (g)
   sodium: float # in miligrams (g)
   fiber: float # in grams (g)
   sugar: float # in grams (g)

   class Config:
      orm_mode = True
class ProductImageModel(BaseModel):
   image_id: int
   product_id: int
   image_URL: str
   image_sequence: int

   class Config:
      orm_mode = True
class ProductDetailModel(BaseModel):
   product: ProductModel
   images: List[ProductImageModel]
   nutrition: Optional[NutritionModel]
   category_id: int
   category_name: str
   subcategory_id: int
   sub_category_name: str
class ProductSearchResponse(BaseModel):
   products: List[ProductModel]
   total: int
   page: int
   itemsPerPage: int
class SubCategoryWithProducts(BaseModel):
   subcategory_id: int
   subcategory_name: str
   products: List[ProductModel]


def get_db():
   db = SessionLocal()
   try:
      yield db
   finally:
      db.close()

db_dependency = Annotated[Session, Depends(get_db)]

#models.Base.metadata.drop_all(bind=engine) # CLEARS PRODUCT DB
models.Base.metadata.create_all(bind=engine)

@app.get("/products/", response_model=List[ProductModel])
async def read_products(db: db_dependency, skip: int = 0, limit: int = 100):
   products_with_images = db.query(
      models.Product,
      models.ProductImage.image_URL.label('main_image_url')
   ).join(
      models.ProductImage,
      (models.ProductImage.product_id == models.Product.product_id) & (models.ProductImage.image_sequence == 0),
      isouter=True  # Use outer join to include products without images
   ).offset(skip).limit(limit).all()

   return [
      ProductModel(
         product_id=product.product_id,
         product_name=product.product_name,
         inventory_count=product.inventory_count,
         description=product.description,
         price=product.price,
         category_id=product.category_id,
         subcategory_id=product.subcategory_id,
         main_image_url=main_image_url
        ) for product, main_image_url in products_with_images
   ]

@app.post("/products/", response_model=ProductModel)
async def create_product(product: ProductCreate, db: Session = Depends(get_db)):
   db_product = models.Product(
      product_name=product.product_name,
      inventory_count=product.inventory_count,
      description=product.description,
      price=product.price,
      category_id=product.category_id,
      subcategory_id=product.subcategory_id
   )
   db.add(db_product)
   db.commit()

   # Create the nutrition label for the product
   db_nutrition = models.Nutrition(
      product_id=db_product.product_id,
      serve_size=product.serve_size,
      calories=product.calories,
      protein=product.protein,
      sodium=product.sodium,
      fiber=product.fiber,
      sugar=product.sugar
   )
   db.add(db_nutrition)
   db.commit()
   db.refresh(db_product)

   return db_product

@app.get("/categories/", response_model=List[CategoryModel])
async def read_categories(db: db_dependency, skip: int = 0, limit: int = 100):
   categories = db.query(models.Category).offset(skip).limit(limit).all()
   return categories

@app.post("/categories/", response_model=CategoryModel)
async def create_category(category: CategoryCreate, db: db_dependency):
   db_category = models.Category(category_name = category.category_name)
   db.add(db_category)
   db.commit()
   db.refresh(db_category)
   return db_category

@app.get("/subcategories/", response_model=List[SubCategoryModel])
async def read_subcategories(db: db_dependency, skip: int = 0, limit: int = 100):
   subcategories = db.query(models.SubCategory).offset(skip).limit(limit).all()
   return subcategories

@app.post("/subcategories/", response_model=SubCategoryModel)
async def create_subcategory(subcategory: SubCategoryCreate, db: Session = Depends(get_db)):
   # Check if the category exists
   db_category = db.query(models.Category).filter(models.Category.category_id == subcategory.category_id).first()
   if not db_category:
      raise HTTPException(status_code=404, detail=f"Category with id {subcategory.category_id} not found")
   
   # Create new SubCategory
   db_subcategory = models.SubCategory(
      sb_category_name = subcategory.sb_category_name,
      category_id = subcategory.category_id
   )
   db.add(db_subcategory)
   db.commit()
   db.refresh(db_subcategory)
   return db_subcategory

@app.get("/nutrition/", response_model=List[NutritionModel])
async def read_nutrition(db: db_dependency, skip: int = 0, limit: int = 100):
   nutrition_labels = db.query(models.Nutrition).offset(skip).limit(limit).all()
   return nutrition_labels

"""@app.post("/nutrition/", response_model=NutritionModel)
async def create_nutrition(nutrition: NutritionCreate, db: Session = Depends(get_db)):
   # Check if the Product exists
   db_product = db.query(models.Product).filter(models.Product.product_id == nutrition.product_id).first()
   if not db_product:
      raise HTTPException(status_code=404, detail=f"Product with id {nutrition.product_id} not found")
   
   # Create new Nutrition Label
   db_nutrition = models.Nutrition(
      product_id = nutrition.product_id,
      serve_size = nutrition.serve_size,
      calories = nutrition.calories,
      protein = nutrition.protein,
      sodium = nutrition.sodium,
      fiber = nutrition.fiber,
      sugar = nutrition.sugar
   )
   db.add(db_nutrition)
   db.commit()
   db.refresh(db_nutrition)
   return db_nutrition"""

@app.post("/products/{product_id}/images/", response_model=ProductImageModel)
def create_product_image(product_id: int, image: ProductImageCreate, db: Session = Depends(get_db)):
    # First, check if the product exists
    db_product = db.query(models.Product).filter(models.Product.product_id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail=f"Product with id {product_id} not found")

    # Now create the new ProductImage
    db_image = models.ProductImage(
        product_id=product_id,
        image_URL=image.image_URL,
        image_sequence=image.image_sequence
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image

# CONTEXTUAL INDIVIDUAL CALLS

# =============== for individual category Page show all products =============================
@app.get("/api/categories/{category_id}/subcategories/", response_model=List[SubCategoryWithProducts])
def get_subcategories_with_products(category_id: int, db: Session = Depends(get_db)):
    subcategories = db.query(
       models.SubCategory
       ).filter(
         models.SubCategory.category_id == category_id).all()
    
    if not subcategories:
        raise HTTPException(status_code=404, detail="Category not found or no subcategories found")

    result = []
    for subcategory in subcategories:
        products_with_images = []
        products = db.query(models.Product).filter(models.Product.subcategory_id == subcategory.sb_category_id).all()

        for product in products:
            # Get the main image (image_sequence = 0)
            main_image = db.query(models.ProductImage).filter(
               models.ProductImage.product_id == product.product_id,
               models.ProductImage.image_sequence == 0
            ).first()

            # Convert to Pydantic models
            product_model = ProductModel(
               product_id=product.product_id,
               product_name=product.product_name,
               inventory_count=product.inventory_count,
               description=product.description,
               price=product.price,
               category_id=product.category_id,
               subcategory_id=product.subcategory_id,
               main_image_url=main_image.image_URL if main_image else None
            )

            products_with_images.append(product_model)

        result.append(SubCategoryWithProducts(
            subcategory_id=subcategory.sb_category_id,
            subcategory_name=subcategory.sb_category_name,
            products=products_with_images
        ))

    return result

# =============== for product search =============================
@app.get("/api/products/search", response_model=ProductSearchResponse)
def search_products(query: str = Query(..., description="Search query string"),
                    page: int = Query(1, description="Page number"),
                    db: Session = Depends(get_db)):
   items_per_page = 10
   offset = (page - 1) * items_per_page

   # Queries to include partial matches for categories and subcategories
   product_query = db.query(models.Product)
   category_query = db.query(models.Category).filter(models.Category.category_name.ilike(f'%{query}%'))
   subcategory_query = db.query(models.SubCategory).filter(models.SubCategory.sb_category_name.ilike(f'%{query}%'))
   product_query = db.query(models.Product, models.ProductImage.image_URL.label('main_image_url')).join(
        models.ProductImage, 
        (models.ProductImage.product_id == models.Product.product_id) & (models.ProductImage.image_sequence == 0),
        isouter=True  # outer join to include products without images
    )

   category_match = category_query.first()
   subcategory_match = subcategory_query.first()

   if category_match:
        product_query = product_query.filter(models.Product.category_id == category_match.category_id)
   elif subcategory_match:
        product_query = product_query.filter(models.Product.subcategory_id == subcategory_match.sb_category_id)
   else:
        product_query = product_query.filter(models.Product.product_name.ilike(f'%{query}%'))

   # First, calculate the total count of the products matching the query
   total_count = product_query.count()

   # Apply pagination to the query
   products = product_query.offset(offset).limit(items_per_page).all()

   # Create ProductModel instances
   product_models = [ProductModel(
                        product_id=product.product_id, 
                        product_name=product.product_name,
                        inventory_count=product.inventory_count,
                        description=product.description,
                        price=product.price,
                        category_id=product.category_id,
                        subcategory_id=product.subcategory_id,
                        main_image_url=main_image_url
                     ) for product, main_image_url in products]

   # Create ProductModel instances
   return {"products": product_models,
           "total": total_count,
           "page": page,
           "itemsPerPage": items_per_page}

# =============== for individual Product Page =============================
@app.get("/api/products/{product_id}", response_model=ProductDetailModel)
def get_product_details(product_id: int = Path(..., description="The ID of the product to retrieve"), db: Session = Depends(get_db)):
   # Query the database to get the product details including main_image_url
   result = db.query(
       models.Product,
       models.Category.category_name.label('category_name'),
       models.Category.category_id.label('category_id'),
       models.SubCategory.sb_category_name.label('sub_category_name'),
       models.SubCategory.sb_category_id.label('subcategory_id')
   ).join(
       models.Category, models.Category.category_id == models.Product.category_id
   ).join(
       models.SubCategory, models.SubCategory.sb_category_id == models.Product.subcategory_id
   ).filter(
       models.Product.product_id == product_id
   ).first()

   if not result:
      raise HTTPException(status_code=404, detail="Product not found")

   # Unpack the result, including main_image_url
   product, category_name, category_id, sub_category_name, subcategory_id = result

   # Query for all matching Images and Nutrition
   images = db.query(models.ProductImage).filter(models.ProductImage.product_id == product_id).order_by(models.ProductImage.image_sequence).all()
   nutrition = db.query(models.Nutrition).filter(models.Nutrition.product_id == product_id).first()

   # Set main_image_url to the URL of the first image in the list, if available
   main_image_url = images[0].image_URL if images else None

   # Include main_image_url in the product dictionary
   product_dict = {column.name: getattr(product, column.name) for column in models.Product.__table__.columns}
   product_dict['main_image_url'] = main_image_url

   images_models = [ProductImageModel(**{column.name: getattr(image, column.name) for column in image.__table__.columns}) for image in images]
   nutrition_model = NutritionModel(**{column.name: getattr(nutrition, column.name) for column in nutrition.__table__.columns}) if nutrition else None

   return ProductDetailModel(
      product=ProductModel(**product_dict),
      images=images_models,
      nutrition=nutrition_model,
      category_id=category_id,
      category_name=category_name,
      subcategory_id=subcategory_id,
      sub_category_name=sub_category_name
   )

@app.get("/")
def read_root():
    return {"message": "Welcome to the Grocery Store API!"}
