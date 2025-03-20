/** @format */

import { configureStore } from '@reduxjs/toolkit';
// import plumberReducer from './plumberSlice'; // Import your slice reducer
import authReducer from './authSlice'; // Another example slice reducer
import acRepairReducer from './acRepairSlice';
import carpenterReducer from './carpenterSlice';
import handymanReducer from './handymanSlice';
import gardnerReducer from './gardnerSlice';
import homeAppliencesReducer from './homeAppliencesSlice';
import painterReducer from './painterSlice';
import geyserReducer from './geyserSlice';
import electricianReducer from './electricianSlice';
import ordersReducer from './ordersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    acRepair: acRepairReducer,
    carpenter: carpenterReducer,
    handyman: handymanReducer,
    gardner: gardnerReducer,
    homeAppliences: homeAppliencesReducer,
    painter: painterReducer,
    geyser: geyserReducer,
    electrician: electricianReducer,
    orders: ordersReducer,
  },
});

export default store;
