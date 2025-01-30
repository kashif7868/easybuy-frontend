import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import Tailwind styles
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import store from "./app/store";  // Import your store
import ErrorBoundary from "./components/ErrorBoundary"; 
import { SnackbarProvider } from 'notistack'; // Import SnackbarProvider

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* BrowserRouter should be here only */}
        <SnackbarProvider 
          maxSnack={3} 
          anchorOrigin={{
            vertical: 'top',  // Set to 'top' to position the snackbar at the top
            horizontal: 'center',  // Set to 'center' for horizontal centering
          }}
        >
          <ErrorBoundary> {/* Wrap App with ErrorBoundary */}
            <App />
          </ErrorBoundary>
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
