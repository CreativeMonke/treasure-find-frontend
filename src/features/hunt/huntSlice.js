import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

/// get Global start time from api

export const getGlobalHuntInfo = createAsyncThunk(
  "/hunt/getGlobalHuntInfo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}hunt/globalInfo`);
      const {
        startTime,
        endTime,
        answersReady,
        nrOfObjectives,
        nrOfSignedUpUsers,
      } = res.data;
      return {
        startTime,
        endTime,
        answersReady,
        nrOfObjectives,
        nrOfSignedUpUsers,
      };
    } catch (err) {
      console.error("Error while loading global info:", err);
      return rejectWithValue(err);
    }
  }
);
export const editGlobalHuntInfo = createAsyncThunk(
  "/hunt/editGlobalHuntInfo",
  async (options, { getState, rejectWithValue }) => {
    try {
      const res = await axios.put(`${apiUrl}hunt/edit`, options, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getAllHunts = createAsyncThunk(
  "/hunt/getAllHunts",
  async (options, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}hunt/getAllHunts`, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
/// joinHuntById(huntid)
export const joinHuntById = createAsyncThunk(
  "/hunt/joinHuntById",
  async (huntId, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}hunt/${huntId}/join`, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
      return {huntId, ...res.data};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  globalHuntInfo: {
    startTime: null,
    endTime: null,
    answersReady: false,
    nrOfObjectives: null,
    nrOfSignedUpUsers: null,
  },
  hunts: [],
  hasStarted: false,
  hasEnded: false,
  timeRemaining: null,
  status: "idle", // "idle" , "loading" , "succeeded" , "failed",
  error: null,
};
const huntSlice = createSlice({
  name: "hunt",
  initialState,
  reducers: {
    ///ToggleHasEnded
    toggleHasEnded: (state) => {
      state.hasEnded = !state.hasEnded;
    },
    ///ToggleHasStarted
    toggleHasStarted: (state) => {
      state.hasStarted = !state.hasStarted;
    },
    setHasStarted: (state) => {
      state.hasStarted = true;
    },
    setHasEnded: (state) => {
      state.hasEnded = true;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getGlobalHuntInfo.pending, (state) => {
        state.status = "loading";
    })
    .addCase(getGlobalHuntInfo.fulfilled, (state, action) => {
        state.globalHuntInfo = action.payload;
        state.status = "succeeded";
        const now = Date.now();
        const startTime = new Date(action.payload.startTime).getTime();
        const endTime = new Date(action.payload.endTime).getTime();
        state.hasStarted = now >= startTime;
        state.hasEnded = now >= endTime;
    })
    .addCase(getGlobalHuntInfo.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
    })
    .addCase(editGlobalHuntInfo.fulfilled, (state, action) => {
        state.globalHuntInfo = { ...state.globalHuntInfo, ...action.payload };
        state.status = 'succeeded';
    })
    .addCase(getAllHunts.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(getAllHunts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.hunts = action.payload;
    })
    .addCase(getAllHunts.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
    }) 
   
  },
});
export const {
  initialHuntState,
  toggleHasEnded,
  toggleHasStarted,
  setHasStarted,
  setHasEnded,
} = huntSlice.actions;
export default huntSlice.reducer;
