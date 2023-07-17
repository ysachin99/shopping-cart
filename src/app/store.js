import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productFetch } from "../features/productsSlice";
import { productsApi } from "../features/productsApi";
import cartReducer, { getTotals } from '../features/cartSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return  getDefaultMiddleware().concat(productsApi.middleware);
    }
})

store.dispatch(productFetch());
store.dispatch(getTotals());