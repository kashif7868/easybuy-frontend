import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../app/reducer/favoritesSlice";
import { addToCart, incrementQty } from "../app/actions/actionsCart";
import { LuHeart } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { productData } from "../data/productData";
import "../assets/css/Pages/searchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const favorites = useSelector((state) => state.favorites);

  const filterProducts = useCallback(() => {
    if (!searchQuery) {
      setFilteredProducts([]);
      setLoading(false);
      return;
    }

    const products = productData
      ?.map((category) => category?.subCategories)
      .flat()
      .map((subCategory) => subCategory?.smallCategories)
      .flat()
      .map((smallCategory) => smallCategory?.products)
      .flat()
      .filter((product) => {
        const productName = product.name || "";
        const productDescription = product.description || "";
        const productColor = product.color || "";
        return (
          productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          productDescription
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          productColor.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

    setFilteredProducts(products || []);
    setLoading(false);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    filterProducts();
  }, [searchQuery, filterProducts]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleFavoriteToggle = (product) => {
    setWishlistLoading(product.id);
    if (favorites.includes(product.id)) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product.id));
    }
    setTimeout(() => {
      setWishlistLoading(null);
    }, 1000);
  };

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  const handleAddToCart = (product, qty = 1, selectedSize = "M") => {
    const existingProduct = cart.find(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );

    if (existingProduct) {
      dispatch(incrementQty(product.id, selectedSize));
    } else {
      dispatch(addToCart({ ...product, qty, selectedSize }));
    }
    setLoading(product.id);
    setTimeout(() => {
      setLoading(null);
    }, 1000);
  };

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <p>Searching...</p>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="search-bar-container"></div>
      <h2>Search Results for: "{searchQuery}"</h2>
      {filteredProducts.length === 0 ? (
        <p className="not-found-product">
          No products found. Please try a different search.
        </p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
            >
              {product.discountPrice && (
                <div className="top-offer-sale-banner">10% Off</div>
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
              <img
                src={product.image}
                alt={product.name}
                onClick={() => handleProductClick(product.id)}
              />
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
              <h3>{product.name}</h3>
              <p>{product.description}</p>
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
      )}
    </div>
  );
};

export default SearchResults;
