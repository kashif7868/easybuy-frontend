import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { productData } from '../data/productData'; // Import productData
import '../assets/css/Pages/searchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filterProducts = () => {
      if (!searchQuery) {
        setFilteredProducts([]); // If no search query, show no results
        setLoading(false);
        return;
      }

      console.log("Search Query:", searchQuery); // Debugging log for query

      // Flatten the product categories and filter by search query
      const products = productData
        .map(category => category.subCategories)
        .flat()
        .map(subCategory => subCategory.products)
        .flat()
        .filter(product => {
          const productName = product.name || "";
          const productDescription = product.description || "";
          const productColor = product.color || "";

          const match = 
            productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            productDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
            productColor.toLowerCase().includes(searchQuery.toLowerCase());

          console.log("Product Match:", match, product.name); // Debugging log for each product
          return match;
        });

      console.log("Filtered Products:", products); // Debugging log for filtered products
      setFilteredProducts(products);
      setLoading(false);
    };

    filterProducts(); // Execute the filter function

  }, [searchQuery]); // Re-run when searchQuery changes

  if (loading) {
    return (
      <div className="loader-container">
        <p>Searching...</p>
        {/* You can replace the text with an actual spinner or a loading animation */}
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
