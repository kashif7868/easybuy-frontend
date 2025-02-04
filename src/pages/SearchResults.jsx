import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { productData } from '../data/productData'; 
import '../assets/css/Pages/searchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filterProducts = () => {
      if (!searchQuery) {
        setFilteredProducts([]); 
        setLoading(false);
        return;
      }

      const products = productData
        .map(category => category.subCategories)
        .flat()
        .map(subCategory => subCategory.products)
        .flat()
        .filter(product => {
          const productName = product.name || "";
          const productDescription = product.description || "";
          const productColor = product.color || "";
          return (
            productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            productDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
            productColor.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });

      setFilteredProducts(products);
      setLoading(false);
    };

    filterProducts();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="loader-container">
        <p>Searching...</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h2>Search Results for: "{searchQuery}"</h2>
      {filteredProducts.length === 0 ? (
        <p>No products found. Please try a different search.</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ₨ {product.discountPrice || product.price}</p>
              <p>Rating: {product.rating} stars</p>
              <p>{product.reviews} reviews</p>
              <div className="related-products">
                <h4>Related Products:</h4>
                <ul>
                  {product.relatedProducts && product.relatedProducts.length > 0 ? (
                    product.relatedProducts.map((relatedProduct, idx) => (
                      <li key={idx}>
                        <img src={relatedProduct.image} alt={relatedProduct.name} />
                        <p>{relatedProduct.name}</p>
                        <p>₨ {relatedProduct.discountPrice || relatedProduct.price}</p>
                      </li>
                    ))
                  ) : (
                    <p>No related products available.</p>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
