import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import locationReducer from "../features/locations/locationSlice.js";
import answerReducer from "../features/answers/answerSlice.js";
import huntReducer from "../features/hunt/huntSlice.js";
import alertReducer from "../features/alert/alertSlice";
import alertMiddleware from "../middleware/alertMiddleware";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    locations: locationReducer,
    answers: answerReducer,
    hunt: huntReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(alertMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
