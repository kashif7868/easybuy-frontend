import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../app/reducer/favoritesSlice";
import { addToCart } from "../app/actions/actionsCart";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { productData } from "../data/productData";
import "../assets/css/Pages/wishlist.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSnackbar } from "notistack"; // Import useSnackbar

const WishListProduct = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(null);
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart.cart); // Access cart from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar

  const isFavorite = (productId) => favorites.includes(productId);

  const handleFavoriteToggle = async (product) => {
    setLoading(product.id);

    try {
      if (isFavorite(product.id)) {
        await dispatch(removeFromFavorites(product.id)); // Remove from favorites
        enqueueSnackbar("Product removed from favorites!", { variant: "info" }); // Show Snackbar
      } else {
        await dispatch(addToFavorites(product.id)); // Add to favorites
        enqueueSnackbar("Product added to favorites!", { variant: "success" }); // Show Snackbar
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      enqueueSnackbar("An error occurred while updating favorites.", { variant: "error" }); // Error Snackbar
    } finally {
      setLoading(null);
    }
  };

  const handleMouseEnter = (productId) => setHoveredProduct(productId);
  const handleMouseLeave = () => setHoveredProduct(null);

  // Navigate to the product detail page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Update with your actual route
  };

  // Add to cart with size selection and quantity
  const handleAddToCart = (product) => {
    const selectedSize = product.size || "default"; // Handle size selection (default for now)
    const existingProduct = cart.find(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );
    
    if (existingProduct) {
      dispatch(addToCart({ ...product, selectedSize, qty: existingProduct.qty + 1 }));
    } else {
      dispatch(addToCart({ ...product, selectedSize, qty: 1 }));
    }

    enqueueSnackbar("Product added to cart!", { variant: "success" }); // Show Snackbar
  };

  return (
    <div className="wishlist-container">
      {favorites.length === 0 ? (
        <div className="wishlist-empty-message">Your wishlist is empty</div>
      ) : (
        productData
          .flatMap((category) =>
            category.subCategories.flatMap((subCategory) =>
              subCategory.smallCategories.flatMap((smallCategory) =>
                smallCategory.products.filter((product) =>
                  favorites.includes(product.id)
                )
              )
            )
          )
          .map((product) => (
            <div
              key={product.id}
              className="wishlist-product-card"
              onClick={() => handleProductClick(product.id)} // Product click redirects to details page
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
            >
              {product.discountPrice && (
                <div className="wishlist-sale-banner">10% Off</div>
              )}
              <div
                className="wishlist-wishlist-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavoriteToggle(product);
                }}
              >
                <IoHeartDislikeOutline color={isFavorite(product.id) ? "red" : "gray"} />
              </div>
              {loading === product.id && (
                <div className="wishlist-loading-spinner">Loading...</div>
              )}

              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>

              {hoveredProduct === product.id && (
                <div
                  className="wishlist-add-to-cart-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product); // Add to cart with size and quantity logic
                  }}
                >
                  <HiOutlineShoppingBag size={24} color="#000" />
                </div>
              )}

              <div
                className="wishlist-product-color"
                style={{ backgroundColor: product.color || "gray" }}
              ></div>

              <div className="wishlist-rating">
                {"★".repeat(product.rating)}
                <span>
                  ({product.reviews} Review{product.reviews > 1 ? "s" : ""})
                </span>
              </div>

              <div className="wishlist-price">
                <span className="wishlist-original-price">
                  ₨ {product.price || 0}
                </span>
                {product.discountPrice && (
                  <span className="wishlist-discount-price">
                    ₨ {product.discountPrice}
                  </span>
                )}
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default WishListProduct;
