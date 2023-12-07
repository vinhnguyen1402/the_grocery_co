from database import Base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Product(Base):
   __tablename__ = "products"

   product_id = Column(Integer, primary_key=True)
   category_id = Column(Integer, ForeignKey('categories.category_id'))
   subcategory_id = Column(Integer, ForeignKey('subcategories.sb_category_id'))
   #nutrition_id = Column(Integer, ForeignKey('nutrition.nutrition_id'))
   #image_id = Column(Integer, ForeignKey('product_images.image_id'))
   
   product_name = Column(String)
   inventory_count = Column(Integer)
   description = Column(String)
   price = Column(Float)

   category = relationship('Category', back_populates='products')
   subcategory = relationship('SubCategory', back_populates='products')
   images = relationship('ProductImage', back_populates='product')
   #sales = relationship('MemberSale', back_populates='product')
   nutrition = relationship('Nutrition', back_populates='product', uselist=False)

class Category(Base):
   __tablename__ = "categories"

   category_id = Column(Integer, primary_key=True, index=True)
   category_name = Column(String)

   products = relationship('Product', back_populates='category')
   subcategories = relationship('SubCategory', back_populates='category')

class SubCategory(Base):
   __tablename__ = "subcategories"

   sb_category_id = Column(Integer, primary_key=True)
   category_id = Column(Integer, ForeignKey('categories.category_id'))
   sb_category_name = Column(String)
    
   products = relationship('Product', back_populates='subcategory')
   category = relationship('Category', back_populates='subcategories')

class ProductImage(Base):
   __tablename__ = "product_images"

   image_id = Column(Integer, primary_key=True)
   product_id = Column(Integer, ForeignKey('products.product_id'))
   image_URL = Column(String)
   image_sequence = Column(Integer)

   product = relationship('Product', back_populates='images')

class Nutrition(Base):
   __tablename__ = "nutrition"

   nutrition_id = Column(Integer, primary_key=True, index=True)
   product_id = Column(Integer, ForeignKey('products.product_id'))
   serve_size = Column(String)
   calories = Column(Integer)
   protein = Column(Float)
   sodium = Column(Float)
   fiber = Column(Float)
   sugar = Column(Float)

   product = relationship('Product', back_populates='nutrition', uselist=False)

"""class MemberSale(Base):
   __tablename__ = "member_sales"

   member_sale_id = Column(Integer, primary_key=True, index=True)
   product_id = Column(Integer, ForeignKey('products.product_id'))
   start_date = Column(String)
   end_date = Column(String)

   product = relationship('Product', back_populates='sale')"""