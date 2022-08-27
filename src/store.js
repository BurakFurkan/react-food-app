import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../src/features/productSlice";
import userReducer from "../src/features/userSlice";

export const store = configureStore({
  reducer: {
    product:productReducer,
    user:userReducer

  },
})