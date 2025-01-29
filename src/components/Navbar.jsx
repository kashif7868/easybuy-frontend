import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // For navigation
import easybuyLogo from "../assets/images/logo.png";
import { FaBars } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2"; // Cart icon
import { LuHeart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiMiniBars2 } from "react-icons/hi2";
import { categoryItems } from "../data/categoryData"; // Import category data
import CollapsibleCart from "../pages/CollapsibleCart "; // Import CartPage
import TopOfferProduct from "../pages/TopOfferProduct"; // Import TopOfferProduct page
import "../assets/css/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // State to handle cart visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [selectedCategory, setSelectedCategory] = useState("All Categories"); // State for selected category
  const [offerOpen, setOfferOpen] = useState(false); // State to handle the visibility of the Top Offer page

  // Accessing the Redux state for category status and items
  const categoryStatus = useSelector(
    (state) => state.category?.status || "idle"
  );

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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Toggle the Top Offer page visibility
  const toggleOfferPage = () => {
    setOfferOpen(!offerOpen); // Toggle the state of the Top Offer page
  };

  return (
    <div>
      {/* Header Section: Logo, Search, and Icons */}
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={easybuyLogo} alt="Logo" className="logo" />
          </Link>
        </div>

        <div class="search-bar-by-category">
          <select
            class="category-select"
            value={selectedCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
          >
            <option>All Categories</option>
            {categoryItems.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
          <div class="input-container">
            <input
              type="text"
              class="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span class="search-icon">
              <CiSearch />
            </span>
          </div>
        </div>

        <div className="header-icons-container">
          {/* Wishlist Icon */}
          <Link to="/wishlist" className="navbar-icons-items">
            <LuHeart className="navbar-icons" />
            <span className="counter">{favoriteCount}</span>
          </Link>

          {/* Cart Icon */}
          <div className="navbar-icons-items" onClick={toggleCart}>
            <HiOutlineShoppingBag className="navbar-icons" />
            <span className="counter">{cartCount}</span>
          </div>

          {/* User Icon */}
          <Link to="/user" className="navbar-icons-items">
            <FiUser className="navbar-icons" />
          </Link>
          {/* Toggle Open Icon inside header */}
          <div
            className="navbar-toggle-open"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {!menuOpen && <FaBars className="navbar-toggle-open-icon" />}
          </div>
        </div>
      </header>

      {/* Navbar Menu: Links for Home, Shop (with dropdown), Sale Dropdown */}
      <nav className="navbar">
        {/* Close Icon inside navbar */}
        {menuOpen && (
          <div
            className="navbar-toggle-close"
            onClick={() => setMenuOpen(false)}
          >
            <IoIosClose className="navbar-toggle-close-icon" />
          </div>
        )}

        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <ul className={`navbar-items-container ${menuOpen ? "active" : ""}`}>
            {/* Home Link */}
            <li className="category-item-list">
              <Link to="/">
                <span className="home-link-text">Home</span>
              </Link>
            </li>

            {/* Shop Link with Dropdown */}
            <li className="category-item-list">
              <span className="category-link-btn">
                Shop
                <RiArrowDropDownLine />
              </span>
              <ul className="dropdown-menu">
                {categoryStatus === "loading" ? (
                  <li>Loading categories...</li>
                ) : categoryItems.length > 0 ? (
                  categoryItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.link}
                        className="category-link-btn"
                        onClick={() => handleCategorySelect(item.label)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No categories available.</li>
                )}
              </ul>
            </li>

            {/* Sale Link with Dropdown */}
            <li className="category-item-list">
              <span className="category-link-btn">
                Sale
                <RiArrowDropDownLine />
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/sale" className="category-link-btn">
                    Hot Sale
                  </Link>
                </li>
                <li>
                  <Link to="/sale/new-arrivals" className="category-link-btn">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/sale/clearance" className="category-link-btn">
                    Clearance
                  </Link>
                </li>
              </ul>
            </li>
            {/* Top Offer Button */}
            <span className="navbar-top-offer" onClick={toggleOfferPage}>
              <HiMiniBars2 className="navbar-top-offer-icon" />
              Top Offer
            </span>
          </ul>
        </div>
      </nav>

      {/* Render the collapsible cart when cartOpen is true */}
      {cartOpen && <CollapsibleCart setCartOpen={setCartOpen} />}
      {/* Top Offer Page (collapsible) */}
      {offerOpen && <TopOfferProduct setOfferOpen={setOfferOpen} />}
    </div>
  );
};

export default Navbar;
