import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;



export const fetchLocations = createAsyncThunk("locations/fetchLocations", async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.isLoggedIn) {
        console.log("Not logged in");
        return rejectWithValue("Not logged in");
    }
    try {
        const res = await axios.get(`${apiUrl}locations/all`, {
            headers: {
                "sessionid": auth.sessionId,
            },
            withCredentials: true,
        });
        //console.log(res);

        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


export const updateLocation = createAsyncThunk(
    'locations/updateLocation',
    async (locationData, { getState, rejectWithValue }) => {
        const { auth } = getState();
        try {
            const response = await axios.put(
                `${apiUrl}locations/edit/${locationData.id}`,
                locationData,
                {
                    headers: { "sessionid": auth.sessionId },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const addNewLocation = createAsyncThunk(
    'locations/addNewLocation', async (locationData, { getState, rejectWithValue }) => {
        const { auth } = getState();

        try {
            const res = await axios.post(`${apiUrl}locations/create`,
                locationData,
                {
                    headers: {
                        "sessionid": auth.sessionId,
                    },
                    withCredentials: true,
                });
            return res.data; // Assuming the API returns the newly created location
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteLocation = createAsyncThunk(
    'locations/deleteLocation',
    async (locationId, { getState, rejectWithValue }) => {
        const { auth } = getState();

        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}locations/delete/${locationId}`, {
                headers: {
                    "sessionid": auth.sessionId,
                },
                withCredentials: true,
            });
            return locationId; // Return the id to identify which location was deleted
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const locationSlice = createSlice({
    name: 'locations',
    initialState: {
        locations: [],
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.locations = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
            .addCase(addNewLocation.fulfilled, (state, action) => {
                state.locations.push(action.payload);
            })
            // We don't need to handle pending or rejected for addNewLocation if we don't want to change the state
            .addCase(deleteLocation.fulfilled, (state, action) => {
                state.locations = state.locations.filter(location => location.id !== action.payload);
            });
    },
});

export default locationSlice.reducer;