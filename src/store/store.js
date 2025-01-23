/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import plumberReducer from "../store/plumberSlice";

const store = configureStore({
  plumber: plumberReducer,
  reducer: authSlice,
});

export default store;
