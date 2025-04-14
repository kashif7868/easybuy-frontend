import React, { useState, useEffect } from "react";
import "../assets/css/PromoPopUp.css";  
import giftBoxImage from "../assets/images/gift.jpeg"; // Use the new gift box image
import { MdOutlineCloseFullscreen } from "react-icons/md";
const PromoPopUp = () => {
  const [showPopUp, setShowPopUp] = useState(true);

  // Close the popup when the close button is clicked
  const handleClose = () => {
    setShowPopUp(false);
  };

  // This will hide the popup after 10 seconds if it's not closed manually
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUp(false);
    }, 10000); // Adjust the time (in milliseconds) as needed

    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
  }, []);

  if (!showPopUp) return null;

  return (
    <div className="boxPromoPopup">
      <div className="boxPopupContent">
        <img src={giftBoxImage} alt="Easy Buy Gift" className="boxGiftBoxImage" />
        <h2 className="boxHeading">FREE GIFT!</h2>
        <p className="boxDescription">Get a free gift when you spend <strong>PKR 10,000</strong> or more.</p>
        <button onClick={handleClose} className="boxShopNowButton">SHOP NOW</button>
        <button className="boxCloseButton" onClick={handleClose}>< MdOutlineCloseFullscreen /></button>
      </div>
    </div>
  );
};

export default PromoPopUp;
