/** @format */

import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  status: false, // true if logged in, false if not
  userData: null, // Object containing user details
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { userData } = action.payload;
      state.status = true;
      state.userData = userData || null;
      console.log(state.status);
    },

    // Logout Action
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },

    // Update User Data
    updateUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

// Export Actions
export const { login, logout, updateUserData } = authSlice.actions;

// Export Reducer
export default authSlice.reducer;
