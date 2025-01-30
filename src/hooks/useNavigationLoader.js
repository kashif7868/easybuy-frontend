import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useNavigationLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // List of regex patterns for routes requiring a loader
    const routesWithLoader = [
      /^\/$/, // Home
      /^\/search-results$/, // Search Results
      /^\/cart$/, // Cart
      /^\/product\/\d+$/, // Product with ID
      /^\/user$/, // User
      /^\/wishlist$/, // Wishlist
      /^\/category\/[\w-]+$/, // Category with categoryId
      /^\/.*/ // Catch-all for all other routes
    ];

    // Check if the current route matches any of the patterns
    const matchesRoute = routesWithLoader.some((pattern) =>
      pattern.test(location.pathname)
    );

    if (matchesRoute) {
      setLoading(true);

      // Simulate a brief loading duration
      const timeoutId = setTimeout(() => setLoading(false), 300);

      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false);
    }
  }, [location]);

  return loading;
};

export default useNavigationLoader;
