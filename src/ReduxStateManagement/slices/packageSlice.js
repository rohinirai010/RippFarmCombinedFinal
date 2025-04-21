import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  walletBalance: 15000,
  activatedPackages: [],
  packages: {
    igniteFund: {
      name: "Ignite Fund",
      minAmount: 100,
      maxAmount: 999,
      dailyRate: 0.3,
      dailyProfit: 0.3,
      botProfitPeriod: 300,
      depositTakecare: 300,
      totalBotProfit: 90,
      activationAmount: 100,
      odlProfitMax: 20,
      directRippleBounty: 5,
      capping: 2,
      networkBounty: [
        { level: "L1", percent: 5 },
        { level: "L2", percent: 3 },
        { level: "L3", percent: 2 },
        { level: "L4", percent: 1 },
        { level: "L5", percent: 1 }
      ],
      exceedsBalance: false // Add this field to track balance status
    },
    elevatePlus: {
      name: "Elevate Plus",
      minAmount: 1000,
      maxAmount: 9999,
      dailyRate: 0.4,
      dailyProfit: 4,
      botProfitPeriod: 300,
      depositTakecare: 300, 
      totalBotProfit: 120,
      activationAmount: 1000,
      odlProfitMax: 30,
      directRippleBounty: 7,
      capping: 2,
      networkBounty: [
        { level: "L1", percent: 7 },
        { level: "L2", percent: 3 },
        { level: "L3", percent: 2 },
        { level: "L4", percent: 1 },
        { level: "L5", percent: 1 }
      ],
      exceedsBalance: false
    },
    legacyVault: {
      name: "Legacy Vault",
      minAmount: 10000,
      maxAmount: 100000,
      dailyRate: 0.5, 
      dailyProfit: 50,
      botProfitPeriod: 300,
      depositTakecare: 300,
      totalBotProfit: 150,
      activationAmount: 10000,
      odlProfitMax: 50,
      directRippleBounty: 10,
      capping: 3,
      networkBounty: [
        { level: "L1", percent: 10 },
        { level: "L2", percent: 3 },
        { level: "L3", percent: 2 },
        { level: "L4", percent: 1 },
        { level: "L5", percent: 1 },
        { level: "L6", percent: 1 },
        { level: "L7", percent: 0.5 },
        { level: "L8", percent: 0.5 },
        { level: "L9", percent: 0.5 },
        { level: "L10", percent: 0.5 }
      ],
      exceedsBalance: false
    }
  },
  activePackageType: null,
  loading: false,
  error: null,
  // Add notification states
  notification: {
    show: false,
    type: null, // 'success', 'error', 'warning'
    message: '',
  }
};

const packageSlice = createSlice({
  name: 'packageDetail',
  initialState,
  reducers: {
    updateActivationAmount: (state, action) => {
      const { packageType, amount } = action.payload;
      if (state.packages[packageType]) {
        const numericAmount = Number(amount);
        const packageData = state.packages[packageType];
        
        // Update activation amount
        packageData.activationAmount = numericAmount;
        
        // Calculate and update daily profit
        const dailyRate = packageData.dailyRate;
        packageData.dailyProfit = parseFloat((numericAmount * dailyRate / 100).toFixed(2));
        
        // Calculate and update total profit
        const period = packageData.botProfitPeriod;
        packageData.totalBotProfit = parseFloat((dailyRate * period).toFixed(2));
        
        // Check if amount exceeds wallet balance and update status
        packageData.exceedsBalance = numericAmount > state.walletBalance;
      }
    },
    setActivePackageType: (state, action) => {
      state.activePackageType = action.payload;
    },
    activatePackage: (state, action) => {
      const { packageType, amount } = action.payload;
      if (state.packages[packageType]) {
        if (state.walletBalance >= amount) {
          // Deduct from wallet balance
          state.walletBalance -= amount;
          
          // Reset exceedsBalance flag
          state.packages[packageType].exceedsBalance = false;

                    // Add package to activated packages with timestamp
                    state.activatedPackages.push({
                      type: packageType,
                      name: state.packages[packageType].name,
                      amount: amount,
                      activatedAt: new Date().toISOString(),
                      status: 'active'
                    });          
          
          // Show success notification
          state.notification = {
            show: true,
            type: 'success',
            message: `${state.packages[packageType].name} successfully activated with ${amount} USDT!`
          };
        } else {
          // Show error notification
          state.notification = {
            show: true,
            type: 'error',
            message: 'Insufficient balance for activation'
          };
        }
      }
    },
    deactivatePackage: (state, action) => {
      const packageType = action.payload;
      const packageIndex = state.activatedPackages.findIndex(pkg => pkg.type === packageType);
      
      if (packageIndex !== -1) {
        state.activatedPackages[packageIndex].status = 'inactive';
      }
    },
    updateWalletBalance: (state, action) => {
      state.walletBalance = action.payload;
    },
    clearNotification: (state) => {
      state.notification.show = false;
    }
  }
});

export const { 
  updateActivationAmount, 
  setActivePackageType, 
  activatePackage,
  deactivatePackage,
  updateWalletBalance,
  clearNotification
} = packageSlice.actions;

export default packageSlice.reducer;
