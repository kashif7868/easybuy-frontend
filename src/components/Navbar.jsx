import React, { useState } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import easybuyLogo from "../assets/images/logo.png";
import { FaBars } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuHeart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr"; // Import language icon
import { IoIosClose } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // Default value for cart
  const [wishlistCount, setWishlistCount] = useState(0); // Default value for wishlist

  // Example functions to simulate adding items to cart or wishlist
  const addToCart = () => {
    setCartCount(cartCount + 1); // Increase cart count by 1
  };

  const addToWishlist = () => {
    setWishlistCount(wishlistCount + 1); // Increase wishlist count by 1
  };

  // Define menu items for categories
  const menuItems = [
    { label: "Men", link: "/men" },
    { label: "Women", link: "/women" },
    { label: "Boys", link: "/boys" },
    { label: "Girls", link: "/girls" },
    { label: "Food", link: "/food" },
    { label: "Health Care", link: "/health-care" },
    { label: "Tech Hub", link: "/tech-hub" },
    { label: "Bedding", link: "/bedding" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={easybuyLogo} alt="Logo" />
        </Link>
      </div>

      <nav className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <ul className={`navbar-items-container ${menuOpen ? "active" : ""}`}>
          <li className="category-item-list">
            <Link to="/">
              <span className="home-link-text">Home</span>
            </Link>
          </li>
          {menuItems.length > 0 ? (
            menuItems.map((item, index) => (
              <li key={index} className="category-item-list">
                <Link to={item.link} className="category-link-btn">
                  <span className="category-name">{item.label}</span>
                </Link>
              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </nav>

      <div className="navbar-icons-container">
        {/* Language and Flag (Urdu & Pakistan flag) */}
        <div className="navbar-icons-items">
          <GrLanguage className="navbar-icons" />
          <span className="language-counter">
            {/* Show Pakistan flag with Urdu */}
            🇵🇰 Urdu
          </span>
        </div>

        <Link
          to="/wishlist"
          className="navbar-icons-items"
          onClick={addToWishlist}
        >
          <LuHeart className="navbar-icons" />
          <span className="counter">{wishlistCount}</span>
        </Link>
        <Link to="/cart" className="navbar-icons-items" onClick={addToCart}>
          <HiOutlineShoppingBag className="navbar-icons" />
          <span className="counter">{cartCount}</span>
        </Link>
        <Link to="/user" className="navbar-icons-items">
          <FiUser className="navbar-icons" />
        </Link>

        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <IoIosClose className="navbar-toggle-close-icon" />
          ) : (
            <FaBars className="navbar-toggle-open-icon" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
