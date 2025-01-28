import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // For navigation
import easybuyLogo from "../assets/images/logo.png";
import { FaBars } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2"; // Cart icon
import { LuHeart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr"; // Import language icon
import { IoIosClose } from "react-icons/io";
import { categoryItems } from "../data/categoryData"; // Import category data
import CollapsibleCart from "../pages/CollapsibleCart "; // Import CartPage
import "../assets/css/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // State to handle cart visibility

  // Accessing the Redux state for category status and items
  const categoryStatus = useSelector((state) => state.category?.status || "idle");

  // Wishlist and Cart states
  const favorites = useSelector((state) => state.favorites || []);
  const cart = useSelector((state) => state.cart?.cart || []);

  // Counts for wishlist and cart
  const favoriteCount = favorites.length;
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // Toggle cart visibility
  const toggleCart = () => {
    setCartOpen(!cartOpen); // Toggle cart state when the cart icon is clicked
  };

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
          {categoryStatus === "loading" ? (
            <li>Loading categories...</li> // Show loading message if status is loading
          ) : categoryItems.length > 0 ? (
            categoryItems.map((item, index) => (
              <li key={index} className="category-item-list">
                <Link to={item.link} className="category-link-btn">
                  <span className="category-name">{item.label}</span>
                </Link>
              </li>
            ))
          ) : (
            <li>No categories available.</li> // Handle case when categories are not available
          )}
        </ul>
      </nav>

      <div className="navbar-icons-container">
        {/* Language and Flag (Urdu & Pakistan flag) */}
        <div className="navbar-icons-items">
          <GrLanguage className="navbar-icons" />
          <span className="language-counter">
            🇵🇰 Urdu
          </span>
        </div>

        <Link to="/wishlist" className="navbar-icons-items">
          <LuHeart className="navbar-icons" />
          <span className="counter">{favoriteCount}</span>
        </Link>

        {/* Cart Icon */}
        <div className="navbar-icons-items" onClick={toggleCart}>
          <HiOutlineShoppingBag className="navbar-icons" />
          <span className="counter">{cartCount}</span>
        </div>

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

      {/* Render the collapsible cart when cartOpen is true */}
      {cartOpen && <CollapsibleCart setCartOpen={setCartOpen} />}
    </nav>
  );
};

export default Navbar;
