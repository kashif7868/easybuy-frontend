import React, { useState } from "react";
import "../assets/css/navbar.css";
import { Link } from "react-router-dom";
import easybuyLogo from "../assets/images/logo.png";
import { FaBars } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuHeart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr"; // Import language icon

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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={easybuyLogo} alt="Logo" />
        </Link>
      </div>

      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <ul className="navbar-items">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/shop" className="navbar-link">
              Shop
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/collection" className="navbar-link">
              Collection
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/blogs" className="navbar-link">
              Blogs
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/pages" className="navbar-link">
              Pages
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/offers" className="navbar-link">
              Offers
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/order-history" className="navbar-link">
              Order History
            </Link>
          </li>
        </ul>
      </div>

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
