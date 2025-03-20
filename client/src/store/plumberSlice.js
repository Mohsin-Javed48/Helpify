// // import mixerTapInstallation from '/mixerTapInstallation.jpg';
// // import drainCleaning from '/drainCleaning.jpg';
// // import pipeLeakRepair from '/pipeLeakRepair.jpg';
// // import waterHeaterInstallation from '/waterHeaterInstallation.jpg';
// // import toiletInstallation from '/toiletInstallation.jpg';
// // import showerHeadReplacement from '/showerHeadReplacement.jpg';
// // import geyserMaintenance from '/geyserMaintenance.jpg';
// import axios from 'axios';
// import { BASE_URL } from '../constants';
// /** @format */

// import { createSlice } from '@reduxjs/toolkit';

// const fetchServices = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/service/`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching services:', error);
//     throw error;
//   }
// };
// let initialState; // Define initialState outside the function

// const initializeServices = async () => {
//   const services = await fetchServices();
//   console.log(services); // Log fetched services to check structure

//   // Ensure services.services exists before accessing it
//   if (services && services.services) {
//     initialState = {
//       services: Object.values(services.services), // Convert to array if needed
//     };
//   } else {
//     initialState = {
//       services: [], // Fallback in case services.services is undefined
//     };
//   }

//   // Log after the async operation completes
//   console.log(initialState); // Now it will show the populated state
// };

// initializeServices();

// const plumberSlice = createSlice({
//   name: 'plumber',
//   initialState,
//   reducers: {
//     addService(state, action) {
//       const service = state.services.find(
//         (item) => item.id === action.payload.id
//       );
//       if (service) {
//         service.quantity += 1; // Increase quantity
//       }
//     },
//     removeService(state, action) {
//       const service = state.services.find(
//         (item) => item.id === action.payload.id
//       );
//       if (service && service.quantity > 0) {
//         service.quantity -= 1; // Decrease quantity
//       }
//     },
//   },
// });

// export const { addService, removeService } = plumberSlice.actions;
// export default plumberSlice.reducer;
