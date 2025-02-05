import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { productData } from "../../data/productData"; // Correct path
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
import { MdGridOn } from "react-icons/md";

const Categories = () => {
  const { categoryId } = useParams(); // Get categoryId from URL
  const [categoryData, setCategoryData] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(null);
  const [loading, setLoading] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Manage subcategory state
  const [subCategoryStatus, setSubCategoryStatus] = useState("loading");
  const [subcategories, setSubcategories] = useState([]);
  const [openSubCategory, setOpenSubCategory] = useState(null); // Handle which subcategory is open
  const [filterLoading, setFilterLoading] = useState(false); // State for filtering loading

  // Define state variables for sorting and layout
  const [sortOption, setSortOption] = useState("topSale");
  const [layout, setLayout] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const favorites = useSelector((state) => state.favorites);

  // Load the category data based on categoryId from URL
  useEffect(() => {
    const category = productData.find((cat) => cat.id === parseInt(categoryId));
    if (category) {
      setCategoryData(category);
      setSubcategories(category.subCategories); // Store subcategories
      setSubCategoryStatus("loaded");
      setFilteredProducts(
        category.subCategories.flatMap((subCat) =>
          subCat.smallCategories.flatMap((smallCat) => smallCat.products)
        )
      );
    } else {
      setCategoryData(null);
      setFilteredProducts([]);
      setSubCategoryStatus("loaded");
    }
  }, [categoryId]);

  // Apply filters and sorting
  useEffect(() => {
    if (categoryData && filteredProducts.length > 0) {
      let filtered = filteredProducts;

      filtered = filtered.filter((product) => product.rating >= 0); // Default filter for rating

      if (sortOption === "highToLowPrice") {
        filtered.sort((a, b) => b.discountPrice - a.discountPrice);
      } else if (sortOption === "lowToHighPrice") {
        filtered.sort((a, b) => a.discountPrice - b.discountPrice);
      } else if (sortOption === "topSale") {
        filtered.sort((a, b) => b.sales - a.sales); // Assuming 'sales' field exists for top sale sorting
      }

      setFilteredProducts(filtered);
    }
  }, [sortOption, categoryData, filteredProducts]);

  // Pagination: Calculate the starting and ending indices for the products to display
  const productsPerPage = 10;
  const startIndex = 0; // Adjust this based on the current page number
  const endIndex = startIndex + productsPerPage;

  // Filter products based on search or other criteria
  const searchFilteredProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle small category click
  const handleSmallCategoryClick = async (smallCategoryId) => {
    setFilterLoading(true); // Show loading spinner
    const selectedSmallCategory = categoryData.subCategories
      .flatMap((sub) => sub.smallCategories)
      .find((smallCat) => smallCat.id === smallCategoryId);

    if (selectedSmallCategory) {
      if (selectedSmallCategory.products.length > 0) {
        setFilteredProducts(selectedSmallCategory.products);
      } else {
        setFilteredProducts([]);
        enqueueSnackbar("No products available in this small category.", {
          variant: "warning",
        });
      }
    }
    setTimeout(() => {
      setFilterLoading(false); // Hide loading spinner after filtering
    }, 1000);
  };

  // Toggle the visibility of subcategories
  const toggleSubCategory = (subCategoryId) => {
    setOpenSubCategory((prev) =>
      prev === subCategoryId ? null : subCategoryId
    );
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

  // Handle Add to Cart
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

  if (!categoryData || subCategoryStatus === "loading" || filterLoading) {
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
          <div className="cg-group-filter">
            {subCategoryStatus === "loading" ? (
              <div>Loading Subcategories...</div>
            ) : (
              <div className="cg-filter-category">
                {subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className={`filter-category__item ${
                      openSubCategory === sub.subCategoryName
                        ? "purple-dot"
                        : ""
                    }`}
                  >
                    <div
                      className="filter-category__header"
                      onClick={() => toggleSubCategory(sub.subCategoryName)}
                    >
                      <span className="filter-dot"></span>
                      <span className="filter-category__text">
                        {sub.subCategoryName}
                      </span>
                      <span className="filter-category__icon">
                        {openSubCategory === sub.subCategoryName ? "−" : "+"}
                      </span>
                    </div>
                    {openSubCategory === sub.subCategoryName && (
                      <ul className="filter-smallcategory">
                        {sub.smallCategories.map((smallCategory) => (
                          <li
                            key={smallCategory.id}
                            className="filter-smallcategory__item"
                            onClick={() =>
                              handleSmallCategoryClick(smallCategory.id)
                            }
                          >
                            <span className="dot sub-purple-dot"></span>
                            {smallCategory.smallCategoryName}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Product Area */}
        <div className="cg-shop-product-container-main">
          <div className="cg-shop-filter-navbar-container">
            <div className="cg-shop-filter-nav-list">
              {/* total display product */}
              <div className="product-count-display">
                <span>
                  Show Results {startIndex}-{endIndex} of{" "}
                  {searchFilteredProducts.length || filteredProducts.length}
                </span>
              </div>
              {/* view options */}
              <div className="cg-view-options">
                <span className="cg-view-text">VIEW AS:</span>
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    className="cg-view-option"
                    onClick={() => setLayout(num)} // Set the layout state to the clicked value (2, 3, or 4 columns)
                  >
                    {num}
                  </button>
                ))}
                <button
                  className="cg-view-option"
                  onClick={() => setLayout(5)} // Default layout to 5 when grid icon is clicked
                >
                  <MdGridOn />
                </button>
              </div>

              {/* sorting */}
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

          <div
            className={`cg-shop-product-container ${
              layout === "grid" ? "grid-layout" : `grid-${layout}`
            }`}
          >
            {filterLoading ? (
              <div className="cg-shop-loading-spinner"></div> // Loader is here
            ) : filteredProducts.length === 0 ? (
              <div>No products available in this small category.</div>
            ) : (
              <div className={`cg-shop-products-grid grid-${layout}`}>
                {searchFilteredProducts.map((product) => (
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
                          color={isFavorite(product.id) ? "red" : "gray"}
                          className="cg-shop-heart-icon"
                        />
                      )}
                    </div>

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

                    <div
                      className="cg-shop-product-color"
                      style={{
                        backgroundColor: product.color
                          ? product.color.toLowerCase()
                          : "gray",
                      }}
                    ></div>

                    <div className="cg-shop-rating">
                      {"★".repeat(product.rating)}
                      <span>
                        ({product.reviews} Review
                        {product.reviews > 1 ? "s" : ""})
                      </span>
                    </div>

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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
