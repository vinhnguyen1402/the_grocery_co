import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductTile.css";
import AddToCartButton from "../AddToCart/AddToCartButton";

const ProductTile = ({ product }) => {
  const navigate = useNavigate();
  const productLink = `/products/${product.product_id}`;

  const navigateToProductPage = () => {
    navigate(productLink);
  };

  return (
    <div className="productTile" onClick={navigateToProductPage}>
      <img src={product.main_image_url} alt={product.product_name} className="productImage" />
      <div className="info-container">
        <h3 className="productName">{product.product_name}</h3>
        <p className="productPrice">${product.price}</p>
        {product.inventory_count < 25 && <p className="lowStock">Low Stock</p>}
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductTile;
