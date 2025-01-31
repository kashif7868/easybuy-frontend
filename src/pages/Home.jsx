import React, { useState, useRef } from "react";
import { LuHeart } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "../assets/css/Pages/home.css";
import useSlider from "../hooks/useSlider";
import SliderData, { bannerData } from "../data/SliderData";
import { productData } from "../data/productData";
import {
  addToFavorites,
  removeFromFavorites,
} from "../app/reducer/favoritesSlice";
import { addToCart } from "../app/actions/actionsCart";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalSlides = SliderData.length;
  const { currentSlide, goToSlide } = useSlider(totalSlides);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const favorites = useSelector((state) => state.favorites);
  const containerRef = useRef(null); // Reference to the scrollable container

  // Handle scrolling
  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 200; // Adjust the scroll step
      const container = containerRef.current;

      // Check if scrolling is left or right and move accordingly
      if (direction === "left") {
        container.scrollBy({
          left: -scrollAmount, // Scroll left
          behavior: "smooth", // Smooth scroll
        });
      } else if (direction === "right") {
        container.scrollBy({
          left: scrollAmount, // Scroll right
          behavior: "smooth", // Smooth scroll
        });
      }
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("All"); // Track the selected category

  // Function to check if a product is a favorite
  const isFavorite = (productId) =>
    Array.isArray(favorites) && favorites.includes(productId);

  // Function to handle favorite toggle
  const handleFavoriteToggle = (product) => {
    setWishlistLoading(product.id); // Show loading spinner for wishlist
    if (isFavorite(product.id)) {
      dispatch(removeFromFavorites(product.id));
      enqueueSnackbar(
        `${product.productName || "Product"} removed from favorites.`,
        { variant: "info" }
      );
    } else {
      dispatch(addToFavorites(product.id));
      enqueueSnackbar(
        `${product.productName || "Product"} added to favorites!`,
        { variant: "success" }
      );
    }
    setTimeout(() => {
      setWishlistLoading(null); // Hide the spinner after some time
    }, 1000);
  };

  // Function to handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to product detail page
  };

  // Function to handle category click
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // Navigate to category detail page
  };

  const handleBannerClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // Navigate to the category page
  };

  // Function to handle mouse enter
  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  // Add product to cart
  const handleAddToCart = async (product) => {
    setLoading(product.id); // Set loading state to show loading indicator
    try {
      const qty = product.qty || 1;
      const price = product.price || 0;
      const selectedSize = product.selectedSize || "default";

      const productWithQty = {
        ...product,
        qty,
        selectedSize,
        total: qty * price,
      };

      dispatch(addToCart(productWithQty));
      enqueueSnackbar(`${product.name || "Product"} added to cart!`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to add product to cart.", { variant: "error" });
    } finally {
      setTimeout(() => {
        setLoading(null);
      }, 1000);
    }
  };

  // Extract all products from productData based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? productData.flatMap((category) =>
          category.subCategories.flatMap((subCategory) => subCategory.products)
        )
      : productData
          .filter((category) => category.categoryName === selectedCategory)
          .flatMap((category) =>
            category.subCategories.flatMap(
              (subCategory) => subCategory.products
            )
          );

  // Function to calculate total items stock for each category
  const getCategoryStock = (categoryId) => {
    const category = productData.find((cat) => cat.id === categoryId);
    return category.subCategories.reduce((total, subCategory) => {
      return (
        total +
        subCategory.products.reduce((sum, product) => {
          return sum + product.itemsStock;
        }, 0)
      );
    }, 0);
  };

  const handleCategoryFilterChange = (categoryName) => {
    setSelectedCategory(categoryName); // Update selected category
  };

  return (
    <div className="home-container">
      {/* ***************************************************/}
      {/* ****************  banner section  *****************/}
      {/* ***************************************************/}
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

      {/* ***************************************************/}
      {/* **************** category section *****************/}
      {/* ***************************************************/}
      <section className="category-container-main">
        <div
          className="category-arrow-left"
          onClick={() => scroll("left")} // Scroll left when clicked
        >
          <span>
            <MdOutlineKeyboardArrowLeft />
          </span>
        </div>
        <div ref={containerRef} className="category-scroll-wrapper">
          {/* Loop through categories to render them */}
          {productData.map((category) => (
            <div key={category.id} className="category-container">
              <div
                onClick={() => handleCategoryClick(category.id)}
                className="category-item"
              >
                <img
                  src={category.image}
                  alt={category.categoryName}
                  className="category-image"
                />
                <div className="category-name">{category.categoryName}</div>
                <div className="category-stock-items">
                  {getCategoryStock(category.id)} items in stock
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="category-arrow-right"
          onClick={() => scroll("right")} // Scroll right when clicked
        >
          <span>
            <MdOutlineKeyboardArrowRight />
          </span>
        </div>
      </section>

      {/* ***************************************************/}
      {/* ****************  Product Section  *****************/}
      {/* ***************************************************/}
      <section className="products-container">
        <section className="categori-sub-navbar-container" ref={containerRef}>
          <div className="categori-sub-navbar">
            <h2 className="popular-products">Popular Products</h2>
            <nav className="categories-nav-list">
              <button
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => handleCategoryFilterChange("All")}
              >
                All
              </button>
              {productData.map((category) => (
                <button
                  key={category.id}
                  className={
                    selectedCategory === category.categoryName ? "active" : ""
                  }
                  onClick={() =>
                    handleCategoryFilterChange(category.categoryName)
                  }
                >
                  {category.categoryName}
                </button>
              ))}
            </nav>
          </div>
        </section>

        <div className="products-grid">
          {filteredProducts.map((product) => (
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
                  handleFavoriteToggle(product);
                }}
              >
                {wishlistLoading === product.id ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <LuHeart color={isFavorite(product.id) ? "red" : "gray"} />
                )}
              </div>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              {hoveredProduct === product.id && (
                <div
                  className="add-to-cart-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  {loading === product.id ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <HiOutlineShoppingBag size={24} color="#000" />
                  )}
                </div>
              )}
              <div
                className="product-color"
                style={{
                  backgroundColor: product.color
                    ? product.color.toLowerCase()
                    : "gray",
                }}
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
                <span className="original-price">₨ {product.price || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
