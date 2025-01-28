import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart, clearCart } from "../app/actions/actionsCart";
import { FaMinus, FaPlus } from "react-icons/fa"; // Importing the icons for increase and decrease
import "../assets/css/Pages/cart.css";

const CollapsibleCart = ({ setCartOpen }) => {
  const cart = useSelector((state) => state.cart?.cart || []);
  const dispatch = useDispatch();

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const subtotal = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  const vat = subtotal * 0.2; // Assuming VAT is 20%
  const total = subtotal + vat;

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
  };

  const handleClearCart = () => {
    dispatch(clearCart()); // Dispatch the clearCart action
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart ({cartCount} items)</h2>
          <button className="close-cart-btn" onClick={closeCart}>
            X
          </button>
        </div>

        {cart.length > 0 ? (
          <>
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
                        onClick={() => handleDecrement(item.id, item.selectedSize, item.selectedColor)}
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity-value">{item.qty}</span>
                      <button
                        onClick={() => handleIncrement(item.id, item.selectedSize, item.selectedColor)}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <p>Price: {item.price.toLocaleString()} PKR</p>
                  </div>
                  <button className="remove-item-btn" onClick={() => handleRemove(item.id, item.selectedSize, item.selectedColor)}>X</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="subtotal">
                <p>Sub-Total: <span>{subtotal.toLocaleString()} PKR</span></p>
                <p>VAT (20%): <span>{vat.toLocaleString()} PKR</span></p>
                <p>Total: <span>{total.toLocaleString()} PKR</span></p>
              </div>
              <div className="cart-actions">
                <button className="clear-cart" onClick={handleClearCart}>Clear Cart</button>
                <button className="checkout-btn">Checkout</button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <p>Your cart is currently empty!</p>
            <button className="start-shopping-btn">Start shopping</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapsibleCart;
