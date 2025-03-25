import React, { useState, useEffect } from "react";
import { LuHeart } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Pages/products/ProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../app/reducer/categorySlice";
import { fetchProducts } from "../../app/reducer/productSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../app/reducer/favoritesSlice";
import { addToCart } from "../../app/actions/actionsCart";
import { useSnackbar } from "notistack";

const PopularProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(null);

  // Redux state
  const {
    products,
    loading: productsLoading,
  } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { favorites } = useSelector((state) => state.favorites);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch categories and products when component mounts
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const isFavorite = (productId) =>
    Array.isArray(favorites) && favorites.includes(productId);

  const handleFavoriteToggle = (product) => {
    setWishlistLoading(product.id); // Show loading spinner for wishlist
    if (isFavorite(product.id)) {
      dispatch(removeFromFavorites(product.id));
      enqueueSnackbar(`${product.name || "Product"} removed from favorites.`, {
        variant: "info",
      });
    } else {
      dispatch(addToFavorites(product.id));
      enqueueSnackbar(`${product.name || "Product"} added to favorites!`, {
        variant: "success",
      });
    }
    setTimeout(() => {
      setWishlistLoading(null); // Hide the spinner after some time
    }, 1000);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to product detail page
  };

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleCategoryFilterChange = (category_name) => {
    setSelectedCategory(category_name);
    setCurrentPage(1); // Reset page to 1 when category changes
  };

  // Filter products based on selected category
  const currentProducts =
  selectedCategory === "All"
    ? products
    : products.filter(
        (product) =>
          product.category.category_name &&
          product.category.category_name
            .toLowerCase()
            .trim() === selectedCategory.toLowerCase().trim()
      );
  const filteredProducts = currentProducts.slice(0, currentPage * itemsPerPage);

  const loadMoreProducts = () => {
    setCurrentPage(currentPage + 1); // Increment currentPage to load more products
  };

  const handleAddToCart = async (product) => {
    setLoading(product.id); // Set loading state to show loading indicator
    try {
      const qty = product.qty || 1;
      const price = product.discount_price || product.price || 0;
      const selectedSize = product.size || "default";

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

  return (
    <div>
      <section className="products-container">
        <section className="categori-sub-navbar-container">
          <div className="categori-sub-navbar">
            <h2 className="popular-products">Popular Products</h2>
            <nav className="categories-nav-list">
              <button
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => handleCategoryFilterChange("All")}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={selectedCategory === category.category_name ? "active" : ""}
                  onClick={() =>
                    handleCategoryFilterChange(category.category_name)
                  }
                >
                  {category.category_name}
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
              {product.discount_price && (
                <div className="sale-banner">{product.discount_percentage}% Off</div>
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
              <div className="product-images-container">
                <span className="product-images-list">
                  {product.additional_images &&
                    product.additional_images
                      .slice(0, 3)
                      .map((img, index) => (
                        <img
                          key={index}
                          src={`http://localhost:8000/storage/${img}`}
                          alt={`Product ${index}`}
                          className="list-images"
                        />
                      ))}
                </span>
              </div>

              <img
                src={`http://localhost:8000/storage/${product.images}`}
                alt={product.name}
              />
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
                  backgroundColor: product.color ? product.color.toLowerCase() : "gray",
                }}
              ></div>
              <div className="rating">
                {"★".repeat(product.rating)}
                <span>
                  ({product.reviews} Review{product.reviews > 1 ? "s" : ""})
                </span>
              </div>
              <div className="price">
                {product.discount_price && (
                  <span className="discount-price">₨ {product.discount_price}</span>
                )}
                <span className="original-price">₨ {product.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {currentProducts.length > filteredProducts.length && (
          <div className="show-more-button" onClick={loadMoreProducts}>
            {productsLoading ? "Loading..." : "Show More"}
          </div>
        )}
      </section>
    </div>
  );
};

export default PopularProducts;
