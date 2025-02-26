// src/components/ExploreCategory.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../app/reducer/categorySlice";
import { useNavigate } from "react-router-dom";

const ExploreCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select category data from the store
  const { categories, status, error } = useSelector((state) => state.category);

  useEffect(() => {
    // Dispatch the action to fetch categories when the component mounts
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  // Handle category click to navigate to category detail page
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  // Get category stock
  const getCategoryStock = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);

    if (!category) {
      return 0; // Return 0 if category is not found
    }

    // Check if subCategories, smallCategories, and products are defined
    return (
      category.subCategories?.reduce((total, subCategory) => {
        return (
          total +
          subCategory.smallCategories?.reduce((sum, smallCategory) => {
            return (
              sum +
              smallCategory.products?.reduce((sumProduct, product) => {
                return sumProduct + (product.itemsStock || 0); // Ensure itemsStock exists
              }, 0)
            );
          }, 0)
        );
      }, 0) || 0
    ); // If reduce fails, return 0 as default
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <section className="category-container-main">
        <div className="category-header">
          <h2>Explore Categories</h2>
        </div>
        <div className="category-scroll-wrapper">
          {/* Loop through categories to render them */}
          {categories.map((category) => (
            <div key={category.id} className="category-container">
              <div
                onClick={() => handleCategoryClick(category.id)}
                className="category-item"
              >
                <img
                  src={`http://localhost:8000/storage/${category.image}`}
                  alt={category.category_name}
                  className="category-image"
                />
                <div className="category-name">{category.category_name}</div>
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
