/** @format */
/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [
    {
      id: 1,
      title: "Mixer Tap Installation",
      subtitle: "--Per piece",
      price: 300,
      quantity: 0, // To track items in the cart
    },
    {
      id: 2,
      title: "Drain Cleaning",
      subtitle: "--Per hour",
      price: 500,
      quantity: 0,
    },
  ],
};

const plumberSlice = createSlice({
  name: "plumber",
  initialState,
  reducers: {
    addService(state, action) {
      const service = state.services.find(
        (item) => item.id === action.payload.id
      );
      if (service) service.quantity += 1; // Increase quantity
    },
    removeService(state, action) {
      const service = state.services.find(
        (item) => item.id === action.payload.id
      );
      if (service && service.quantity > 0) service.quantity -= 1; // Decrease quantity
    },
  },
});

export const { addService, removeService } = plumberSlice.actions;
export default plumberSlice.reducer;
