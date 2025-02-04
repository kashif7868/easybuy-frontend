import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import easybuyLogo from "../assets/images/logo.png";
import { FaBars } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuHeart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { MdOutlineAddIcCall } from "react-icons/md";
import { CiSearch, CiLogout } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiMiniBars2 } from "react-icons/hi2";
import { HiBars3 } from "react-icons/hi2";
import { productData } from "../data/productData";
import CollapsibleCart from "../pages/CollapsibleCart ";
import TopOfferProduct from "../pages/TopOfferProduct";
import { useAuth } from "../context/authContext";
import "../assets/css/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [offerOpen, setOfferOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false); // New state to control visibility of search bar

  const navigate = useNavigate();

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
    if (searchQuery === "") {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleOfferPage = () => {
    setOfferOpen(!offerOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/user");
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible); // Toggle visibility of search bar
  };

  return (
    <div className="navbar-page">
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={easybuyLogo} alt="Logo" className="logo" />
          </Link>
        </div>

        {/* Search Bar Toggle */}
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

        <div className="header-icons-container">
          <div className="navbar-icons-items" onClick={toggleSearchBar}>
            <span className="navbar-icons" > {isSearchBarVisible ? <IoIosClose /> : <CiSearch />} </span>
          </div>
          <Link to="/wishlist" className="navbar-icons-items">
            <LuHeart className="navbar-icons" />
            <span className="counter">{favoriteCount}</span>
          </Link>

          <div
            className="navbar-icons-items"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <HiOutlineShoppingBag className="navbar-icons" />
            <span className="counter">{cartCount}</span>
          </div>

          {user ? (
            <div
              className="navbar-icons-items"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <FiUser className="navbar-icons" />
              <span>{user.fullName}</span>
              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <span className="logout-btn" onClick={handleLogout}>
                    <CiLogout className="logout-icon" />
                    Logout
                  </span>
                </div>
              )}
            </div>
          ) : (
            <Link to="/user" className="navbar-icons-items">
              <FiUser className="navbar-icons" />
            </Link>
          )}

          <div
            className="navbar-toggle-open"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {!menuOpen && <FaBars className="navbar-toggle-open-icon" />}
          </div>
        </div>
      </header>

      <nav className="navbar-container">
        {menuOpen && (
          <div
            className="navbar-toggle-close"
            onClick={() => setMenuOpen(false)}
          >
            <IoIosClose className="navbar-toggle-close-icon" />
          </div>
        )}

        <div className="navbar-menu">
          {/* Left side - Sale Items */}
          <div className="navbar-left">
            <span
              className="category-link-btn"
              onClick={() => setMenuOpen(!menuOpen)} // Toggle menu on click
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

          {/* Center - Navbar Menu */}
          <div className="navbar-center">
            <ul className="navbar-items-container">
              <li className="category-item-list">
                <Link to="/">
                  <span className="home-link-text">Home</span>
                </Link>
              </li>
              <li className="category-item-list">
                <Link to="/featured-products">
                  <span className="home-link-text">Featured Products</span>
                </Link>
              </li>
              <li className="category-item-list">
                <Link to="/deals-of-the-day">
                  <span className="home-link-text">Deals of the Day</span>
                </Link>
              </li>
              <li className="category-item-list">
                <Link to="/our-best-seller">
                  <span className="home-link-text">Our Best Seller</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Right side - Help container and Top offer */}
          <div className="navbar-right">
            <span className="help-container">
              <MdOutlineAddIcCall className="call-icon" />
              <span className="help-call">
                Need Help? <br />
                <a href="tel:+923241687082" className="phone-link">
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

      {cartOpen && <CollapsibleCart setCartOpen={setCartOpen} />}
      {offerOpen && <TopOfferProduct setOfferOpen={setOfferOpen} />}
    </div>
  );
};

export default Navbar;
