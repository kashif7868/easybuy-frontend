import casualWearCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.37.58 - Create a simple, clear icon representing Casual Wear for men, featuring a t-shirt and jeans in a minimalistic and modern design. Use a monochrome colo.webp";
import formalWearCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.38.01 - Create a simple, clear icon representing Formal Wear for men, featuring a suit and tie in a minimalistic and modern design. Use a monochrome color pal.webp";
import streetStyleCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.38.04 - Create a simple, clear icon representing Street Style for men, featuring a hoodie and sneakers in a minimalistic and modern design. Use a monochrome c.webp";
import athleisureCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.38.27 - Create a simple, clear icon representing Athleisure for men, featuring a tracksuit and running shoes in a minimalistic and modern design. Use a monoch.webp";
import accessoriesCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.39.16 - Create a simple, clear icon representing Accessories for men, featuring a watch and sunglasses in a minimalistic and modern design. Use a monochrome c.webp";
import footwearCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.39.30 - Create a simple, clear icon representing Footwear for men, featuring a sneaker and a pair of boots in a minimalistic and modern design. Use a monochro.webp";
import groomingCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.39.57 - Create a simple, clear icon representing Grooming & Skincare for men, featuring a razor and a bottle of skincare cream in a minimalistic and modern de.webp";
import seasonalFashionCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.40.19 - Create a simple, clear icon representing Seasonal Fashion for men, featuring a winter coat and sunglasses in a minimalistic and modern design. Use a m.webp";
import productImage1 from "../assets/images/product/0USM2P24V354_2.png";
import productImage2 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.52_455b025f.jpg";
import productImage3 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.53_26864108.jpg";
import productImage4 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.52.53_fc52264f.jpg";
import productImage5 from "../assets/images/product/WhatsApp Image 2025-01-16 at 11.53.17_44a5c57c.jpg";
export const productData = [
  {
    id: 1,
    categoryName: "Casual Wear",
    image: casualWearCategoryImage,
    subCategories: [
      {
        id: 1,
        subCategoryName: "T-Shirts",
        smallCategories: [
          {
            id: 1,
            smallCategoryName: "Plain",
            products: [
              {
                id: 1,
                categoryName: "Casual Wear",
                subCategoryName: "T-Shirts",
                smallCategoryName: "Plain",
                name: "Plain Red T-Shirt",
                color: "Red",
                price: 2000,
                discountPrice: 1800,
                rating: 4.5,
                reviews: 10,
                description:
                  "A simple, comfortable red t-shirt perfect for everyday wear.",
                image: productImage1,
                additionalImages: [productImage1, productImage2],
                colors: ["Red", "Blue", "Black"],
                sizes: ["M", "L", "XL"],
                itemsStock: 50,
                relatedProducts: [
                  {
                    id: 2,
                    name: "Casual Jeans",
                    price: 3500,
                    discountPrice: 3200,
                    rating: 4.6,
                    image: productImage3,
                  },
                ],
              },
              {
                id: 2,
                categoryName: "Casual Wear",
                subCategoryName: "T-Shirts",
                smallCategoryName: "Plain",
                name: "Plain Blue T-Shirt",
                color: "Blue",
                price: 1900,
                discountPrice: 1700,
                rating: 4.3,
                reviews: 12,
                description:
                  "A simple, comfortable blue t-shirt for casual days.",
                image: productImage2,
                additionalImages: [productImage2, productImage1],
                colors: ["Red", "Blue", "Black"],
                sizes: ["M", "L", "XL"],
                itemsStock: 45,
                relatedProducts: [
                  {
                    id: 3,
                    name: "Casual Shorts",
                    price: 1500,
                    discountPrice: 1400,
                    rating: 4.2,
                    image: productImage4,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    categoryName: "Formal Wear",
    image: formalWearCategoryImage,
    subCategories: [
      {
        id: 1,
        subCategoryName: "Suits",
        smallCategories: [
          {
            id: 1,
            smallCategoryName: "Business",
            products: [
              {
                id: 3,
                categoryName: "Formal Wear",
                subCategoryName: "Suits",
                smallCategoryName: "Business",
                name: "Business Suit",
                color: "Navy Blue",
                price: 12000,
                discountPrice: 11000,
                rating: 5,
                reviews: 15,
                description:
                  "A classic business suit for professional settings.",
                image: productImage4,
                additionalImages: [productImage4, productImage5],
                colors: ["Navy Blue", "Black", "Gray"],
                sizes: ["M", "L", "XL"],
                itemsStock: 30,
                relatedProducts: [
                  {
                    id: 4,
                    name: "Formal Shirt",
                    price: 3000,
                    discountPrice: 2800,
                    rating: 4.7,
                    image: productImage2,
                  },
                ],
              },
              {
                id: 4,
                categoryName: "Formal Wear",
                subCategoryName: "Suits",
                smallCategoryName: "Business",
                name: "Gray Business Suit",
                color: "Gray",
                price: 12500,
                discountPrice: 11500,
                rating: 4.8,
                reviews: 18,
                description:
                  "A sophisticated gray business suit for formal events.",
                image: productImage5,
                additionalImages: [productImage5, productImage4],
                colors: ["Gray", "Black", "Navy Blue"],
                sizes: ["M", "L", "XL"],
                itemsStock: 25,
                relatedProducts: [
                  {
                    id: 5,
                    name: "Formal Trousers",
                    price: 3500,
                    discountPrice: 3300,
                    rating: 4.6,
                    image: productImage1,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    categoryName: "Street Style",
    image: streetStyleCategoryImage,
    subCategories: [
      {
        id: 1,
        subCategoryName: "Hoodies",
        smallCategories: [
          {
            id: 1,
            smallCategoryName: "Urban",
            products: [
              {
                id: 5,
                categoryName: "Street Style",
                subCategoryName: "Hoodies",
                smallCategoryName: "Urban",
                name: "Urban Street Hoodie",
                color: "Black",
                price: 4000,
                discountPrice: 3800,
                rating: 4.8,
                reviews: 8,
                description:
                  "A trendy black hoodie with urban style, perfect for the streets.",
                image: productImage1,
                additionalImages: [productImage1, productImage3],
                colors: ["Black", "Gray", "White"],
                sizes: ["M", "L", "XL"],
                itemsStock: 40,
                relatedProducts: [
                  {
                    id: 6,
                    name: "Street Sneakers",
                    price: 5500,
                    discountPrice: 5000,
                    rating: 4.9,
                    image: productImage2,
                  },
                ],
              },
              {
                id: 6,
                categoryName: "Street Style",
                subCategoryName: "Hoodies",
                smallCategoryName: "Urban",
                name: "Urban Gray Hoodie",
                color: "Gray",
                price: 3800,
                discountPrice: 3500,
                rating: 4.7,
                reviews: 12,
                description: "A stylish gray hoodie for urban streetwear.",
                image: productImage2,
                additionalImages: [productImage2, productImage3],
                colors: ["Black", "Gray", "White"],
                sizes: ["M", "L", "XL"],
                itemsStock: 30,
                relatedProducts: [
                  {
                    id: 7,
                    name: "Street Sneakers",
                    price: 5400,
                    discountPrice: 5100,
                    rating: 4.6,
                    image: productImage3,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    categoryName: "Athleisure",
    image: athleisureCategoryImage,
    subCategories: [
      {
        id: 1,
        subCategoryName: "Joggers",
        smallCategories: [
          {
            id: 1,
            smallCategoryName: "Comfort Fit",
            products: [
              {
                id: 7,
                categoryName: "Athleisure",
                subCategoryName: "Joggers",
                smallCategoryName: "Comfort Fit",
                name: "Comfort Joggers",
                color: "Charcoal",
                price: 2500,
                discountPrice: 2300,
                rating: 4.5,
                reviews: 7,
                description:
                  "Comfortable joggers for both sport and casual wear.",
                image: productImage3,
                additionalImages: [productImage3, productImage4],
                colors: ["Charcoal", "Black", "Navy Blue"],
                sizes: ["M", "L", "XL"],
                itemsStock: 35,
                relatedProducts: [
                  {
                    id: 8,
                    name: "Athletic Shoes",
                    price: 3500,
                    discountPrice: 3200,
                    rating: 4.6,
                    image: productImage5,
                  },
                ],
              },
              {
                id: 8,
                categoryName: "Athleisure",
                subCategoryName: "Joggers",
                smallCategoryName: "Comfort Fit",
                name: "Slim Fit Joggers",
                color: "Black",
                price: 2400,
                discountPrice: 2200,
                rating: 4.6,
                reviews: 10,
                description:
                  "Stylish slim-fit joggers for an active lifestyle.",
                image: productImage4,
                additionalImages: [productImage4, productImage5],
                colors: ["Black", "Gray", "Navy Blue"],
                sizes: ["M", "L", "XL"],
                itemsStock: 28,
                relatedProducts: [
                  {
                    id: 9,
                    name: "Running Shoes",
                    price: 4000,
                    discountPrice: 3800,
                    rating: 4.8,
                    image: productImage5,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // Additional categories and products to reach 24 products
  {
    id: 5,
    categoryName: "Accessories",
    image: accessoriesCategoryImage,
    subCategories: [
      {
        id: 1,
        subCategoryName: "Watches",
        smallCategories: [
          {
            id: 1,
            smallCategoryName: "Luxury",
            products: [
              {
                id: 9,
                categoryName: "Accessories",
                subCategoryName: "Watches",
                smallCategoryName: "Luxury",
                name: "Luxury Wristwatch",
                color: "Silver",
                price: 15000,
                discountPrice: 14000,
                rating: 5,
                reviews: 12,
                description: "A luxury wristwatch with a stainless steel band.",
                image: productImage4,
                additionalImages: [productImage4, productImage5],
                colors: ["Silver", "Gold"],
                itemsStock: 25,
                relatedProducts: [
                  {
                    id: 10,
                    name: "Leather Wallet",
                    price: 5000,
                    discountPrice: 4500,
                    rating: 4.7,
                    image: productImage1,
                  },
                ],
              },
              {
                id: 10,
                categoryName: "Accessories",
                subCategoryName: "Watches",
                smallCategoryName: "Luxury",
                name: "Gold Luxury Watch",
                color: "Gold",
                price: 16000,
                discountPrice: 15000,
                rating: 5,
                reviews: 18,
                description:
                  "A classic gold luxury wristwatch with a sleek design.",
                image: productImage5,
                additionalImages: [productImage5, productImage4],
                colors: ["Gold", "Silver"],
                itemsStock: 22,
                relatedProducts: [
                  {
                    id: 11,
                    name: "Leather Wallet",
                    price: 5200,
                    discountPrice: 4800,
                    rating: 4.9,
                    image: productImage2,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    categoryName: "Footwear",
    image: footwearCategoryImage,
    subCategories: [
      {
        id: 1,
        subCategoryName: "Sneakers",
        smallCategories: [
          {
            id: 1,
            smallCategoryName: "Running",
            products: [
              {
                id: 11,
                categoryName: "Footwear",
                subCategoryName: "Sneakers",
                smallCategoryName: "Running",
                name: "Running Sneakers",
                color: "Blue",
                price: 4500,
                discountPrice: 4200,
                rating: 4.7,
                reviews: 14,
                description: "Comfortable running sneakers for daily use.",
                image: productImage5,
                additionalImages: [productImage5, productImage2],
                colors: ["Blue", "Gray", "Black"],
                sizes: ["8", "9", "10"],
                itemsStock: 50,
                relatedProducts: [
                  {
                    id: 12,
                    name: "Sports Socks",
                    price: 1000,
                    discountPrice: 900,
                    rating: 4.5,
                    image: productImage3,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    categoryName: "Grooming & Skincare",
    image: groomingCategoryImage,
    subCategories: [
      {
        id: 1,
        subCategoryName: "Shaving Kits",
        smallCategories: [
          {
            id: 1,
            smallCategoryName: "Complete Kit",
            products: [
              {
                id: 13,
                categoryName: "Grooming & Skincare",
                subCategoryName: "Shaving Kits",
                smallCategoryName: "Complete Kit",
                name: "Complete Shaving Kit",
                color: "Black",
                price: 3500,
                discountPrice: 3200,
                rating: 4.8,
                reviews: 6,
                description: "A complete shaving kit for a smooth and comfortable shave.",
                image: productImage4,
                additionalImages: [productImage4, productImage5],
                colors: ["Black", "Silver"],
                itemsStock: 20,
                relatedProducts: [
                  {
                    id: 14,
                    name: "Shaving Cream",
                    price: 800,
                    discountPrice: 700,
                    rating: 4.5,
                    image: productImage2,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    categoryName: "Seasonal Fashion",
    image: seasonalFashionCategoryImage,
    subCategories: [
      {
        id: 1,
        subCategoryName: "Winter Wear",
        smallCategories: [
          {
            id: 1,
            smallCategoryName: "Coats",
            products: [
              {
                id: 15,
                categoryName: "Seasonal Fashion",
                subCategoryName: "Winter Wear",
                smallCategoryName: "Coats",
                name: "Winter Coat",
                color: "Dark Blue",
                price: 12000,
                discountPrice: 11000,
                rating: 4.9,
                reviews: 20,
                description: "A warm and stylish winter coat for the cold season.",
                image: productImage1,
                additionalImages: [productImage1, productImage3],
                colors: ["Dark Blue", "Gray"],
                sizes: ["M", "L", "XL"],
                itemsStock: 15,
                relatedProducts: [
                  {
                    id: 16,
                    name: "Winter Scarf",
                    price: 1500,
                    discountPrice: 1400,
                    rating: 4.8,
                    image: productImage2,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default productData;
