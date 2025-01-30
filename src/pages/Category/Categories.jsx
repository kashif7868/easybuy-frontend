import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../../data/productData";
import "../../assets/css/Pages/customCategories.css";

const Categories = () => {
  const { categoryId, subCategoryId } = useParams(); // Adjusting for category and subcategory params
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]); // Initially show all products
  const [filterOptions, setFilterOptions] = useState({
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("price"); // Adding sortOption state

  // Filter products based on selected category and subcategory ID
  useEffect(() => {
    const category = productData.find((item) => item.id === parseInt(categoryId));
    if (category) {
      setCategoryProducts(category);
      setSelectedCategory(categoryId); // Update selected category
      // Set initial products (show all products in the selected category)
      if (subCategoryId) {
        const subCategory = category.subCategories.find(
          (sub) => sub.id === parseInt(subCategoryId)
        );
        if (subCategory) {
          setFilteredProducts(subCategory.products); // Show all products initially
        }
      } else {
        // If no subcategory is selected, show products from the category
        const allProducts = category.subCategories.reduce((acc, sub) => {
          return [...acc, ...sub.products];
        }, []);
        setFilteredProducts(allProducts);
      }
    }
  }, [categoryId, subCategoryId]);

  // Apply filters and sorting after initial products are loaded
  useEffect(() => {
    if (filteredProducts.length > 0) {
      let filtered = filteredProducts.filter(
        (product) =>
          product.discountPrice >= filterOptions.minPrice &&
          product.discountPrice <= filterOptions.maxPrice &&
          product.rating >= filterOptions.rating
      );

      // Apply sorting
      if (sortOption === "price") {
        filtered.sort((a, b) => a.discountPrice - b.discountPrice);
      } else if (sortOption === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
      }

      setFilteredProducts(filtered);
    }
  }, [filterOptions, sortOption, filteredProducts]); // Fixed the dependency array

  if (!categoryProducts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categories-page">
      <div className="left-sidebar">
        <h3>Categories</h3>
        <ul>
          {productData.map((category) => (
            <li key={category.id}>
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: selectedCategory === category.id ? "bold" : "normal",
                }}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.categoryName}
              </span>
              {selectedCategory === category.id && (
                <ul>
                  {category.subCategories.map((subCategory) => (
                    <li key={subCategory.id}>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setFilteredProducts(subCategory.products);
                        }}
                      >
                        {subCategory.subCategoryName}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="right-content">
        <div className="filter-sort-container">
          <div className="filters">
            <h4>Filters</h4>
            <label>Price Range</label>
            <input
              type="number"
              placeholder="Min Price"
              value={filterOptions.minPrice}
              onChange={(e) =>
                setFilterOptions({ ...filterOptions, minPrice: parseInt(e.target.value) })
              }
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filterOptions.maxPrice}
              onChange={(e) =>
                setFilterOptions({ ...filterOptions, maxPrice: parseInt(e.target.value) })
              }
            />
            <label>Minimum Rating</label>
            <input
              type="number"
              min="0"
              max="5"
              value={filterOptions.rating}
              onChange={(e) =>
                setFilterOptions({ ...filterOptions, rating: parseInt(e.target.value) })
              }
            />
          </div>

          <div className="sorting">
            <h4>Sort By</h4>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="product-container">
          {filteredProducts.length === 0 ? (
            <div>No products found with applied filters.</div>
          ) : (
            <div className="product-list">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: {product.discountPrice} PKR</p>
                  <p>Rating: {product.rating} ({product.reviews} reviews)</p>
                  <button>Add to Cart</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
