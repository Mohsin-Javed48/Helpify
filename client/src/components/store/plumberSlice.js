/** @format */
/** @format */

import { createSlice } from "@reduxjs/toolkit";
import mixerTapInstallation from "/mixerTapInstallation.jpg";
import drainCleaning from "/drainCleaning.jpg";
import pipeLeakRepair from "/pipeLeakRepair.jpg";
import waterHeaterInstallation from "/waterHeaterInstallation.jpg";
import toiletInstallation from "/toiletInstallation.jpg";
import showerHeadReplacement from "/showerHeadReplacement.jpg";
import geyserMaintenance from "/geyserMaintenance.jpg";
const initialState = {
  services: [
    {
      id: 1,
      title: "Mixer Tap Installation",
      image: mixerTapInstallation,
      subtitle: "--Per piece",
      price: 300,
      quantity: 1,
    },
    {
      id: 2,
      title: "Drain Cleaning",
      image: drainCleaning,
      subtitle: "--Per hour",
      price: 500,
      quantity: 1,
    },
    {
      id: 3,
      title: "Pipe Leak Repair",
      image: pipeLeakRepair, // Replace with actual image variable or path
      subtitle: "--Per service",
      price: 400,
      quantity: 1,
    },
    {
      id: 4,
      title: "Water Heater Installation",
      image: waterHeaterInstallation, // Replace with actual image variable or path
      subtitle: "--Per unit",
      price: 2000,
      quantity: 1,
    },
    {
      id: 5,
      title: "Toilet Installation",
      image: toiletInstallation, // Replace with actual image variable or path
      subtitle: "--Per unit",
      price: 1500,
      quantity: 1,
    },
    {
      id: 6,
      title: "Shower Head Replacement",
      image: showerHeadReplacement, // Replace with actual image variable or path
      subtitle: "--Per service",
      price: 250,
      quantity: 1,
    },

    {
      id: 7,
      title: "Geyser Maintenance",
      image: geyserMaintenance, // Replace with actual image variable or path
      subtitle: "--Per hour",
      price: 600,
      quantity: 1,
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
