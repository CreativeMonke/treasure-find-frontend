import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alerts.push({
        id: Date.now(),
        message: action.payload.message,
        severity: action.payload.severity,
        actionName: action.payload.actionName,
      });

      // Keep only the most recent 3 alerts
      if (state.alerts.length > 10) {
        state.alerts.shift();
      }
    },
    clearAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
