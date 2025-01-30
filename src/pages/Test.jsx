import React from "react";
import SliderData, { bannerData } from "../data/SliderData";
import { useNavigate } from "react-router-dom"; 
import useSlider from "../hooks/useSlider";
import "../assets/css/test.css";

const Slider = () => {
  const totalSlides = SliderData.length;
  const { currentSlide, goToSlide } = useSlider(totalSlides);
  const navigate = useNavigate();  // Initialize useNavigate

  // Function to handle navigation when a banner card is clicked
  const handleBannerClick = (categoryId) => {
    navigate(`/category/${categoryId}`);  // Navigate to the category page
  };

  return (
    <div className="slider-container">
      {/* Main Slider */}
      <div className="main-slider">
        <div className="slider-content">
          <img
            src={SliderData[currentSlide].image}
            alt={SliderData[currentSlide].title}
            className="slider-image"
          />
        </div>
        <div className="slider-dots">
          {SliderData.map((slide, index) => (
            <div
              key={slide.id}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Product Cards */}
      <div className="banner-cards">
        {bannerData.map((banner) => (
          <div key={banner.id} className="banner-card" onClick={() => handleBannerClick(banner.categoryId)}>
            <img
              src={banner.image}
              alt={banner.title}
              className="banner-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
