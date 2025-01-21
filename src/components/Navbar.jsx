import React from "react";
import "../assets/css/navbar.css";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa"; // Importing React Icons for cart and sign-in
import easybuyLogo from "../assets/images/logo.png"; // Your logo
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      {/* Header with logo, cart, and sign-in */}
      <header className="navbar-header">
        <div className="logo">
          <Link to="/"> {/* Corrected the Link tag here */}
            <img src={easybuyLogo} alt="Logo" className="logo-img" />
          </Link>
        </div>
        <div className="navbar-right">
          <div className="cart">
            <FaShoppingCart className="cart-icon" /> {/* React Icon for cart */}
            <span className="cart-count">0</span> {/* Cart count */}
          </div>
          <div className="sign-in">
            <button className="sign-in-btn">
              <FaUserAlt className="sign-in-icon" />{" "}
              {/* React Icon for sign-in */}
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Navigation bar */}
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/fashion">Fashion</Link>
          </li>
          <li className="navbar-item">
            <Link to="/electronics">Electronics</Link>
          </li>
          <li className="navbar-item">
            <Link to="/beauty">Beauty</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
