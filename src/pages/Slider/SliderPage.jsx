// src/pages/SliderPage.js
import React, { useEffect } from 'react';
import Slider from 'react-slick'; // Import Slider from react-slick
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliderImages, selectSliderImages, selectSliderStatus, selectSliderError } from '../../app/reducer/sliderSlice';
import { fetchBanners, selectBanners, selectBannerStatus, selectBannerError } from '../../app/reducer/bannerSlice';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/Pages/banners/sliderPage.css";

// Import slick carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the slider data and loading state from Redux store
  const images = useSelector(selectSliderImages);
  const sliderStatus = useSelector(selectSliderStatus);
  const sliderError = useSelector(selectSliderError);

  // Get the banner data and loading state from Redux store
  const banners = useSelector(selectBanners);
  const bannerStatus = useSelector(selectBannerStatus);
  const bannerError = useSelector(selectBannerError);

  // Fetch the slider images when the component mounts
  useEffect(() => {
    if (sliderStatus === 'idle') {
      dispatch(fetchSliderImages());
    }

    // Fetch the banners when the component mounts
    if (bannerStatus === 'idle') {
      dispatch(fetchBanners());
    }
  }, [sliderStatus, bannerStatus, dispatch]);

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

  if (sliderStatus === 'loading' || bannerStatus === 'loading') {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  if (sliderStatus === 'failed' || bannerStatus === 'failed') {
    return <div>Error: {sliderError || bannerError}</div>; // Show an error message if data fetching fails
  }

  // Only map through images and banners if they are arrays and not empty
  const hasImages = Array.isArray(images) && images.length > 0;
  const hasBanners = Array.isArray(banners) && banners.length > 0;

  return (
    <div>
      {/* Main Slider */}
      <div className="slider-container">
        <div className="main-slider">
          <Slider {...settings}>
            {hasImages ? (
              images.map((slide) => (
                <div key={slide.id} className="slider-content">
                  <img
                    src={`http://localhost:8000/storage/${slide.image}`} // Corrected image path
                    alt={slide.title || "Slider Image"}
                    className="slider-image"
                  />
                </div>
              ))
            ) : (
              <div>No images available</div> // This message will show if there are no images
            )}
          </Slider>
        </div>

        {/* Right Product Cards */}
        <div className="banner-cards">
          {hasBanners ? (
            banners.map((banner) => (
              <div
                key={banner.id}
                className="banner-card"
                onClick={() => handleBannerClick(banner.category_id)} // Use category_id for navigation
              >
                <img
                  src={`http://localhost:8000/storage/${banner.image}`} // Corrected image path
                  alt={banner.category_name || "Banner Image"}
                  className="banner-image"
                />
              </div>
            ))
          ) : (
            <div>No banners available</div> // This message will show if there are no banners
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderPage;
