import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js"
import locationReducer from "../features/locations/locationSlice.js"
import answerReducer from "../features/answers/answerSlice.js"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        locations: locationReducer,
        answers: answerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',

});