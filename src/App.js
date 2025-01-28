import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import AllPages from "./components/AllPages";
import Preloader from "./components/Preloader";
import useNavigationLoader from "./hooks/useNavigationLoader";
const AppContent = () => {
  const loading = useNavigationLoader();

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" component={CartPage} />
            <Route path="/*" element={<AllPages />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default AppContent;
