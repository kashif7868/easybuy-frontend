import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../app/reducer/favoritesSlice";
import { addToCart } from "../../app/actions/actionsCart";
import { enqueueSnackbar } from "notistack";
import productData from "../../data/productData";
import { LuHeart } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import "../../assets/css/Pages/products/dealsOfTheDay.css";

const DealsOfTheDay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wishlistLoading, setWishlistLoading] = useState(null);
  const [loading, setLoading] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  // Set the end time for the sale (real-time countdown)
  const saleEndTime = new Date().setHours(23, 59, 59, 999); // Example: End of the day

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = saleEndTime - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [saleEndTime]);

  const favorites = useSelector((state) => state.favorites);
  const isFavorite = (productId) =>
    Array.isArray(favorites) && favorites.includes(productId);

  const handleFavoriteToggle = (product) => {
    setWishlistLoading(product.id);
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
      setWishlistLoading(null);
    }, 1000);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (product) => {
    setLoading(product.id);
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

  // Get products from all categories, subcategories, and small categories, and filter those with a discount
  const dealsOfTheDay = productData
    .flatMap((category) =>
      category.subCategories.flatMap((subCategory) =>
        subCategory.smallCategories.flatMap((smallCategory) => smallCategory.products)
      )
    )
    .filter((product) => product.discountPrice)
    .slice(0, 4); // Display top 4 deals

  return (
    <div className="df-deals-of-the-day">
      <div className="df-deals-of-the-day-header">
        <span>Deals of the Day</span>
        <span className="df-hurry-up">
          Hurry up! Sale ends in: {timeLeft.days}d {timeLeft.hours}h{" "}
          {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
      <div className="df-products-grid">
        {dealsOfTheDay.map((product) => (
          <div
            key={product.id}
            className="df-product-card"
            onClick={() => handleProductClick(product.id)}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {product.discountPrice && (
              <div className="df-sale-banner">10% Off</div>
            )}
            <div
              className="df-wishlist-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteToggle(product);
              }}
            >
              {wishlistLoading === product.id ? (
                <div className="df-loading-spinner"></div>
              ) : (
                <LuHeart color={isFavorite(product.id) ? "red" : "gray"} />
              )}
            </div>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            {hoveredProduct === product.id && (
              <div
                className="df-add-to-cart-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                {loading === product.id ? (
                  <div className="df-loading-spinner"></div>
                ) : (
                  <HiOutlineShoppingBag size={24} color="#000" />
                )}
              </div>
            )}
            <div className="df-rating">
              {"★".repeat(product.rating)}
              <span>
                ({product.reviews} Review{product.reviews > 1 ? "s" : ""})
              </span>
            </div>
            <div className="df-price">
              {product.discountPrice && (
                <span className="df-discount-price">
                  ₨ {product.discountPrice}
                </span>
              )}
              <span className="df-original-price">₨ {product.price || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsOfTheDay;
