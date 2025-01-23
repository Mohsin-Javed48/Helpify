/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersList: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder(state, action) {
      const newOrder = action.payload;

      // Find if the order already exists in the ordersList
      const existingOrder = state.ordersList.find(
        (order) => order.id === newOrder.id
      );

      if (existingOrder) {
        // If it exists, update the quantity directly
        existingOrder.quantity = existingOrder.quantity + 1; // Add newOrder.quantity or default to 1
      } else {
        // If it doesn't exist, add the new order
        state.ordersList.push({
          ...newOrder,
          quantity: newOrder.quantity, // Default quantity to 1 if not provided
        });
      }
    },
    removeOrder(state, action) {
      const orderId = action.payload;
      state.ordersList = state.ordersList.filter(
        (order) => order.id !== orderId
      );
    },
  },
});
// Export actions
export const { addOrder, removeOrder } = ordersSlice.actions;

// Export reducer
export default ordersSlice.reducer;
