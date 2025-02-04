import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductView from "../pages/ProductView";
import AuthPage from "../components/auth/AuthPage ";
import WishListProduct from "../pages/WishListProduct";
import Categories from "../pages/Category/Categories";
import FeatureProducts from "../pages/Products/FeatureProducts";
import BestSaleProducts from "../pages/Products/BestSaleProducts";
import DealsOfTheDay from "../pages/Products/DealOfDay";
import Contact from "../pages/EasyBuy/Contact";
import ReturnPolicy from "../pages/EasyBuy/ReturnPolicy";
import About from "../pages/EasyBuy/About";
import BlogPage from "../pages/EasyBuy/BlogPage";
import NotFound from "./NotFound";

const AllPages = () => {
  return (
    <Routes>
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/user" element={<AuthPage />} />
      <Route path="/wishlist" element={<WishListProduct />} />
      <Route path="/category/:categoryId" element={<Categories />} />
      <Route path="/featured-products" element={<FeatureProducts />} />
      <Route path="/deals-of-the-day" element={<DealsOfTheDay />} />
      <Route path="/our-best-seller" element={<BestSaleProducts />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/returns" element={<ReturnPolicy  />} />
      <Route path="/about" element={<About  />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllPages;
