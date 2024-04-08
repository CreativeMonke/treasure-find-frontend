import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

/// get Global start time from api

export const fetchGlobalHuntInfo = createAsyncThunk("/hunt/globalStartTime", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${apiUrl}hunt/globalInfo`);
        const { startTime, endTime, nrOfObjectives, nrOfSignedUpUsers } = res.data;
        return { startTime, endTime, nrOfObjectives, nrOfSignedUpUsers };
    } catch (err) {
        console.error("Error while loading global info:", err);
        rejectWithValue(err);
    }
});

const initialState = {
    globalHuntInfo: {
        startTime: null,
        endTime: null,
        nrOfObjectives: null,
        nrOfSignedUpUsers: null
    },
    timeRemaining: null,
    status: "idle", // "idle" , "loading" , "succeeded" , "failed",
    error: null,
}
const huntSlice = createSlice({
    name: "hunt",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGlobalHuntInfo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGlobalHuntInfo.fulfilled, (state, action) => {
                state.globalHuntInfo = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchGlobalHuntInfo.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = "failed";
            })
    }
})
export const { initialHuntState } = huntSlice.actions;
export default huntSlice.reducer;