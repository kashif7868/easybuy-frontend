// productData.js
import productImage1 from "../assets/images/product/0USM2P24V354_2.png";
import productImage2 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.52_455b025f.jpg";
import productImage3 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.53_26864108.jpg";
import productImage4 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.53_fc52264f.jpg";
import productImage5 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.53.17_44a5c57c.jpg";

export const productData = [
  {
    category: "Men",
    subCategories: [
      {
        subCategory: "T-Shirts",
        products: [
          {
            id: 1,
            name: "Example T-Shirt",
            color: "Red",
            price: 20.0,
            discountPrice: 18.0,
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
                name: "Winter Jacket",
                price: 50.0,
                discountPrice: 45.0,
                rating: 4,
                image: productImage5,
              },
              {
                name: "Sport Shoes",
                price: 80.0,
                discountPrice: 72.0,
                rating: 5,
                image: productImage5,
              },
            ],
          },
          // Add more T-shirt products here
        ],
      },
      {
        subCategory: "Jeans",
        products: [
          {
            id: 2,
            name: "Slim Fit Jeans",
            color: "Blue",
            price: 40.0,
            discountPrice: 35.0,
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
                name: "Leather Belt",
                price: 25.0,
                discountPrice: 20.0,
                rating: 4,
                image: productImage3,
              },
              {
                name: "Casual Sneakers",
                price: 50.0,
                discountPrice: 45.0,
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
    category: "Women",
    subCategories: [
      {
        subCategory: "Dresses",
        products: [
          {
            id: 3,
            name: "Summer Dress",
            color: "Pink",
            price: 30.0,
            discountPrice: 28.0,
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
                name: "High Heels",
                price: 60.0,
                discountPrice: 55.0,
                rating: 4,
                image: productImage4,
              },
              {
                name: "Handbag",
                price: 40.0,
                discountPrice: 38.0,
                rating: 5,
                image: productImage5,
              },
            ],
          },
          // Add more dresses here
        ],
      },
      {
        subCategory: "Blouses",
        products: [
          {
            id: 4,
            name: "Silk Blouse",
            color: "White",
            price: 35.0,
            discountPrice: 30.0,
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
                name: "Slim Fit Pants",
                price: 45.0,
                discountPrice: 40.0,
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
