import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} from "../app/actions/actionsCart";
import { FaMinus, FaPlus } from "react-icons/fa"; // Importing the icons for increase and decrease
import "../assets/css/Pages/cart.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for routing
import { useSnackbar } from "notistack"; // Importing useSnackbar for notifications

const CollapsibleCart = ({ setCartOpen }) => {
  const cart = useSelector((state) => state.cart?.cart || []);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for page navigation
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar for notifications

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  const closeCart = () => {
    setCartOpen(false);
  };

  const handleIncrement = (productId, selectedSize, selectedColor) => {
    dispatch(incrementQty(productId, selectedSize, selectedColor));
  };

  const handleDecrement = (productId, selectedSize, selectedColor) => {
    dispatch(decrementQty(productId, selectedSize, selectedColor));
  };

  const handleRemove = (productId, selectedSize, selectedColor) => {
    dispatch(removeFromCart(productId, selectedSize, selectedColor));
    enqueueSnackbar("Item removed from cart", { variant: "warning" }); // Show notification
  };

  const handleClearCart = () => {
    dispatch(clearCart()); // Dispatch the clearCart action
    enqueueSnackbar("Cart has been cleared", { variant: "error" }); // Show notification
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart: cart } }); // Navigate to checkout page with cart items in state
    enqueueSnackbar("Proceeding to checkout!", { variant: "success" }); // Show success notification
  };

  const handleStartShopping = () => {
    navigate("/"); // Navigate to home page when Start shopping button is clicked
  };

  const deliveryCharges = 0; // You can update this as per your delivery charges logic

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart ({cartCount} items)</h2>
          <span className="close-cart-btn" onClick={closeCart}>
            <IoIosCloseCircleOutline />
          </span>
        </div>

        {cart.length > 0 ? (
          <>
            <div className="cart-items-container">
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>Size: {item.selectedSize}</p>
                      <p>Color: {item.selectedColor}</p>
                      <div className="quantity-section">
                        <button
                          onClick={() =>
                            handleDecrement(
                              item.id,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          className="quantity-btn"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity-value">{item.qty}</span>
                        <button
                          onClick={() =>
                            handleIncrement(
                              item.id,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          className="quantity-btn"
                          aria-label="Increase quantity"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <p>Price: {item.price.toLocaleString()} PKR</p>
                    </div>
                    <span
                      className="remove-item-btn"
                      onClick={() =>
                        handleRemove(
                          item.id,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                    >
                      <IoIosClose className="remove-cart-icon" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <p>
                  <strong>Subtotal:</strong> ₨ {subtotal.toLocaleString()}
                </p>
                <p>
                  <strong>Delivery Charges:</strong>{" "}
                  {deliveryCharges === 0 ? (
                    <span>Delivery is Free</span>
                  ) : (
                    `₨ ${deliveryCharges.toLocaleString()}`
                  )}
                </p>
                <p>
                  <strong>Total:</strong>{" "}
                  ₨ {(subtotal + deliveryCharges).toLocaleString()}
                </p>
              </div>

              <div className="cart-actions">
                <button className="clear-cart" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <p>Your cart is currently empty!</p>
            <button className="start-shopping-btn" onClick={handleStartShopping}>
              Start shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapsibleCart;
