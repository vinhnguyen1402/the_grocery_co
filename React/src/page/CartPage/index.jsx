import { memo, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = memo(() => {
  const navigate = useNavigate();
  const [isClearCart, setIsClearCart] = useState(false);
  const [isAmountChange, setIsAmountChange] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // Fetch the latest data from localStorage when the component mounts
    const currentCart = JSON.parse(localStorage.getItem("cart"));
    setCart(currentCart);
  }, [isClearCart, isAmountChange]);

  const getTotalItem = () => {
    let totalItem = 0;
    cart?.forEach((item) => {
      totalItem += item?.quantity || 0;
    });
    return totalItem;
  };
  const totalItems = getTotalItem();

  const getTotalPrice = () => {
    let totalPrice = 0;
    cart?.forEach((item) => {
      totalPrice += item?.price * item?.quantity || 0;
    });
    return totalPrice;
  };
  const totalPrice = getTotalPrice();

  const handleClearCart = () => {
    // Clear the cart from local storage
    localStorage.clear();
    // Set the cart variable to an empty array
    setIsClearCart(true);
  };

  const handleSubtractAmount = (product_id) => {
    setIsAmountChange(true);
    const isExistingInCart = cart?.find((item) => item.product_id === product_id);
    if (isExistingInCart) {
      const updateCart = JSON.stringify(
        cart.map((item) => {
          if (item.product_id === product_id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
      );
      const newCart = JSON.parse(updateCart).filter((item) => item?.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart); // Update the state with the new cart data
    }
    setIsAmountChange(false);
  };

  const handleAddAmount = (product_id) => {
    setIsAmountChange(true);
    const isExistingInCart = cart?.find((item) => item.product_id === product_id);
    if (isExistingInCart) {
      const updatedCart = JSON.stringify(
        cart?.map((item) => {
          if (item.product_id === product_id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
      const newCart = JSON.parse(updatedCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    }
    setIsAmountChange(false);
  };
  const handleDeleteItem = (product_id) => {
    setIsAmountChange(true);
    const updatedCart = cart?.filter((item) => item.product_id !== product_id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setIsAmountChange(false);
  };

  const onCheckOut = () => {
    if (cart) {
      toast.success("Check out Successfully!",{toastId:"checkOutSuccess"});
      handleClearCart();
    }
  };

  return (
    <div className="masterCartContainer">
      <Header />
      <div className="mainCartContainer">
        <div className="cartContainer">
          <div className="cartTitle">Grocery Cart</div>
          <div className="cartInfoContainer">
            <div className="cartProduct">
              <div className="line1"></div>
              <div className="clearCartButton" onClick={handleClearCart}>
                Clear cart
              </div>
              <div className="line2"> </div>
              <div className="cartProductInfoContainer">
                {cart ? (
                  cart?.map((item, key) => (
                    <div key={key} className="cartProductInfo">
                      <img className="cartProductImage" src={item?.main_image_url} alt="product" 
                      onClick={() => {
                        navigate(`/product/${item?.product_id}`);
                      }}
                      />
                      <div className="cartProductDescription">
                        <div>{item.product_name}</div>
                        <div> </div>
                        <div className="cartAmount">
                          <div className="cartAmountAdjust">
                            <span
                              className="adjustAmount"
                              onClick={() => {
                                handleSubtractAmount(item?.product_id);
                              }}
                            >
                              -
                            </span>
                            {item?.quantity}
                            <span className="adjustAmount" onClick={() => handleAddAmount(item?.product_id)}>
                              +
                            </span>
                          </div>
                          <div className="itemDeleteButton" onClick={() => handleDeleteItem(item?.product_id)}>
                            Delete
                          </div>
                        </div>
                      </div>
                      <div className="cartItemPrice">$ {item?.price}</div>
                    </div>
                  ))
                ) : (
                  <div className="noItemInCart">There's no item in the cart.</div>
                )}
              </div>
            </div>
            <div className="cartInformation">
              <div className="cartInfoLine">
                <div>Total Items</div>
                <div>{totalItems}</div>
              </div>
              <div className="cartInfoLine">
                <div>Total Saving</div>
                <div>$0</div>
              </div>
              <div className="cartInfoLine">
                <div>Subtotal</div>
                <div>$ {totalPrice.toFixed(2)}</div>
              </div>
              <button className="cartCheckOutBtn" onClick={onCheckOut}>
                Check out
              </button>
              <div className="cartLower">
                <b>or</b>
                <div
                  className="continueBtn"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Continue Shopping with us
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
});

export default CartPage;
