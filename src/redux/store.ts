import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"; // Ensure the path is correct
import productReducer from './slice/productSlice';
import customerReducer from "./slice/customerSlice"; // Import your customer slice reducer

import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

// Define RootState based on the store's state
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
     auth: authReducer,
     product: productReducer, // Add the product slice reducer
customer: customerReducer,
   },
});
// Correctly define RootState and AppDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
