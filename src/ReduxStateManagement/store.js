import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import packageReducer from './slices/packageSlice';
import timerReducer from './slices/timerSlice';
import adminAuthReducer from "./adminSlices/authSlice"
import addReducer from "./slices/addressSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    packageDetail: packageReducer,
    timer: timerReducer,
    addresses: addReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;