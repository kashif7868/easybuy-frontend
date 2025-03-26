import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducer/cartSlice';
import sliderReducer from './reducer/sliderSlice';
import bannerReducer from './reducer/bannerSlice';
import categoryReducer from './reducer/categorySlice'; 
import productReducer from './reducer/productSlice';
import favoritesReducer from './reducer/favoritesSlice';
import orderReducer from './reducer/orderSlice';
import contactReducer from './reducer/contactSlice';

const store = configureStore({
  reducer: {
    slider: sliderReducer,
    banner: bannerReducer,
    category: categoryReducer, 
    product: productReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    order: orderReducer,
    contacts: contactReducer,
  },
});

export default store;
