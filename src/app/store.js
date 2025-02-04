import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartSlice";
import favoritesReducer from "./reducer/favoritesSlice";
import orderReducer from "./reducer/orderSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    order: orderReducer,
  },
});

export default store;
