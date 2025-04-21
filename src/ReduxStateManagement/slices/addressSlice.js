import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: {
    usdt: { address: '', isVerified: false, addedAt: null, changeCount: 0 },
    xrp: { address: '', isVerified: false, addedAt: null, changeCount: 0 }
  }
};

// Load addresses from localStorage if available
const savedAddresses = typeof localStorage !== 'undefined' ? 
  JSON.parse(localStorage.getItem('withdrawalAddresses') || '{}') : {};

if (Object.keys(savedAddresses).length > 0) {
  initialState.addresses = savedAddresses;
}

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      const { type, address } = action.payload;
      
      state.addresses[type] = {
        address,
        isVerified: false,
        addedAt: new Date().toISOString(),
        changeCount: (state.addresses[type]?.changeCount || 0) + 1
      };
      
      // Persist to localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('withdrawalAddresses', JSON.stringify(state.addresses));
      }
    },
    verifyAddress: (state, action) => {
      const { type } = action.payload;
      
      if (state.addresses[type]) {
        state.addresses[type].isVerified = true;
        
        // Persist to localStorage
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('withdrawalAddresses', JSON.stringify(state.addresses));
        }
      }
    },
    // For initial loaded from localStorage 
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    }
  }
});

export const { addAddress, verifyAddress, setAddresses } = addressSlice.actions;
export default addressSlice.reducer;