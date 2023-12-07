import { memo } from "react";
import "./ItemContainer.css";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

const ItemContainer = memo((props) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    console.log(props.product.product_id)
    if (props?.product?.product_id) {
      navigate(`/product/${+props?.product?.product_id}`);
    }
  };
  console.log();
  return (
    <div className="item" onClick={handleOnClick}>
      <img className="productImg" src={props?.product?.main_image_url} alt="product" />
      <p className="ItemProductName">{props?.product?.product_name}</p>
      <p className="itemPrice">$ {props?.product?.price}</p>
      {props.inventory_count < 25 && <p className="lowStock">Low Stock</p>}
      <AddToCartButton product={props?.product}></AddToCartButton>
    </div>
  );
});

export default ItemContainer;
