import React from "react";
import useSlider from "../../hooks/useSlider";
import SliderData from "../../data/SliderData";
import bannerData from "../../data/BannerData";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Pages/banners/sliderPage.css";
const SliderPage = () => {
  const navigate = useNavigate();
  const totalSlides = SliderData.length;
  const { currentSlide, goToSlide } = useSlider(totalSlides);
  const handleBannerClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // Navigate to the category page
  };

  return (
    <div>
      {/* Main Slider */}
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
            <div
              key={banner.id}
              className="banner-card"
              onClick={() => handleBannerClick(banner.categoryId)}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="banner-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderPage;
