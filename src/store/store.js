/** @format */

import { configureStore } from "@reduxjs/toolkit";
import plumberReducer from "./plumberSlice"; // Import your slice reducer
import authReducer from "./authSlice"; // Another example slice reducer

const store = configureStore({
  reducer: {
    plumber: plumberReducer, // Add your slices here
    auth: authReducer, // Add other slices as needed
  },
});

export default store;
