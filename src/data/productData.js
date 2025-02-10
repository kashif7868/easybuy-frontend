import casualWearCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.37.58 - Create a simple, clear icon representing Casual Wear for men, featuring a t-shirt and jeans in a minimalistic and modern design. Use a monochrome colo.webp";
import formalWearCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.38.01 - Create a simple, clear icon representing Formal Wear for men, featuring a suit and tie in a minimalistic and modern design. Use a monochrome color pal.webp";
import streetStyleCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.38.04 - Create a simple, clear icon representing Street Style for men, featuring a hoodie and sneakers in a minimalistic and modern design. Use a monochrome c.webp";
import athleisureCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.38.27 - Create a simple, clear icon representing Athleisure for men, featuring a tracksuit and running shoes in a minimalistic and modern design. Use a monoch.webp";
import accessoriesCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.39.16 - Create a simple, clear icon representing Accessories for men, featuring a watch and sunglasses in a minimalistic and modern design. Use a monochrome c.webp";
import footwearCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.39.30 - Create a simple, clear icon representing Footwear for men, featuring a sneaker and a pair of boots in a minimalistic and modern design. Use a monochro.webp";
import groomingCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.39.57 - Create a simple, clear icon representing Grooming & Skincare for men, featuring a razor and a bottle of skincare cream in a minimalistic and modern de.webp";
import seasonalFashionCategoryImage from "../assets/images/category/DALL·E 2025-02-05 12.40.19 - Create a simple, clear icon representing Seasonal Fashion for men, featuring a winter coat and sunglasses in a minimalistic and modern design. Use a m.webp";

