import React, { useRef } from "react";
import { productData } from "../../data/productData";
import { useNavigate } from "react-router-dom";

const ExploreCategory = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`); // Navigate to category detail page
  };

  const getCategoryStock = (categoryId) => {
    const category = productData.find((cat) => cat.id === categoryId);
    return category.subCategories.reduce((total, subCategory) => {
      return (
        total +
        subCategory.smallCategories.reduce((sum, smallCategory) => {
          return (
            sum +
            smallCategory.products.reduce((sumProduct, product) => {
              return sumProduct + product.itemsStock;
            }, 0)
          );
        }, 0)
      );
    }, 0);
  };

  return (
    <div>
      <section className="category-container-main">
        <div className="category-header">
          <h2>Explore Categories</h2>
        </div>
        <div ref={containerRef} className="category-scroll-wrapper">
          {/* Loop through categories to render them */}
          {productData.map((category) => (
            <div key={category.id} className="category-container">
              <div
                onClick={() => handleCategoryClick(category.id)}
                className="category-item"
              >
                <img
                  src={category.image}
                  alt={category.categoryName}
                  className="category-image"
                />
                <div className="category-name">{category.categoryName}</div>
                <div className="category-stock-items">
                  {getCategoryStock(category.id)} items in stock
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreCategory;
