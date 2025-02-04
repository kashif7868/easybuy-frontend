import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import "../assets/css/footer.css";
import jashcashImage from "../assets//images/payment/jazzcash.png";
import easypaisaImage from "../assets//images/payment/easypaisa.png";
import bankalfalahImage from "../assets//images/payment/bank-alfalah.png";

const Footer = () => {
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleFooter = (section) => {
    if (section === "company") setIsCompanyOpen(!isCompanyOpen);
    if (section === "privacy") setIsPrivacyOpen(!isPrivacyOpen);
    if (section === "account") setIsAccountOpen(!isAccountOpen);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="footer-page">
      <div className="footer-container">
        <div className="footer-content">
          {/* Services Section */}
          {isMobile ? (
            <motion.div
              className={`footer-column mobile-version ${
                isCompanyOpen ? "open" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="footer-header"
                onClick={() => toggleFooter("company")}
              >
                Our Services <span>{isCompanyOpen ? "-" : "+"}</span>
              </div>
              <div className={`footer-details ${isCompanyOpen ? "open" : ""}`}>
                <ul>
                  <li>
                    <Link to="/electronics">Electronics</Link>
                  </li>
                  <li>
                    <Link to="/clothing">Clothing</Link>
                  </li>
                  <li>
                    <Link to="/groceries">Groceries</Link>
                  </li>
                  <li>
                    <Link to="/home-appliances">Home Appliances</Link>
                  </li>
                  <li>
                    <Link to="/toys">Toys & Games</Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="footer-column">
              <div
                className="footer-header"
                onClick={() => toggleFooter("company")}
              >
                Our Services <span>{isCompanyOpen ? "-" : "+"}</span>
              </div>
              <div className={`footer-details ${isCompanyOpen ? "open" : ""}`}>
                <ul>
                  <li>
                    <Link to="/electronics">Electronics</Link>
                  </li>
                  <li>
                    <Link to="/clothing">Clothing</Link>
                  </li>
                  <li>
                    <Link to="/groceries">Groceries</Link>
                  </li>
                  <li>
                    <Link to="/home-appliances">Home Appliances</Link>
                  </li>
                  <li>
                    <Link to="/toys">Toys & Games</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Privacy & Terms Section */}
          {isMobile ? (
            <motion.div
              className={`footer-column mobile-version ${
                isPrivacyOpen ? "open" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="footer-header"
                onClick={() => toggleFooter("privacy")}
              >
                Privacy & Terms <span>{isPrivacyOpen ? "-" : "+"}</span>
              </div>
              <div className={`footer-details ${isPrivacyOpen ? "open" : ""}`}>
                <ul>
                  <li>
                    <Link to="/cart">My Cart</Link>
                  </li>
                  <li>
                    <Link to="/wishlist">Wishlist</Link>
                  </li>
                  <li>
                    <Link to="/user">Sign In</Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="footer-column">
              <div
                className="footer-header"
                onClick={() => toggleFooter("privacy")}
              >
                Privacy & Terms <span>{isPrivacyOpen ? "-" : "+"}</span>
              </div>
              <div className={`footer-details ${isPrivacyOpen ? "open" : ""}`}>
                <ul>
                  <li>
                    <Link to="/cart">My Cart</Link>
                  </li>
                  <li>
                    <Link to="/wishlist">Wishlist</Link>
                  </li>
                  <li>
                  <Link to="/user">Sign In</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* My Account Section */}
          {isMobile ? (
            <motion.div
              className={`footer-column mobile-version ${
                isAccountOpen ? "open" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="footer-header"
                onClick={() => toggleFooter("account")}
              >
                My Account <span>{isAccountOpen ? "-" : "+"}</span>
              </div>
              <div className={`footer-details ${isAccountOpen ? "open" : ""}`}>
                <ul>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/returns">Returns & Exchanges</Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="footer-column">
              <div
                className="footer-header"
                onClick={() => toggleFooter("account")}
              >
                My Account <span>{isAccountOpen ? "-" : "+"}</span>
              </div>
              <div className={`footer-details ${isAccountOpen ? "open" : ""}`}>
                <ul>
                <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/returns">Returns & Exchanges</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Stay Updated Section */}
          <div className="footer-column">
            <div className="footer-header">Stay Updated</div>
            <p className="footer-description">
              Subscribe to our newsletter to get the latest deals, updates, and
              special offers from EasyBuy.
            </p>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
            <div className="social-icons">
              <Link to="#">
                <FaFacebook size={24} color="#000" />
              </Link>
              <Link to="#">
                <FaInstagram size={24} color="#000" />
              </Link>
              <Link to="#">
                <FaPinterest size={24} color="#000" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-left">
          <p>Copyright © 2025 by EasyBuy</p>
        </div>
        <div className="footer-right">
          <img src={jashcashImage} alt="JazzCash" />
          <img src={easypaisaImage} alt="EasyPaisa" />
          <img src={bankalfalahImage} alt="BankAlFalah" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
