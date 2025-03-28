import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './ordersSlice';
import geyserReducer from './geyserSlice';
import gardnerReducer from './gardnerSlice';
import painterReducer from './painterSlice';
import plumberReducer from './plumberSlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    geyser: geyserReducer,
    gardner: gardnerReducer,
    painter: painterReducer,
    plumber: plumberReducer,
  },
});

export default store;
