import menCategoryImage from "../assets/images/category/man.png";
import womenCategoryImage from "../assets/images/category/woman.png";
import productImage1 from "../assets/images/product/0USM2P24V354_2.png";
import productImage2 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.52_455b025f.jpg";
import productImage3 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.53_26864108.jpg";
import productImage4 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.53_fc52264f.jpg";
import productImage5 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.53.17_44a5c57c.jpg";

export const productData = [
  {
    id: 1, // Category ID
    categoryName: "Men",
    image: menCategoryImage, // Image for the category
    subCategories: [
      {
        id: 1, // Subcategory ID
        subCategoryName: "T-Shirts",
        products: [
          {
            id: 1, // Product ID
            categoryName: "Men", // Category Name
            subCategoryName: "T-Shirts", // Subcategory Name
            name: "Example T-Shirt",
            color: "Red",
            price: 6000, // Price in PKR
            discountPrice: 5400, // Discount price in PKR
            rating: 5,
            reviews: 1,
            description:
              "This is an example t-shirt made of high-quality cotton, perfect for everyday wear.",
            image: productImage1,
            additionalImages: [
              productImage1,
              productImage2,
              productImage3,
              productImage4,
              productImage5,
            ],
            colors: ["Red", "Blue", "Black"],
            sizes: ["S", "M", "L", "XL"],
            relatedProducts: [
              {
                id: 1, // Related product ID
                name: "Winter Jacket",
                price: 15000, // Price in PKR
                discountPrice: 13500, // Discount price in PKR
                rating: 4,
                image: productImage5,
              },
              {
                id: 2, // Related product ID
                name: "Sport Shoes",
                price: 24000, // Price in PKR
                discountPrice: 21600, // Discount price in PKR
                rating: 5,
                image: productImage5,
              },
            ],
          },
          // Add more T-shirt products here
        ],
      },
      {
        id: 2, // Subcategory ID
        subCategoryName: "Jeans",
        products: [
          {
            id: 2, // Product ID
            categoryName: "Men", // Category Name
            subCategoryName: "Jeans", // Subcategory Name
            name: "Slim Fit Jeans",
            color: "Blue",
            price: 12000, // Price in PKR
            discountPrice: 10500, // Discount price in PKR
            rating: 4.5,
            reviews: 12,
            description:
              "Stylish and comfortable slim fit jeans made from high-quality denim.",
            image: productImage2,
            additionalImages: [
              productImage2,
              productImage3,
              productImage4,
            ],
            colors: ["Blue", "Black", "Gray"],
            sizes: ["32", "34", "36", "38"],
            relatedProducts: [
              {
                id: 3, // Related product ID
                name: "Leather Belt",
                price: 7500, // Price in PKR
                discountPrice: 6000, // Discount price in PKR
                rating: 4,
                image: productImage3,
              },
              {
                id: 4, // Related product ID
                name: "Casual Sneakers",
                price: 15000, // Price in PKR
                discountPrice: 13500, // Discount price in PKR
                rating: 5,
                image: productImage4,
              },
            ],
          },
          // Add more jeans products here
        ],
      },
    ],
  },
  {
    id: 2, // Category ID
    categoryName: "Women",
    image: womenCategoryImage, // Image for the category
    subCategories: [
      {
        id: 1, // Subcategory ID
        subCategoryName: "Dresses",
        products: [
          {
            id: 3, // Product ID
            categoryName: "Women", // Category Name
            subCategoryName: "Dresses", // Subcategory Name
            name: "Summer Dress",
            color: "Pink",
            price: 9000, // Price in PKR
            discountPrice: 8400, // Discount price in PKR
            rating: 5,
            reviews: 8,
            description:
              "Elegant and comfortable summer dress perfect for any occasion.",
            image: productImage3,
            additionalImages: [
              productImage3,
              productImage4,
              productImage5,
            ],
            colors: ["Pink", "Red", "White"],
            sizes: ["S", "M", "L"],
            relatedProducts: [
              {
                id: 5, // Related product ID
                name: "High Heels",
                price: 18000, // Price in PKR
                discountPrice: 16500, // Discount price in PKR
                rating: 4,
                image: productImage4,
              },
              {
                id: 6, // Related product ID
                name: "Handbag",
                price: 12000, // Price in PKR
                discountPrice: 11400, // Discount price in PKR
                rating: 5,
                image: productImage5,
              },
            ],
          },
          // Add more dresses here
        ],
      },
      {
        id: 2, // Subcategory ID
        subCategoryName: "Blouses",
        products: [
          {
            id: 4, // Product ID
            categoryName: "Women", // Category Name
            subCategoryName: "Blouses", // Subcategory Name
            name: "Silk Blouse",
            color: "White",
            price: 10500, // Price in PKR
            discountPrice: 9000, // Discount price in PKR
            rating: 4.5,
            reviews: 5,
            description:
              "Luxurious silk blouse perfect for both casual and formal occasions.",
            image: productImage4,
            additionalImages: [
              productImage4,
              productImage5,
            ],
            colors: ["White", "Black", "Cream"],
            sizes: ["M", "L", "XL"],
            relatedProducts: [
              {
                id: 7, // Related product ID
                name: "Slim Fit Pants",
                price: 13500, // Price in PKR
                discountPrice: 12000, // Discount price in PKR
                rating: 4.5,
                image: productImage5,
              },
            ],
          },
          // Add more blouses here
        ],
      },
    ],
  },
  // You can continue with more categories like "Kids", "Food", etc.
];
