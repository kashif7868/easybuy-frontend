import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartSlice";
import favoritesReducer from "./reducer/favoritesSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export default store;
