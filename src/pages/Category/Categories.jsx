import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../../data/productData";
import "../../assets/css/Pages/customCategories.css";

const Categories = () => {
  const { categoryId } = useParams(); // Get categoryId from URL
  const [categoryData, setCategoryData] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("topSale");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategoryOpen, setSubCategoryOpen] = useState({});

  // Load the category data based on categoryId from URL
  useEffect(() => {
    const category = productData.find((cat) => cat.id === parseInt(categoryId));
    if (category) {
      setCategoryData(category);
      setFilteredProducts(
        category.subCategories.flatMap((subCat) => subCat.products)
      );
      setSelectedCategory(categoryId);
    } else {
      setCategoryData(null);
      setFilteredProducts([]);
    }
  }, [categoryId]);

  // Apply filters and sorting
  useEffect(() => {
    if (categoryData && filteredProducts.length > 0) {
      let filtered = filteredProducts.filter(
        (product) =>
          product.discountPrice >= filterOptions.minPrice &&
          product.discountPrice <= filterOptions.maxPrice &&
          product.rating >= filterOptions.rating
      );

      if (sortOption === "highToLowPrice") {
        filtered.sort((a, b) => b.discountPrice - a.discountPrice);
      } else if (sortOption === "lowToHighPrice") {
        filtered.sort((a, b) => a.discountPrice - b.discountPrice);
      } else if (sortOption === "topSale") {
        filtered.sort((a, b) => b.sales - a.sales); // Assuming 'sales' field exists for top sale sorting
      }

      setFilteredProducts(filtered);
    }
  }, [filterOptions, sortOption, categoryData, filteredProducts]);

  // Handle subcategory click
  const handleSubCategoryClick = (subCategoryId) => {
    const subCategory = categoryData.subCategories.find(
      (sub) => sub.id === subCategoryId
    );
    if (subCategory) {
      setFilteredProducts(subCategory.products);
    }
  };

  // Toggle the visibility of subcategories
  const toggleSubCategory = (subCategoryId) => {
    setSubCategoryOpen((prev) => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId],
    }));
  };

  if (!categoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categories-page">
      {/* Left Sidebar: Categories with Filters */}
      <div className="professional left-sidebar">
        <h3>Categories</h3>
        {/* Category list with subcategories */}
        <ul className="category-manu-container">
          {productData
            .filter((category) => category.id === parseInt(categoryId))
            .map((category) => (
              <li key={category.id}>
                <span
                  style={{
                    cursor: "pointer",
                    fontWeight:
                      selectedCategory === category.id ? "bold" : "normal",
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
                          onClick={() => handleSubCategoryClick(subCategory.id)}
                        >
                          {subCategory.subCategoryName}
                        </span>
                        <button onClick={() => toggleSubCategory(subCategory.id)}>
                          {subCategoryOpen[subCategory.id] ? "-" : "+"}
                        </button>
                        {subCategoryOpen[subCategory.id] && (
                          <ul>
                            {subCategory.products.map((product) => (
                              <li key={product.id}>{product.name}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>

        {/* Filters */}
        <div className="filter-options">
          <h4>Filters</h4>
          
          {/* Price Range Filter */}
          <label>Price Range</label>
          <div className="price-filter">
            <input
              type="number"
              placeholder="Min Price"
              value={filterOptions.minPrice}
              onChange={(e) =>
                setFilterOptions({
                  ...filterOptions,
                  minPrice: parseInt(e.target.value),
                })
              }
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filterOptions.maxPrice}
              onChange={(e) =>
                setFilterOptions({
                  ...filterOptions,
                  maxPrice: parseInt(e.target.value),
                })
              }
            />
          </div>

          {/* Rating Filter */}
          <label>Minimum Rating</label>
          <div className="rating-filter">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setFilterOptions({ ...filterOptions, rating: index + 1 })
                }
                style={{
                  color: filterOptions.rating > index ? "gold" : "gray",
                }}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Section: Sorting Options */}
      <div className="professional top-section">
        <h4>Sort By</h4>
        <div className="sorting">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="topSale">Top Sale</option>
            <option value="highToLowPrice">High to Low Price</option>
            <option value="lowToHighPrice">Low to High Price</option>
          </select>
        </div>
      </div>

      {/* Product Container: Display Products in Grid */}
      <div className="professional product-container">
        <h2>{categoryData.categoryName}</h2>
        <div className="product-list">
          {filteredProducts.length === 0 ? (
            <div>No products found with applied filters.</div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ₨{product.discountPrice}</p>
                <p>
                  Rating: {product.rating} ({product.reviews} reviews)
                </p>
                <button>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
