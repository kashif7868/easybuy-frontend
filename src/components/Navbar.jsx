import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import easybuyLogo from "../assets/images/logo.png";
import { FaBars } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuHeart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa6";
import { CiSearch, CiLogout } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiMiniBars2, HiBars3 } from "react-icons/hi2";
import { productData } from "../data/productData";
import CollapsibleCart from "../pages/CollapsibleCart ";
import TopOfferProduct from "../pages/TopOfferProduct";
import { useAuth } from "../context/authContext";
import { useMediaQuery } from "react-responsive";
import "../assets/css/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [offerOpen, setOfferOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 1200px)" });

  const categoryStatus = useSelector(
    (state) => state.category?.status || "idle"
  );
  const favorites = useSelector((state) => state.favorites || []);
  const cart = useSelector((state) => state.cart?.cart || []);

  const favoriteCount = favorites.length;
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsLoading(true);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search-results?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleOfferPage = () => setOfferOpen(!offerOpen);
  const toggleSearchBar = () => setIsSearchBarVisible(!isSearchBarVisible);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    logout();
    navigate("/user");
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-page">
      {/* Header */}
      <header className="header">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/">
            <img src={easybuyLogo} alt="Logo" className="logo" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          {isSearchBarVisible && (
            <div className="input-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              />
              <span className="search-icon" onClick={handleSearchSubmit}>
                {isLoading ? (
                  <div className="search-loader"></div>
                ) : (
                  <CiSearch />
                )}
              </span>
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="header-icons-container">
          {/* Toggle Search */}
          <div className="navbar-icons-items" onClick={toggleSearchBar}>
            <span className="navbar-icons">
              {isSearchBarVisible ? <IoIosClose /> : <CiSearch />}
            </span>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="navbar-icons-items">
            <LuHeart className="navbar-icons" />
            <span className="counter">{favoriteCount}</span>
          </Link>

          {/* Cart */}
          <div
            className="navbar-icons-items"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <HiOutlineShoppingBag className="navbar-icons" />
            <span className="counter">{cartCount}</span>
          </div>

          {/* User Profile */}
          <div
            className="navbar-icons-items"
            onClick={user ? toggleProfileMenu : () => navigate("/user")}
            ref={profileMenuRef}
          >
            {user?.image ? (
              <img src={user.image} alt="Profile" className="user-avatar" />
            ) : (
              <FiUser className="navbar-icons" />
            )}
            <span>{user ? user.name : "Guest"}</span>

            {isProfileMenuOpen && user && (
              <div className="profile-dropdown animate-dropdown">
                <span className="logout-btn" onClick={handleLogout}>
                  <CiLogout className="logout-icon" />
                  Logout
                </span>
              </div>
            )}
          </div>

          {/* Sidebar Toggle */}
          <div className="navbar-toggle-open" onClick={toggleSidebar}>
            {!sidebarOpen && <FaBars className="navbar-toggle-open-icon" />}
          </div>
        </div>
      </header>

      {/* Navbar */}
      <nav className="navbar-container">
        <div className="navbar-menu">
          {/* Categories */}
          <div className="navbar-left">
            <span
              className="category-link-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <HiBars3 className="hamburger-icon" />
              Shop By Categories
              <RiArrowDropDownLine className="dropdown-icon" />
            </span>
            {menuOpen && (
              <ul className="dropdown-menu">
                {categoryStatus === "loading" ? (
                  <li>Loading categories...</li>
                ) : productData.length > 0 ? (
                  productData.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/category/${item.id}`}
                        className="category-link-btn"
                      >
                        {item.categoryName}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No categories available</li>
                )}
              </ul>
            )}
          </div>

          {/* Main Links */}
          <div className="navbar-center">
            <ul className="navbar-items-container">
              <li className="category-item-list">
                <Link to="/">Home</Link>
              </li>
              <li className="category-item-list">
                <Link to="/featured-products">Featured Products</Link>
              </li>
              <li className="category-item-list">
                <Link to="/deals-of-the-day">Deals of the Day</Link>
              </li>
              <li className="category-item-list">
                <Link to="/our-best-seller">Our Best Seller</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Offers */}
          <div className="navbar-right">
            <span className="help-container">
              <FaWhatsapp  className="call-icon" />
              <span className="help-call">
                Need Help? <br />
                <a
                  href="https://wa.me/923241687082"
                  className="whatsapp-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0324-1687082
                </a>
              </span>
            </span>

            <span className="navbar-top-offer" onClick={toggleOfferPage}>
              <HiMiniBars2 className="navbar-top-offer-icon" />
              Top Offer
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobile && sidebarOpen && (
        <>
          <div className="navbar-toggle-close" onClick={toggleSidebar}>
            <IoIosClose className="navbar-toggle-close-icon" />
          </div>
          <ul className="mobile-sidebar-categories open">
            {categoryStatus === "loading" ? (
              <li>Loading categories...</li>
            ) : productData.length > 0 ? (
              productData.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/category/${item.id}`}
                    className="category-link-btn"
                  >
                    {item.categoryName}
                  </Link>
                </li>
              ))
            ) : (
              <li>No categories available</li>
            )}
          </ul>
        </>
      )}

      {/* Cart & Offers */}
      {cartOpen && <CollapsibleCart setCartOpen={setCartOpen} />}
      {offerOpen && <TopOfferProduct setOfferOpen={setOfferOpen} />}
    </div>
  );
};

export default Navbar;
