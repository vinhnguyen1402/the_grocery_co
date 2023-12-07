// import React from 'react';
// import { useCart } from '../Header/CartContext';

// const AddToCartButton = ({ product }) => {

//   const { addToCart } = useCart();

//   const handleAddToCart = () => {
//     addToCart(product);
//     const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingProductIndex = currentCart.findIndex((item) => item.product_id === product.product_id);

//     if (existingProductIndex >= 0) {
//       currentCart[existingProductIndex].quantity += 1;
//     } else {
//       currentCart.push({ ...product, quantity: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(currentCart));

//     // Dispatch custom event after update cart
//     // const event = new Event('cartUpdated');
//     // window.dispatchEvent(event);
//   };

//   return (
//     <button className='addToCartButton' 
//       onClick={(e) => {
//         e.stopPropagation();
//         handleAddToCart();
//       }}>
//       Add to Cart
//     </button>
//   );
// };

// export default AddToCartButton;