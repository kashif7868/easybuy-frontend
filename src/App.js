import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
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
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default AppContent;
