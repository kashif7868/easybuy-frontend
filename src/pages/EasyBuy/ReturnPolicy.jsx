import React from "react";
import "../../assets/css/Easybuy/returnPolicy.css"; // Updated CSS path

const ReturnPolicy = () => {
  return (
    <div className="return-policy-container">
      <div className="return-policy-banner">
        <h1 className="return-policy-title">Easy Buy Return Policy</h1>
      </div>
      <div className="rp-main-container">
        <p className="return-policy-description">
          At Easy Buy, we are committed to ensuring your satisfaction. If you are not fully satisfied with your purchase, we offer a return policy within 14 days of the purchase date for unused, unopened products in their original packaging.
        </p>
        <div className="return-policy-content">
          <div className="return-policy-box">
            <h2>Refunds</h2>
            <p>
              Refunds will be processed once the returned item is received and inspected. Please note that shipping costs for returns are the customer’s responsibility unless the return is due to a mistake on our part.
            </p>
          </div>

          <div className="return-policy-box">
            <h2>Non-Returnable Items</h2>
            <p>
              Certain items are non-returnable, including but not limited to perishable goods, food items, and custom orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
