import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../../app/reducer/favoritesSlice";
import { addToCart } from "../../app/actions/actionsCart";
import { enqueueSnackbar } from "notistack"; // Assuming you're using this for notifications
import { LuHeart } from "react-icons/lu";
import productData from "../../data/productData"; 
import { HiOutlineShoppingBag } from "react-icons/hi";

const BestSaleProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wishlistLoading, setWishlistLoading] = useState(null);
  const [loading, setLoading] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const favorites = useSelector((state) => state.favorites);

  const isFavorite = (productId) => Array.isArray(favorites) && favorites.includes(productId);

  const handleFavoriteToggle = (product) => {
    setWishlistLoading(product.id);
    if (isFavorite(product.id)) {
      dispatch(removeFromFavorites(product.id));
      enqueueSnackbar(`${product.productName || "Product"} removed from favorites.`, { variant: "info" });
    } else {
      dispatch(addToFavorites(product.id));
      enqueueSnackbar(`${product.productName || "Product"} added to favorites!`, { variant: "success" });
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
      enqueueSnackbar(`${product.name || "Product"} added to cart!`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to add product to cart.", { variant: "error" });
    } finally {
      setTimeout(() => {
        setLoading(null);
      }, 1000);
    }
  };

  // Get products from all categories, subcategories, and small categories, and filter those with a discount
  const bestSaleProducts = productData
    .flatMap(category =>
      category.subCategories.flatMap(subCategory =>
        subCategory.smallCategories.flatMap(smallCategory => smallCategory.products)
      )
    )
    .filter((product) => product.discountPrice)
    .sort((a, b) => (b.discountPrice || 0) - (a.discountPrice || 0))
    .slice(0, 5); // Display top 5 best-selling products

  return (
    <div className="products-grid">
      {bestSaleProducts.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => handleProductClick(product.id)}
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          {product.discountPrice && <div className="sale-banner">10% Off</div>}
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
            {product.discountPrice && (
              <span className="discount-price">₨ {product.discountPrice}</span>
            )}
            <span className="original-price">₨ {product.price || 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestSaleProducts;
