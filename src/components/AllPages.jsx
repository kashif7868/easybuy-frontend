import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductView from "../pages/ProductView";

import NotFound from "./NotFound";

const AllPages = () => {
  return (
    <Routes>
      <Route path="/product/:id" element={<ProductView />} />
      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllPages;