import redTShirtimage from "../assets/images/product/Plain Red T-Shirt.jpeg";
import redTShirtimage1 from "../assets/images/product/Plain Red T-Shirt1.jpeg";
import redTShirtimage2 from "../assets/images/product/Plain Red T-Shirt2.jpeg";
import redTShirtimage3 from "../assets/images/product/Plain Red T-Shirt3.jpeg";
import blueTShirtimage from "../assets/images/product/Plain Blue T-Shirt.jpeg";
import blueTShirtimage1 from "../assets/images/product/Plain Blue T-Shirt1.jpeg";
import blueTShirtimage2 from "../assets/images/product/Plain Blue T-Shirt2.jpeg";
import blueTShirtimage3 from "../assets/images/product/Plain Blue T-Shirt3.jpeg";
import businessSuitImage from "../assets/images/product/Business Suit.jpeg";
import businessSuitImage1 from "../assets/images/product/Business Suit1.jpeg";
import businessSuitImage2 from "../assets/images/product/Business Suit2.jpeg";
import businessSuitImage3 from "../assets/images/product/Business Suit3.jpeg";
import grapBusinessSuitImage from "../assets/images/product/Gray Business Suit.jpeg";
import grapBusinessSuitImage1 from "../assets/images/product/Gray Business Suit1.jpeg";
import grapBusinessSuitImage2 from "../assets/images/product/Gray Business Suit2.jpeg";
import grapBusinessSuitImage3 from "../assets/images/product/Gray Business Suit3.jpeg";
import urbanStreetHoodieImage from "../assets/images/product/Urban Street Hoodie.jpeg";
import urbanStreetHoodieImage1 from "../assets/images/product/Urban Street Hoodie1.jpeg";
import urbanStreetHoodieImage2 from "../assets/images/product/Urban Street Hoodie2.jpeg";
import urbanStreetHoodieImage3 from "../assets/images/product/Urban Street Hoodie3.jpeg";
import urbanGrapHoodieImage from "../assets/images/product/Urban Gray Hoodie.jpeg";
import urbanGrapHoodieImage1 from "../assets/images/product/Urban Gray Hoodie1.jpeg";
import urbanGrapHoodieImage2 from "../assets/images/product/Urban Gray Hoodie2.jpeg";
import urbanGrapHoodieImage3 from "../assets/images/product/Urban Gray Hoodie3.jpeg";
import comfortJoggersImage from "../assets/images/product/Comfort Joggers.jpeg";
import comfortJoggersImage1 from "../assets/images/product/Comfort Joggers1.jpeg";
import comfortJoggersImage2 from "../assets/images/product/Comfort Joggers2.jpeg";
import comfortJoggersImage3 from "../assets/images/product/Comfort Joggers3.jpeg";
import slimFitJoggersImage from "../assets/images/product/Slim Fit Joggers.jpeg";
import slimFitJoggersImage1 from "../assets/images/product/Slim Fit Joggers1.jpeg";
import slimFitJoggersImage2 from "../assets/images/product/Slim Fit Joggers2.jpeg";
import slimFitJoggersImage3 from "../assets/images/product/Slim Fit Joggers3.jpeg";
import luxuryWatchImage from "../assets/images/product/Luxury Watch.jpeg";
import luxuryWatchImage1 from "../assets/images/product/Luxury Watch1.jpeg";
import luxuryWatchImage2 from "../assets/images/product/Luxury Watch2.jpeg";
import luxuryWatchImage3 from "../assets/images/product/Luxury Watch3.jpeg";
import sportSneakersImage from "../assets/images/product/Sports Sneakers.jpeg";
import sportSneakersImage1 from "../assets/images/product/Sports Sneakers1.jpeg";
import sportSneakersImage2 from "../assets/images/product/Sports Sneakers2.jpeg";
import sportSneakersImage3 from "../assets/images/product/Sports Sneakers3.jpeg";
import mensRazorImage from "../assets/images/product/Mens Razor.jpeg";
import mensRazorImage1 from "../assets/images/product/Mens Razor1.jpeg";
import mensRazorImage2 from "../assets/images/product/Mens Razor2.jpeg";
import mensRazorImage3 from "../assets/images/product/Mens Razor3.jpeg";
import winterCoatImage from "../assets/images/product/Winter Coat.jpeg";
import winterCoatImage1 from "../assets/images/product/Winter Coat1.jpeg";
import winterCoatImage2 from "../assets/images/product/Winter Coat2.jpeg";
import winterCoatImage3 from "../assets/images/product/Winter Coat3.jpeg";
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
                description: "A simple, comfortable red t-shirt perfect for everyday wear.",
                image: redTShirtimage,
                additionalImages: [redTShirtimage1, redTShirtimage2, redTShirtimage3],
                colors: ["Red", "Blue", "Black"],
                sizes: ["M", "L", "XL"],
                itemsStock: 50,
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
                description: "A simple, comfortable blue t-shirt for casual days.",
                image: blueTShirtimage,
                additionalImages: [blueTShirtimage1, blueTShirtimage2, blueTShirtimage3],
                colors: ["Red", "Blue", "Black"],
                sizes: ["M", "L", "XL"],
                itemsStock: 45,
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
                description: "A classic business suit for professional settings.",
                image: businessSuitImage,
                additionalImages: [businessSuitImage1, businessSuitImage2, businessSuitImage3],
                colors: ["Navy Blue", "Black", "Gray"],
                sizes: ["M", "L", "XL"],
                itemsStock: 30,
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
                description: "A sophisticated gray business suit for formal events.",
                image: grapBusinessSuitImage,
                additionalImages: [grapBusinessSuitImage1, grapBusinessSuitImage2, grapBusinessSuitImage3],
                colors: ["Gray", "Black", "Navy Blue"],
                sizes: ["M", "L", "XL"],
                itemsStock: 25,
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
                description: "A trendy black hoodie with urban style, perfect for the streets.",
                image: urbanStreetHoodieImage,
                additionalImages: [urbanStreetHoodieImage1, urbanStreetHoodieImage2, urbanStreetHoodieImage3],
                colors: ["Black", "Gray", "White"],
                sizes: ["M", "L", "XL"],
                itemsStock: 40,
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
                image: urbanGrapHoodieImage,
                additionalImages: [urbanGrapHoodieImage1, urbanGrapHoodieImage2, urbanGrapHoodieImage3],
                colors: ["Black", "Gray", "White"],
                sizes: ["M", "L", "XL"],
                itemsStock: 30,
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
                description: "Comfortable joggers for both sport and casual wear.",
                image: comfortJoggersImage,
                additionalImages: [comfortJoggersImage1, comfortJoggersImage2, comfortJoggersImage3],
                colors: ["Charcoal", "Black", "Navy Blue"],
                sizes: ["M", "L", "XL"],
                itemsStock: 35,
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
                description: "Stylish slim-fit joggers for an active lifestyle.",
                image: slimFitJoggersImage,
                additionalImages: [slimFitJoggersImage1, slimFitJoggersImage2, slimFitJoggersImage3],
                colors: ["Black", "Gray", "Navy Blue"],
                sizes: ["M", "L", "XL"],
                itemsStock: 28,
              },
            ],
          },
        ],
      },
    ],
  },
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
                name: "Luxury Watch",
                color: "Gold",
                price: 50000,
                discountPrice: 45000,
                rating: 5,
                reviews: 25,
                description: "A luxury gold watch for an elegant look.",
                image: luxuryWatchImage,
                additionalImages: [luxuryWatchImage1, luxuryWatchImage2, luxuryWatchImage3],
                colors: ["Gold", "Silver"],
                sizes: ["One Size"],
                itemsStock: 10,
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
            smallCategoryName: "Sports",
            products: [
              {
                id: 10,
                categoryName: "Footwear",
                subCategoryName: "Sneakers",
                smallCategoryName: "Sports",
                name: "Sports Sneakers",
                color: "Red",
                price: 5000,
                discountPrice: 4500,
                rating: 4.8,
                reviews: 22,
                description: "Sports sneakers with excellent grip and comfort.",
                image: sportSneakersImage,
                additionalImages: [sportSneakersImage1, sportSneakersImage2, sportSneakersImage3],
                colors: ["Red", "Blue"],
                sizes: ["M", "L", "XL"],
                itemsStock: 15,
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
        subCategoryName: "Shaving",
        smallCategories: [
          {
            id: 1,
            smallCategoryName: "Razors",
            products: [
              {
                id: 11,
                categoryName: "Grooming & Skincare",
                subCategoryName: "Shaving",
                smallCategoryName: "Razors",
                name: "Men's Razor",
                color: "Silver",
                price: 1000,
                discountPrice: 900,
                rating: 4.6,
                reviews: 30,
                description: "A sharp and durable razor for smooth shaving.",
                image: mensRazorImage,
                additionalImages: [mensRazorImage1, mensRazorImage2, mensRazorImage3],
                colors: ["Silver", "Black"],
                sizes: ["One Size"],
                itemsStock: 20,
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
                id: 12,
                categoryName: "Seasonal Fashion",
                subCategoryName: "Winter Wear",
                smallCategoryName: "Coats",
                name: "Winter Coat",
                color: "Black",
                price: 7000,
                discountPrice: 6500,
                rating: 4.7,
                reviews: 18,
                description: "A warm and stylish black winter coat for cold weather.",
                image: winterCoatImage,
                additionalImages: [winterCoatImage1, winterCoatImage2, winterCoatImage3],
                colors: ["Black", "Gray"],
                sizes: ["M", "L", "XL"],
                itemsStock: 15,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default productData;
