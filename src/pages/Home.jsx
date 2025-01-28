import React, { useState } from "react";
import { LuHeart } from "react-icons/lu"; // Heart icon for wishlist
import { HiOutlineShoppingBag } from "react-icons/hi2"; // Shopping Bag icon for Add to Cart
import { useNavigate } from "react-router-dom"; // For navigating to product detail page
import "../assets/css/Pages/home.css"; // Corrected path for your CSS file
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderData from "../data/SliderData"; // Importing the SliderData
import { productData } from "../data/productData"; // Importing productData
import {
  addToFavorites,
  removeFromFavorites,
} from "../app/reducer/favoritesSlice";
import { addToCart } from "../app/actions/actionsCart"; 
import { useDispatch, useSelector } from "react-redux"; // Added to use dispatch and selector
import { toast } from "react-toastify"; // Importing toast for notifications

const Home = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(null); // State to track loading for add to cart
  const navigate = useNavigate(); // Hook to handle page navigation
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites); // Accessing favorites state

  const isFavorite = (productId) =>
    Array.isArray(favorites) && favorites.includes(productId);

  const handleFavoriteToggle = (product) => {
    if (isFavorite(product.id)) {
      dispatch(removeFromFavorites(product.id)); // Remove from favorites using product.id
      toast.info(`${product.productName || "Product"} removed from favorites.`);
    } else {
      dispatch(addToFavorites(product.id)); // Add to favorites using product.id
      toast.success(`${product.productName || "Product"} added to favorites!`);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to the product view page
  };

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleAddToCart = async (product) => {
    setLoading(product.id); // Set loading state to show loading indicator

    try {
      // Ensure quantity and price exist, default to 1 and 0 if missing
      const qty = product.qty || 1;
      const price = product.price || 0;

      // If the selectedSize exists, include it in the action
      const selectedSize = product.selectedSize || "default"; // Ensure this value exists

      const productWithQty = {
        ...product,
        qty,
        selectedSize,
        total: qty * price,
      };

      dispatch(addToCart(productWithQty)); // Dispatch action to add product to cart

      toast.success(`${product.name || "Product"} added to cart!`); // Success message
    } catch (error) {
      toast.error("Failed to add product to cart.");
    } finally {
      setLoading(null); // Reset loading state after action
    }
  };

  // Flatten the product data from all categories and subcategories
  const allProducts = productData.flatMap((category) =>
    category.subCategories.flatMap((subCategory) => subCategory.products)
  );

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
          {SliderData.map((sliderItem) => (
            <div key={sliderItem.id} className="carousel-slide">
              <img
                src={sliderItem.image}
                alt={`Slider ${sliderItem.id}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Product Section */}
      <div className="products-container">
        <h1>Trending Products</h1>
        <div className="products-grid">
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
            >
              {product.discountPrice && (
                <div className="sale-banner">10% Off</div>
              )}
              <div
                className="wishlist-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteToggle(product); // Correct function call for adding/removing from favorites
                }}
              >
                <LuHeart
                  color={isFavorite(product.id) ? "red" : "gray"} // Change icon color based on favorite state
                />
              </div>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              {hoveredProduct === product.id && (
                <div
                  className="add-to-cart-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product); // Trigger add to cart
                  }}
                >
                  {loading === product.id ? (
                    <div className="loading-spinner"></div> // Show loading spinner when loading
                  ) : (
                    <HiOutlineShoppingBag size={24} color="#000" />
                  )}
                </div>
              )}
              <div
                className="product-color"
                style={{ backgroundColor: product.color ? product.color.toLowerCase() : "gray" }}
              ></div>
              <div className="rating">
                {"★".repeat(product.rating)}
                <span>
                  ({product.reviews} Review{product.reviews > 1 ? "s" : ""})
                </span>
              </div>
              <div className="price">
                {product.discountPrice && (
                  <span className="discount-price">
                    ₨ {product.discountPrice}
                  </span>
                )}
                <span className="original-price">
                  ₨ {product.price || 0}
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
