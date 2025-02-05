import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { HiOutlineMail } from "react-icons/hi";
import "../assets/css/Pages/home.css";

// Import components
import SliderPage from "../pages/Slider/SliderPage";
import ExploreCategory from "../pages/Category/ExploreCategory";
import PopularProducts from "../pages/Products/PapularProducts";

const Home = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscription = async () => {
    setLoading(true);
    try {
      enqueueSnackbar(
        "Subscription successful! You will receive the latest updates.",
        { variant: "success" }
      );
      setEmail(""); // Clear email input after subscription
    } catch (error) {
      enqueueSnackbar("Failed to subscribe. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Slider Section */}
      <SliderPage />

      {/* Category Section */}
      <ExploreCategory />

      {/* Popular Products Section */}
      <PopularProducts />

      {/* Subscribe to Newsletter Section */}
      <section className="newsletter-section">
        <div className="section-header">
          <h2>Subscribe to our Newsletter</h2>
        </div>
        <div className="newsletter-content">
          <p>Get the latest deals, updates, and special offers from EasyBuy.</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button
              onClick={handleSubscription}
              disabled={loading || !email}
              className="newsletter-btn"
            >
              {loading ? "Subscribing..." : "Subscribe"}
              <HiOutlineMail size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
