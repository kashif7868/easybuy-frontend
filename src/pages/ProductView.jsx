import React, { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom"; 
import { addToCart } from "../app/actions/actionsCart"; 
import { useDispatch } from "react-redux"; 
import { productData } from "../data/productData"; 
import "../assets/css/Pages/productView.css";

const ProductView = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState("");  // State for success message

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = productData
        .flatMap(category => category.subCategories)
        .flatMap(subCategory => subCategory.products)
        .find(product => product.id === parseInt(id));

      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image); 
      }
    };

    fetchProduct(); 
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }

    setIsLoading(true); 

    const productToAdd = {
      id: product.id,
      name: product.name,
      selectedSize, // use the selectedSize
      selectedColor, // use the selectedColor
      price: product.discountPrice,
      qty: quantity,
      total: product.discountPrice * quantity, // calculate total based on quantity
      image: selectedImage,
    };

    setTimeout(() => {
      dispatch(addToCart(productToAdd));
      setIsLoading(false); 
      setSuccessMessage("Product added to cart successfully!");  // Set the success message
      console.log("Product added to cart", productToAdd);
    }, 1000); 
  };

  const handleBuyNow = () => {
    console.log("Proceeding to checkout");
  };

  return (
    <div className="product-view-container">
      <div className="product-images-section">
        <img
          src={selectedImage}
          alt={product.name}
          className="main-product-image"
        />
        <div className="thumbnail-container">
          {product.additionalImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${selectedImage === image ? "thumbnail-active" : ""}`}
              onClick={() => handleImageChange(image)}
            />
          ))}
        </div>
      </div>

      <div className="product-details-contant-info">
        <div className="product-title">{product.name}</div>

        <div className="product-description">
          <p className="description-text">{product.description}</p>
        </div>

        <div className="product-reviews-section">
          <div className="stars-container">
            {"★".repeat(product.rating).split("").map((star, index) => (
              <span key={index} className="star-filled">{star}</span>
            ))}
            <span>({product.reviews} Review{product.reviews > 1 ? "s" : ""})</span>
          </div>
        </div>

        <div className="product-price-section">
          <span className="old-price">₨ {product.price.toFixed(0)}</span>
          <span className="current-price">₨ {product.discountPrice.toFixed(0)}</span>
        </div>

        <div className="color-options-section">
          <div className="color-options">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className={`color-box ${selectedColor === color ? "color-active" : ""}`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>
        </div>

        <div className="size-options-section">
          <div className="size-options-boxes">
            {product.sizes.map((size, index) => (
              <div
                key={index}
                className={`size-option-box ${selectedSize === size ? "selected" : ""}`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className="quantity-section">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="quantity-input"
          />
        </div>

        <div className="action-buttons-section">
          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>

        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
      </div>

      <div className="related-products-section">
        <h3>Related Products</h3>
        <div className="related-products-grid">
          {product.relatedProducts.map((relatedProduct, index) => (
            <div key={index} className="related-product-card">
              <img src={relatedProduct.image} alt={relatedProduct.name} className="related-product-img" />
              <div className="related-product-info">
                <div className="related-product-name">{relatedProduct.name}</div>
                <div className="related-product-rating">
                  {"★".repeat(relatedProduct.rating).split("").map((star, index) => (
                    <span key={index} className="star-filled">{star}</span>
                  ))}
                </div>
                <div className="related-product-price">
                  <span className="related-product-old-price">₨ {relatedProduct.price}</span>
                  <span className="related-product-current-price">₨ {relatedProduct.discountPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
