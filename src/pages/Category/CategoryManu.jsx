import React from "react";

const CategoryManu = () => {
  const containerRef = useRef(null); // Reference to the scrollable container

  // Handle scrolling
  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 220; // Adjust the scroll step
      containerRef.current.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  const handleCategoryClick = (id) => {
    console.log(`Category ${id} clicked`);
    // You can add behavior here when a category is clicked
  };

  const getCategoryStock = (id) => {
    // Assuming productData has a stock property
    const category = productData.find((item) => item.id === id);
    return category ? category.stock : 0;
  };
  return (
    <div>
      <section className="category-container-main">
        <div
          className="category-arrow-left"
          onClick={() => scroll("left")} // Scroll left when clicked
        >
          <MdOutlineKeyboardArrowLeft />
        </div>
        <div ref={containerRef} className="category-scroll-wrapper">
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
        <div
          className="category-arrow-right"
          onClick={() => scroll("right")} // Scroll right when clicked
        >
          <MdOutlineKeyboardArrowRight />
        </div>
      </section>
    </div>
  );
};

export default CategoryManu;
