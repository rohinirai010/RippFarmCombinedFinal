import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper to calculate end time (72 hours from now)
const calculateEndTime = () => {
  const now = new Date();
  return now.getTime() + (72 * 60 * 60 * 1000); // 72 hours in milliseconds
};

// Helper to calculate remaining time from end time
const calculateTimeLeft = (endTime) => {
  const now = new Date().getTime();
  const difference = endTime - now;
  
  if (difference <= 0) {
    // Timer has expired
    return { hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  
  // Calculate hours, minutes and seconds
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  return {
    hours,
    minutes,
    seconds,
    expired: false
  };
};

// Async thunk to initialize timer from localStorage or create new
export const initializeTimer = createAsyncThunk(
  'timer/initialize',
  async (_, { dispatch }) => {
    try {
      // Attempt to retrieve from localStorage
      const storedTimer = localStorage.getItem('odlTimer');
      
      if (storedTimer) {
        const parsedTimer = JSON.parse(storedTimer);
        const now = new Date().getTime();
        
        // Check if stored timer is still valid
        if (parsedTimer.endTime > now) {
          // Calculate remaining time and return
          const timeLeft = calculateTimeLeft(parsedTimer.endTime);
          return {
            endTime: parsedTimer.endTime,
            timeLeft,
            claimed: parsedTimer.claimed || false
          };
        }
      }
      
      // If no valid timer in storage, create a new one
      const endTime = calculateEndTime();
      const timeLeft = calculateTimeLeft(endTime);
      const newTimer = {
        endTime,
        timeLeft,
        claimed: false
      };
      
      // Store in localStorage
      localStorage.setItem('odlTimer', JSON.stringify(newTimer));
      
      return newTimer;
    } catch (error) {
      console.error('Failed to initialize timer:', error);
      // Default fallback in case of errors
      const endTime = calculateEndTime();
      return {
        endTime,
        timeLeft: calculateTimeLeft(endTime),
        claimed: false
      };
    }
  }
);

// Async thunk to update timer
export const updateTimer = createAsyncThunk(
  'timer/update',
  async (_, { getState }) => {
    const { timer } = getState();
    const timeLeft = calculateTimeLeft(timer.endTime);
    
    // If timer expired, create a new one
    if (timeLeft.expired) {
      const endTime = calculateEndTime();
      const newTimer = {
        endTime,
        timeLeft: calculateTimeLeft(endTime),
        claimed: false
      };
      
      // Update localStorage
      localStorage.setItem('odlTimer', JSON.stringify(newTimer));
      return newTimer;
    }
    
    // Update localStorage with current state
    localStorage.setItem('odlTimer', JSON.stringify({
      endTime: timer.endTime,
      claimed: timer.claimed
    }));
    
    return {
      endTime: timer.endTime,
      timeLeft,
      claimed: timer.claimed
    };
  }
);

// Thunk to mark rewards as claimed
export const claimRewards = createAsyncThunk(
  'timer/claim',
  async (_, { getState }) => {
    const { timer } = getState();
    
    const updatedTimer = {
      endTime: timer.endTime,
      claimed: true
    };
    
    // Update localStorage
    localStorage.setItem('odlTimer', JSON.stringify(updatedTimer));
    
    return updatedTimer;
  }
);

const initialState = {
  endTime: null,
  timeLeft: {
    hours: 72,
    minutes: 0,
    seconds: 0,
    expired: false
  },
  claimed: false,
  loading: true,
  pulseEffect: false
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setPulseEffect: (state, action) => {
      state.pulseEffect = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Initialize timer
      .addCase(initializeTimer.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeTimer.fulfilled, (state, action) => {
        state.endTime = action.payload.endTime;
        state.timeLeft = action.payload.timeLeft;
        state.claimed = action.payload.claimed;
        state.loading = false;
      })
      
      // Update timer
      .addCase(updateTimer.fulfilled, (state, action) => {
        state.timeLeft = action.payload.timeLeft;
        // If timer expired, reset claimed status
        if (action.payload.timeLeft.expired) {
          state.endTime = action.payload.endTime;
          state.claimed = false;
        }
      })
      
      // Claim rewards
      .addCase(claimRewards.fulfilled, (state, action) => {
        state.claimed = action.payload.claimed;
      });
  }
});

export const { setPulseEffect } = timerSlice.actions;
export default timerSlice.reducer;