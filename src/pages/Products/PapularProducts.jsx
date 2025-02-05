import React, { useState, useRef } from "react";
import { LuHeart } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Pages/products/ProductPage.css";
import { productData } from "../../data/productData";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../app/reducer/favoritesSlice";
import { addToCart } from "../../app/actions/actionsCart";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const PapularProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const favorites = useSelector((state) => state.favorites);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const containerRef = useRef(null);

  const isFavorite = (productId) =>
    Array.isArray(favorites) && favorites.includes(productId);

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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to product detail page
  };

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  // Define handleCategoryFilterChange function
  const handleCategoryFilterChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1); // Reset page to 1 when category changes
  };

  // Define currentProducts based on selected category
  const currentProducts =
    selectedCategory === "All"
      ? productData
      : productData.filter(
          (category) =>
            category.categoryName === selectedCategory ||
            category.subCategories.some(
              (subCategory) =>
                subCategory.smallCategories.some(
                  (smallCategory) =>
                    smallCategory.products.some(
                      (product) => product.categoryName === selectedCategory
                    )
                )
            )
        );

  // Define filteredProducts based on pagination
  const filteredProducts = currentProducts.slice(
    0,
    currentPage * itemsPerPage
  );

  const loadMoreProducts = () => {
    setCurrentPage(currentPage + 1); // Increment currentPage to load more products
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

  return (
    <div>
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
          {filteredProducts.map((category) =>
            category.subCategories.map((subCategory) =>
              subCategory.smallCategories.map((smallCategory) =>
                smallCategory.products.map((product) => (
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
                        <LuHeart
                          color={isFavorite(product.id) ? "red" : "gray"}
                        />
                      )}
                    </div>
                    <div className="product-images-container">
                      <span className="product-images-list">
                        {(product.additionalImages || [])
                          .slice(0, 3)
                          .map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Product ${index}`}
                              className="list-images"
                            />
                          ))}
                      </span>
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
                      <span className="original-price">
                        ₨ {product.price || 0}
                      </span>
                    </div>
                  </div>
                ))
              )
            )
          )}
        </div>

        {/* Show More Button */}
        {currentProducts.length > filteredProducts.length && (
          <div className="show-more-button" onClick={loadMoreProducts}>
            {loading ? "Loading..." : "Show More"}
          </div>
        )}
      </section>
    </div>
  );
};

export default PapularProducts;
