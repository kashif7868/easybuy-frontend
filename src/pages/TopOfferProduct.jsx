import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { LuHeart } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../app/reducer/favoritesSlice";
import { addToCart, incrementQty } from "../app/actions/actionsCart";
import { useNavigate } from "react-router-dom";
import { productData } from "../data/productData"; // Import productData
import "../assets/css/Pages/topoffer.css";

const TopOfferProduct = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([]); // State to hold sorted products
  const [wishlistLoading, setWishlistLoading] = useState(null); // State for wishlist loading

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart); // Access cart from Redux store
  const favorites = useSelector((state) => state.favorites); // Access favorites from Redux store

  const closeTopOffer = () => {
    setIsOpen(false);
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navigate to product details page
  };

  const handleMouseEnter = (id) => {
    setHoveredProduct(id);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const handleFavoriteToggle = (product) => {
    setWishlistLoading(product.id); // Show loading spinner for wishlist
    if (favorites.includes(product.id)) {
      dispatch(removeFromFavorites(product.id)); // Remove from favorites if already in
    } else {
      dispatch(addToFavorites(product.id)); // Add to favorites using product ID
    }
    setTimeout(() => {
      setWishlistLoading(null); // Hide the spinner after some time
    }, 1000); // Simulate delay for wishlist operation
  };

  const isFavorite = (id) => {
    return favorites.includes(id); // Check if product ID is in favorites
  };

  const handleAddToCart = (product, qty = 1, selectedSize = "M") => {
    const existingProduct = cart.find(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );

    if (existingProduct) {
      // If the product already exists, increment quantity
      dispatch(incrementQty(product.id, selectedSize));
    } else {
      // Otherwise, add the product to the cart
      dispatch(addToCart({ ...product, qty, selectedSize }));
    }
    setLoading(product.id);
    setTimeout(() => {
      setLoading(null); // Reset loading after some time (e.g., after adding to cart)
    }, 1000); // Simulate delay
  };

  useEffect(() => {
    // Sorting the products by price or any other condition you prefer
    const sorted = productData
      .flatMap((category) =>
        category.subCategories.flatMap((subCategory) =>
          subCategory.smallCategories.flatMap((smallCategory) => smallCategory.products)
        )
      )
      .sort((a, b) => a.price - b.price); // Sort by price in ascending order (you can change this logic)

    setSortedProducts(sorted); // Update state with sorted products
  }, []); // This effect runs once on mount, as there's no dependency array

  return (
    <div>
      {isOpen && (
        <div className="top-offer-page">
          <div className="top-offer-header">
            <h1>Top Offer</h1>
            <button className="top-offer-close-btn" onClick={closeTopOffer}>
              <IoIosClose size={30} className="top-offer-close-icon" />
            </button>
          </div>
          <div className="top-offer-page-content">
            <p>Exclusive deals available now!</p>
            <div className="top-offer-products-grid">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="top-offer-product-card"
                  onClick={() => handleProductClick(product.id)}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {product.discountPrice && (
                    <div className="top-offer-sale-banner">10% Off</div>
                  )}
                  <div
                    className="top-offer-wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteToggle(product);
                    }}
                  >
                    {wishlistLoading === product.id ? (
                      <div className="top-offer-loading-spinner"></div>
                    ) : (
                      <LuHeart
                        color={isFavorite(product.id) ? "red" : "gray"}
                      />
                    )}
                  </div>
                  <img src={product.image} alt={product.name} />
                  <h2>{product.name}</h2>
                  {hoveredProduct === product.id && (
                    <div
                      className="top-offer-add-to-cart-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      {loading === product.id ? (
                        <div className="top-offer-loading-spinner"></div>
                      ) : (
                        <HiOutlineShoppingBag size={24} color="#000" />
                      )}
                    </div>
                  )}
                  <div
                    className="top-offer-product-color"
                    style={{
                      backgroundColor: product.color
                        ? product.color.toLowerCase()
                        : "gray",
                    }}
                  ></div>
                  <div className="top-offer-rating">
                    {"★".repeat(product.rating)}
                    <span>
                      ({product.reviews} Review{product.reviews > 1 ? "s" : ""})
                    </span>
                  </div>
                  <div className="top-offer-price">
                    {product.discountPrice && (
                      <span className="top-offer-discount-price">
                        ₨ {product.discountPrice}
                      </span>
                    )}
                    <span className="top-offer-original-price">
                      ₨ {product.price || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopOfferProduct;
