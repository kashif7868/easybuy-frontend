import React, { useState } from "react";
import { LuHeart } from "react-icons/lu"; // Heart icon for wishlist
import { useNavigate } from "react-router-dom"; // For navigating to product detail page
import "../assets/css/Pages/home.css"; // Corrected path for your CSS file
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Importing product images
import productImage1 from "../assets/images/product/0USM2P24V354_2.png";
import productImage2 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.52_455b025f.jpg";
import productImage3 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.53_26864108.jpg";
import productImage4 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.53_fc52264f.jpg";
import productImage5 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.53.17_44a5c57c.jpg";

// Slider images (direct imports)
import sliderImage1 from "../assets/images/sliders/wild-honey.png";
import sliderImage2 from "../assets/images/sliders/wild-honey.png";
import sliderImage3 from "../assets/images/sliders/wild-honey.png";

const Home = () => {
  const navigate = useNavigate(); // Hook to handle page navigation
  const [wishlist, setWishlist] = useState([]);

  const exchangeRate = 285; // 1 USD = 285 PKR (adjust if necessary)

  const handleAddToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to the product view page
  };

  const products = [
    {
      id: 1,
      name: "Example T-Shirt",
      color: "Red",
      price: 20.0 * exchangeRate,
      discountPrice: 20.0 * 0.9 * exchangeRate, // Apply 10% discount
      rating: 5,
      reviews: 1,
      image: productImage1,
    },
    {
      id: 2,
      name: "The Snowboard: Liquid",
      color: "Red",
      price: 750.0 * exchangeRate,
      discountPrice: 750.0 * 0.9 * exchangeRate, // Apply 10% discount
      rating: 4,
      reviews: 1,
      image: productImage2,
    },
    {
      id: 3,
      name: "The Snowboard: Oxygen",
      color: "Red",
      price: 1025.0 * exchangeRate,
      discountPrice: 1025.0 * 0.9 * exchangeRate, // Apply 10% discount
      rating: 5,
      reviews: 1,
      image: productImage3,
    },
    {
      id: 4,
      name: "The 3p Fulfilled Snowboard",
      color: "Green",
      price: 2630.0 * exchangeRate,
      discountPrice: 2630.0 * 0.9 * exchangeRate, // Apply 10% discount
      rating: 5,
      reviews: 1,
      image: productImage4,
    },
    {
      id: 5,
      name: "The Red Hoodie",
      color: "Maroon",
      price: 40.0 * exchangeRate,
      discountPrice: 40.0 * 0.9 * exchangeRate, // Apply 10% discount
      rating: 4,
      reviews: 2,
      image: productImage5,
    },
  ];

  return (
    <div className="home-container">
      {/* Slider Section using Slick Carousel */}
      <div className="carousel-container">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={2} // Show two images per row
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
          arrows={true}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2, // Two slides on medium screens
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1, // One slide on small screens
              },
            },
          ]}
        >
          <div className="carousel-slide">
            <img src={sliderImage1} alt="Slider 1" className="carousel-image" />
          </div>
          <div className="carousel-slide">
            <img src={sliderImage2} alt="Slider 2" className="carousel-image" />
          </div>
          <div className="carousel-slide">
            <img src={sliderImage3} alt="Slider 3" className="carousel-image" />
          </div>
        </Slider>
      </div>

      <div className="products-container">
        <h1>Trending Products</h1>
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              {product.discountPrice && (
                <div className="sale-banner">10% Off</div>
              )}
              <div
                className="wishlist-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist(product);
                }}
              >
                <LuHeart />
              </div>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Color: {product.color}</p>
              <div className="rating">
                {"★".repeat(product.rating)}
                <span>
                  ({product.reviews} Review{product.reviews > 1 ? "s" : ""})
                </span>
              </div>
              <div className="price">
                {product.discountPrice && (
                  <span className="discount-price">
                    ₨ {product.discountPrice.toFixed(2)}
                  </span>
                )}
                <span className="original-price">
                  ₨ {product.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
