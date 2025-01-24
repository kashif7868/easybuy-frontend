import React, { useState } from 'react'; // Import React and useState
import { useParams } from 'react-router-dom'; // Import useParams
import productImage1 from "../assets/images/product/0USM2P24V354_2.png";
import productImage2 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.52_455b025f.jpg";
import productImage3 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.53_26864108.jpg";
import productImage4 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.53_fc52264f.jpg";
import productImage5 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.53.17_44a5c57c.jpg";
import "../assets/css/Pages/productView.css"; 
const ProductView = () => {
  const { id } = useParams(); // Fetch product ID from the URL
  const [selectedImage, setSelectedImage] = useState(productImage1); // Default product image
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: id, // Product ID fetched from the URL
    name: 'Example T-Shirt',
    color: 'Red',
    price: 20.00,
    discountPrice: 18.00,
    rating: 5,
    reviews: 1,
    description: 'This is an example t-shirt made of high-quality cotton, perfect for everyday wear.',
    image: productImage1, // Replace with actual image path
    additionalImages: [productImage1, productImage2, productImage3, productImage4, productImage5], // Additional product images
    colors: ['Red', 'Blue', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    relatedProducts: [
      {
        name: 'Winter Jacket',
        price: 50.00,
        discountPrice: 45.00,
        rating: 4,
        image: productImage5,
      },
      {
        name: 'Sport Shoes',
        price: 80.00,
        discountPrice: 72.00,
        rating: 5,
        image: productImage5,
      },
    ]
  };

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
    console.log('Product added to cart');
    // Add the product to the cart logic
  };

  const handleBuyNow = () => {
    console.log('Proceeding to checkout');
    // Proceed to checkout logic
  };

  return (
    <div className="product-view-container">
      {/* Left: Product Images */}
      <div className="product-images-section">
        <img src={selectedImage} alt={product.name} className="main-product-image" />
        <div className="thumbnail-container">
          {product.additionalImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${selectedImage === image ? 'thumbnail-active' : ''}`}
              onClick={() => handleImageChange(image)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="product-details-contant-info">
        <div className="product-title">{product.name}</div>

        <div className="product-description">
          <p className="description-text">{product.description}</p>
        </div>

        {/* Product Reviews */}
        <div className="product-reviews-section">
          <div className="stars-container">
            {'★'.repeat(product.rating).split('').map((star, index) => (
              <span key={index} className="star-filled">{star}</span>
            ))}
            <span>({product.reviews} Review{product.reviews > 1 ? 's' : ''})</span>
          </div>
        </div>

        {/* Product Price */}
        <div className="product-price-section">
          <span className="old-price">${product.price.toFixed(2)}</span>
          <span className="current-price">${product.discountPrice.toFixed(2)}</span>
        </div>

        {/* Color Options */}
        <div className="color-options-section">
          <div className="color-options">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className={`color-box ${selectedColor === color ? 'color-active' : ''}`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>
        </div>

        {/* Size Options */}
        <div className="size-options-section">
          <div className="size-options-boxes">
            {product.sizes.map((size, index) => (
              <div
                key={index}
                className={`size-option-box ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="quantity-section">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="quantity-input"
          />
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-section">
          <button className="add-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products-section">
        <h3>Related Products</h3>
        <div className="related-products-grid">
          {product.relatedProducts.map((relatedProduct, index) => (
            <div key={index} className="related-product-card">
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="related-product-img"
              />
              <div className="related-product-info">
                <div className="related-product-name">{relatedProduct.name}</div>
                <div className="related-product-price">
                  <span className="related-product-old-price">${relatedProduct.price}</span>
                  <span className="related-product-current-price">${relatedProduct.discountPrice}</span>
                </div>
                <div className="related-product-rating">
                  {'★'.repeat(relatedProduct.rating).split('').map((star, index) => (
                    <span key={index} className="star-filled">{star}</span>
                  ))}
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
