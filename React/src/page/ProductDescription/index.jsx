import { memo, useCallback, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ProductDescription.css";
import productImage from "../../images/productDemoImg.png";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import { useParams } from "react-router";
import ApiService from "../../services/api_services";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ProductDescription = memo(() => {
  const { productId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = useCallback(() => {
    ApiService.GET(`http://localhost:8000/api/products/${productId}`)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  useEffect(() => {
    if (getProduct) {
      getProduct();
    }
  }, [getProduct]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  return (
    <div className="pre-content">
      <Header />
      <div className="containerProductDescription">
        <div className="breadCrumbProductDescription">
          <Link to={`/categories/${data?.product?.category_id}`}>{data?.category_name ?? "N/A"}</Link> <span>|</span>{" "}
          <Link to={`/categories/${data?.product?.category_id}`}>{data?.sub_category_name ?? "N/A"}</Link>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : data ? (
          <div className="itemDescriptionContainer">
            <div className="productImageContainer">
              <div className="allSubProductImage">
                <div className="imageSidebar">
                  {data?.images.map((image, index) => (
                    <div className="subProductImage">
                      <img
                        key={index}
                        src={image.image_URL ?? data?.product?.main_image_url}
                        alt={`Thumbnail ${index}`}
                        // onClick={() => handleImageSelect(image.image_URL)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <img className="productImage" src={data?.product?.main_image_url ?? productImage} alt="product" />
            </div>
            <div className="itemDetails">
              <p className="brandName">Brand</p>
              <p className="productName">{data?.product?.product_name ?? "N/A"}</p>
              <div className="lineProductDescription"></div>
              <p className="memberPrice">Member Price</p>
              <p className="price">${data?.product?.price ?? "N/A"}/ ea</p>
              <p className="available">{data?.product?.inventory_count > 0 ? "In Stock" : "Out of stock"}</p>
              <AddToCartButton product={data?.product}></AddToCartButton>
              <div className="deliOptions">
                <div className="option">
                  Pick up <span className="status">available</span>
                </div>
                <div className="option">
                  Delivery <span className="status">available</span>
                </div>
              </div>
              <p className="nutritionTitle">Nutrition Information</p>
              <hr />
              <div className="nutritionInfo">
                <p className="serving">{data?.nutrition?.serve_size} per Serving.</p>
                <div className="nutritionDetail">
                  <div className="macro">
                    <b>{data?.nutrition?.calories}</b>
                    <p>Calories</p>
                  </div>
                  <div className="macro">
                    <b>{data?.nutrition?.protein}g</b>
                    <p>Protein</p>
                  </div>
                  <div className="macro">
                    <b>{data?.nutrition?.sodium}mg</b>
                    <p>Sodium</p>
                  </div>
                  <div className="macro">
                    <b>{data?.nutrition?.fiber}g</b>
                    <p>Fiber</p>
                  </div>
                  <div className="macro">
                    <b>{data?.nutrition?.sugar}g</b>
                    <p>Sugars</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="noProduct">The product is not available.</div>
        )}

        <div className="productInfo">
          <b>Details</b>
          <hr />
          {data ? <p className="description">{data?.product?.description ?? "N/A"}</p> : "N/A"}
        </div>
      </div>
      <Footer />
    </div>
  );
});

export default ProductDescription;
