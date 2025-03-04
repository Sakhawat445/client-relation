import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice"; // Ensure the path is correct

export const store = configureStore({
  reducer: { auth: authReducer },
});

// Correctly define RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
