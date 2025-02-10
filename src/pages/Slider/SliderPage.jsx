import React from "react";
import Slider from "react-slick"; // Import Slider from react-slick
import SliderData from "../../data/SliderData";
import bannerData from "../../data/BannerData";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Pages/banners/sliderPage.css";

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderPage = () => {
  const navigate = useNavigate();

  const handleBannerClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // Navigate to the category page
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true, // Enable dots navigation
    arrows: false, // Disable arrows, as we're using dots navigation
    autoplay: true,
    autoplaySpeed: 3000, // Change slide every 3 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* Main Slider */}
      <div className="slider-container">
        {/* Main Slider */}
        <div className="main-slider">
          <Slider {...settings}>
            {SliderData.map((slide) => (
              <div key={slide.id} className="slider-content">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="slider-image"
                />
              </div>
            ))}
          </Slider>
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
