import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { productData } from "../../data/productData";
import "../../assets/css/Pages/customCategories.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../app/reducer/favoritesSlice"; // Correct path
import { addToCart } from "../../app/actions/actionsCart"; // Correct path
import { useSnackbar } from "notistack";
import { LuHeart } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Categories = () => {
  const { categoryId } = useParams(); // Get categoryId from URL
  const [categoryData, setCategoryData] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("topSale");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategoryOpen, setSubCategoryOpen] = useState({});
  const [wishlistLoading, setWishlistLoading] = useState(null);
  const [loading, setLoading] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const favorites = useSelector((state) => state.favorites);

  // Load the category data based on categoryId from URL
  useEffect(() => {
    const category = productData.find((cat) => cat.id === parseInt(categoryId));
    if (category) {
      setCategoryData(category);
      setFilteredProducts(
        category.subCategories.flatMap((subCat) => subCat.products)
      );
      setSelectedCategory(categoryId);
    } else {
      setCategoryData(null);
      setFilteredProducts([]);
    }
  }, [categoryId]);

  // Apply filters and sorting
  useEffect(() => {
    if (categoryData && filteredProducts.length > 0) {
      let filtered = filteredProducts.filter(
        (product) =>
          product.discountPrice >= filterOptions.minPrice &&
          product.discountPrice <= filterOptions.maxPrice &&
          product.rating >= filterOptions.rating
      );

      if (sortOption === "highToLowPrice") {
        filtered.sort((a, b) => b.discountPrice - a.discountPrice);
      } else if (sortOption === "lowToHighPrice") {
        filtered.sort((a, b) => a.discountPrice - b.discountPrice);
      } else if (sortOption === "topSale") {
        filtered.sort((a, b) => b.sales - a.sales); // Assuming 'sales' field exists for top sale sorting
      }

      setFilteredProducts(filtered);
    }
  }, [filterOptions, sortOption, categoryData, filteredProducts]);

  // Handle subcategory click
  const handleSubCategoryClick = (subCategoryId) => {
    const subCategory = categoryData.subCategories.find(
      (sub) => sub.id === subCategoryId
    );
    if (subCategory) {
      setFilteredProducts(subCategory.products);
    }
  };

  // Toggle the visibility of subcategories
  const toggleSubCategory = (subCategoryId) => {
    setSubCategoryOpen((prev) => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId],
    }));
  };

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

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

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

  if (!categoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cg-shop-categories-page">
      <div className="cg-shop-banner-container">
        <div className="chg-shop-banner-content">
          <p>
            <Link to="/">Home</Link> /{" "}
            <span className="cg-shop-banner-title">
              {categoryData.categoryName}
            </span>
          </p>
        </div>
      </div>
      <div className="cg-shop-product-sidebar-container">
        {/* Left Sidebar: Categories with Filters */}
        <div className="cg-shop-left-sidebar">
          <div className="cg-shop-sidebar-header">
            <h3>Categories</h3>
          </div>
          {/* Category list with subcategories */}
          <ul className="cg-shop-category-manu-container">
            {productData
              .filter((category) => category.id === parseInt(categoryId))
              .map((category) => (
                <li key={category.id}>
                  <span
                    style={{
                      cursor: "pointer",
                      fontWeight:
                        selectedCategory === category.id ? "bold" : "normal",
                    }}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.categoryName}
                  </span>
                  {selectedCategory === category.id && (
                    <ul>
                      {category.subCategories.map((subCategory) => (
                        <li key={subCategory.id}>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleSubCategoryClick(subCategory.id)
                            }
                          >
                            {subCategory.subCategoryName}
                          </span>
                          <button
                            onClick={() => toggleSubCategory(subCategory.id)}
                          >
                            {subCategoryOpen[subCategory.id] ? "-" : "+"}
                          </button>
                          {subCategoryOpen[subCategory.id] && (
                            <ul>
                              {subCategory.products.map((product) => (
                                <li key={product.id}>{product.name}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>

          {/* Filters */}
          <div className="cg-shop-filter-options">
            <h4>Filters</h4>
            {/* Price Range Filter with Slider */}
            <label>Price Range</label>
            <div className="price-slider">
              <input
                type="range"
                min="0"
                max="10000"
                value={filterOptions.minPrice}
                onChange={(e) =>
                  setFilterOptions({
                    ...filterOptions,
                    minPrice: parseInt(e.target.value),
                  })
                }
              />
              <input
                type="range"
                min="0"
                max="10000"
                value={filterOptions.maxPrice}
                onChange={(e) =>
                  setFilterOptions({
                    ...filterOptions,
                    maxPrice: parseInt(e.target.value),
                  })
                }
              />
              <div className="price-range-labels">
                <span>₨ {filterOptions.minPrice}</span>
                <span>₨ {filterOptions.maxPrice}</span>
              </div>
            </div>

            {/* Rating Filter */}
            <label>Minimum Rating</label>
            <div className="cg-shop-rating-filter">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setFilterOptions({ ...filterOptions, rating: index + 1 })
                  }
                  style={{
                    color: filterOptions.rating > index ? "gold" : "gray",
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="cg-shop-product-container-main">
          {/* Top Section: Sorting Options */}
          <div className="cg-shop-filter-navbar-container">
            <div className="cg-shop-filter-nav-list">
              <div className="cg-shop-sorting">
                <span className="cg-shop-sort-text">SORT BY:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="topSale">Top Sale</option>
                  <option value="highToLowPrice">High to Low Price</option>
                  <option value="lowToHighPrice">Low to High Price</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Container: Display Products in Grid */}
          <div className="cg-shop-product-container">
            <div className="cg-shop-products-grid">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="cg-shop-product-card"
                  onClick={() => handleProductClick(product.id)}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {product.discountPrice && (
                    <div className="cg-shop-sale-banner">10% Off</div>
                  )}
                  <div
                    className="cg-shop-wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteToggle(product);
                    }}
                  >
                    {wishlistLoading === product.id ? (
                      <div className="cg-shop-loading-spinner"></div>
                    ) : (
                      <LuHeart
                        color={isFavorite(product.id) ? "red" : "gray"} className="cg-shop-heart-icon"
                      />
                    )}
                  </div>

                  {/* Additional Product Images */}
                  <div className="cg-shop-product-images-container">
                    <span className="cg-shop-product-images-list">
                      {(product.additionalImages || [])
                        .slice(0, 3)
                        .map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Product ${index}`}
                            className="cg-shop-list-images"
                          />
                        ))}
                    </span>
                  </div>

                  <img src={product.image} alt={product.name} />
                  <h2>{product.name}</h2>

                  {/* Add to Cart Icon on Hover */}
                  {hoveredProduct === product.id && (
                    <div
                      className="cg-shop-add-to-cart-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      {loading === product.id ? (
                        <div className="cg-shop-loading-spinner"></div>
                      ) : (
                        <HiOutlineShoppingBag size={24} color="#000" />
                      )}
                    </div>
                  )}

                  {/* Product Color */}
                  <div
                    className="cg-shop-product-color"
                    style={{
                      backgroundColor: product.color
                        ? product.color.toLowerCase()
                        : "gray",
                    }}
                  ></div>

                  {/* Rating */}
                  <div className="cg-shop-rating">
                    {"★".repeat(product.rating)}
                    <span>
                      ({product.reviews} Review{product.reviews > 1 ? "s" : ""})
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="cg-shop-price">
                    {product.discountPrice && (
                      <span className="cg-shop-discount-price">
                        ₨ {product.discountPrice}
                      </span>
                    )}
                    <span className="cg-shop-original-price">
                      ₨ {product.price || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
