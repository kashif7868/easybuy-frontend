// CartPage.jsx
import React from "react";
import CollapsibleCart from "./CollapsibleCart "; // Import the CollapsibleCart

const CartPage = () => {
  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <CollapsibleCart /> {/* Render the collapsible cart here */}
    </div>
  );
};

export default CartPage;
