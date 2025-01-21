import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"; // Import Tailwind styles
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import store from './app/store';  // Import your store
import ErrorBoundary from './components/ErrorBoundary'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Wrap the entire app with BrowserRouter */}
        <ErrorBoundary> {/* Wrap App with ErrorBoundary */}
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
