import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import locationReducer from "../features/locations/locationSlice.js";
import answerReducer from "../features/answers/answerSlice.js";
import huntReducer from "../features/hunt/huntSlice.js"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        locations: locationReducer,
        answers: answerReducer,
        hunt:huntReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',

});