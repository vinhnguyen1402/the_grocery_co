//Mikhail Version
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import AddToCartButton from "../../components/AddToCart/AddToCartButton";
// import "./ProductDescription.css";
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// const ProductDescription = () => {
//   const { productId } = useParams();
//   const [productDetails, setProductDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState('');
//   console.log(productId);
//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
//         setProductDetails(response.data);
//         // Set the first image as the selected image initially
//         if (response.data.images && response.data.images.length > 0) {
//           setSelectedImage(response.data.images[0].image_URL);
//         }
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, [productId]);

//   const handleImageSelect = (imageUrl) => { //Handler for product images
//     setSelectedImage(imageUrl);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!productDetails) return <div>Product not found</div>;

//   // Destructure the necessary details from productDetails
//   const { product, images, nutrition, category_name, sub_category_name, category_id /*subcategory_id*/ } = productDetails;

//   return (
//     <div>
//       <Header />
//       <div className="containerProductDescription">
//         <div className="breadCrumbProductDescription">
//           <Link to={`/categories/${category_id}`}>{category_name}</Link> |
//           {sub_category_name} | {product.product_name}
//         </div>
//         <div className="itemDescriptionContainer">
// <div className="imageSidebar">
//   {images.map((image, index) => (
//     <img
//       key={index}
//       className="thumbnailImage"
//       src={image.image_URL}
//       alt={`Thumbnail ${index}`}
//       onClick={() => handleImageSelect(image.image_URL)}
//     />
//   ))}
// </div>
//           <div className="mainImageDisplay">
//             <img className="productImage" src={selectedImage} alt={product.product_name} />
//           </div>

//           <div className="itemDetails">

//             <p className="productName">{product.product_name}</p>

//             <div className="lineProductDescription"></div>

//             <p className="price">${product.price}/ea</p>

//             <p className="in_stock">{product.inventory_count > 0 ? "In Stock" : "Out of Stock"}</p>

//             <AddToCartButton product={product} />

//             <div className="deliOptions">
//               <div className="option">
//                 <p>Pick Up</p>
//                 <p className="status available">Available</p>
//                 <button></button>
//               </div>
//               <div className="option unavailable">
//                 <p>Delivery</p>
//                 <p className="status">Unavailable</p>
//                 <button disabled></button>
//               </div>
//             </div>
//             <div className="nutritionInfo">
//               <h3 className="nutritionTitle">Nutrition Information</h3>
//               <p className="serving_size">{nutrition.serve_size} Servings per container</p>
//               <div className="nutritionDetail">
//                 <div className="macro">
//                   <p>{nutrition.calories}</p>
//                   <p>Calories</p>
//                 </div>
//                 <div className="macro">
//                   <p>{nutrition.protein}g</p>
//                   <p>Protein</p>
//                 </div>
//                 <div className="macro">
//                   <p>{nutrition.sodium}mg</p>
//                   <p>Sodium</p>
//                 </div>
//                 <div className="macro">
//                   <p>{nutrition.fiber}g</p>
//                   <p>Fiber</p>
//                 </div>
//                 <div className="macro">
//                   <p>{nutrition.sugar}g</p>
//                   <p>Sugars</p>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//         <div className="productInfo">
//           <h3>Details</h3>
//           <p>{product.description}</p>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );

// };

// export default ProductDescription;

//Nguyen Version

import { memo, useCallback, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ProductDescription.css";
import productImage from "../../images/productDemoImg.png";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import { useNavigate, useParams } from "react-router";
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

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500);
  // }, []);

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
