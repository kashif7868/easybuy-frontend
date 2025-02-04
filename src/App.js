import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import AllPages from "./components/AllPages";
import Preloader from "./components/Preloader";
import { AuthProvider } from "./context/authContext";
import useNavigationLoader from "./hooks/useNavigationLoader";
import SearchResults from "./pages/SearchResults";
import Test from "./pages/Test";
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
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/test" element={<Test />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/*" element={<AllPages />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
