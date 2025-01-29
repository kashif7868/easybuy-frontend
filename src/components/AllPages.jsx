import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductView from "../pages/ProductView";
import AuthPage from "../components/auth/AuthPage ";
import WishListProduct from "../pages/WishListProduct";
import NotFound from "./NotFound";

const AllPages = () => {
  return (
    <Routes>
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/user" element={<AuthPage />} />
      <Route path="/wishlist" element={<WishListProduct />} />
      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllPages;
