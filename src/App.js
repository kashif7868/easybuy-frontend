import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrderDetailsPage from "./pages/Checkout/OrderDetailsPage";
import AllPages from "./components/AllPages";
import Preloader from "./components/Preloader";
import { AuthProvider } from "./context/authContext";
import useNavigationLoader from "./hooks/useNavigationLoader";
import SearchResults from "./pages/SearchResults";
import MyOrders from "./pages/Checkout/MyOrders";
import PromoPopUp from "./components/PromoPopUp"; // Import the PromoPopUp component

const AppContent = () => {
  const loading = useNavigationLoader();

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          <PromoPopUp /> {/* Show the pop-up */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/order-details/:orderId"
              element={<OrderDetailsPage />}
            />
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
