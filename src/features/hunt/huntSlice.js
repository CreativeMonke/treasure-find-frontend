import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllLocationsByUserHuntId } from "../locations/locationSlice";
import { useDispatch } from "react-redux";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
export const editHuntOptionsById = createAsyncThunk(
  "/hunt/edit",
  async (updatedHunt, { getState, rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${apiUrl}hunt/${updatedHunt._id}/edit`,
        updatedHunt,
        {
          headers: {
            sessionid: getState().auth.sessionId,
          },
          withCredentials: true,
        }
      );
      return {
        hunt: res.data.data,
        status: res.data.status,
        message: res.data.message,
      };
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
      return {
        hunts: res.data.data,
        status: res.data.status,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCurrentHunt = createAsyncThunk(
  "/hunt/getCurrentHunt",
  async (options, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}hunt/getCurrentHunt`, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
      return {
        hunt: res.data.data,
        status: res.data.status,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const joinHuntById = createAsyncThunk(
  "/hunt/joinHuntById",
  async (huntId, { getState, dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}hunt/${huntId}/join`, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
      dispatch(getAllLocationsByUserHuntId());
      return {
        huntId,
        hunt: res.data.data,
        status: res.data.status,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const exitHuntByUserHuntId = createAsyncThunk(
  "/hunt/exitHuntByUserHuntId",
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}hunt/exitCurrentHunt`, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
      return {
        status: res.data.status,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createHunt = createAsyncThunk(
  "/hunt/createHunt",
  async (updatedHunt, { getState, rejectWithValue }) => {
    console.log(updatedHunt);
    try {
      const res = await axios.post(`${apiUrl}hunt/createHunt`, updatedHunt, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
      return {
        hunt: res.data.data,
        status: res.data.status,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteHuntById = createAsyncThunk(
  "/hunt/deleteHuntById",
  async (huntId, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}hunt/${huntId}/delete`, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
      return {
        huntId,
        status: res.data.status,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  currentHuntInfo: {
    completeHuntData: null,
    startTime: null,
    endTime: null,
    areAnswersReady: false,
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
      .addCase(joinHuntById.fulfilled, (state, action) => {
        const huntData = action.payload.hunt;
        state.currentHuntInfo = {
          completeHuntData: huntData,
          startTime: huntData.startTime,
          endTime: huntData.endTime,
          areAnswersReady: huntData.areAnswersReady,
          nrOfObjectives: huntData.nrOfObjectives,
          nrOfSignedUpUsers: huntData.nrOfSignedUpUsers,
        };
        state.status = action.payload.status;
        const now = Date.now();
        const startTime = new Date(huntData.startTime).getTime();
        const endTime = new Date(huntData.endTime).getTime();
        state.hasStarted = now >= startTime;
        state.hasEnded = now >= endTime;
      })
      .addCase(getCurrentHunt.fulfilled, (state, action) => {
        const huntData = action.payload.hunt;
        state.currentHuntInfo = {
          completeHuntData: huntData,
          startTime: huntData.startTime,
          endTime: huntData.endTime,
          areAnswersReady: huntData.areAnswersReady,
          nrOfObjectives: huntData.nrOfObjectives,
          nrOfSignedUpUsers: huntData.nrOfSignedUpUsers,
        };
        state.status = action.payload.status;
        const now = Date.now();
        const startTime = new Date(huntData.startTime).getTime();
        const endTime = new Date(huntData.endTime).getTime();
        state.hasStarted = now >= startTime;
        state.hasEnded = now >= endTime;
      })
      .addCase(editHuntOptionsById.fulfilled, (state, action) => {
        const updatedHunt = action.payload.hunt;
        const index = state.hunts.findIndex(
          (hunt) => hunt._id === updatedHunt._id
        );
        if (index !== -1) {
          state.hunts[index] = updatedHunt;
          if (updatedHunt._id === state.currentHuntInfo.completeHuntData._id)
            state.currentHuntInfo = {
              completeHuntData: updatedHunt,
              startTime: updatedHunt.startTime,
              endTime: updatedHunt.endTime,
              areAnswersReady: updatedHunt.areAnswersReady,
              nrOfObjectives: updatedHunt.nrOfObjectives,
              nrOfSignedUpUsers: updatedHunt.nrOfSignedUpUsers,
            };
        }

        state.status = action.payload.status;
      })
      .addCase(getAllHunts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllHunts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = action.payload.status;
        state.hunts = action.payload.hunts;
      })
      .addCase(getAllHunts.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = action.payload.status;
      })
      .addCase(createHunt.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.hunts.push(action.payload.hunt);
      })
      .addCase(deleteHuntById.fulfilled, (state, action) => {
        state.status = action.payload.status;
        const index = state.hunts.findIndex(
          (hunt) => hunt._id === action.payload.huntId
        );
        if (
          action.payload.huntId ===
          state.currentHuntInfo?.completeHuntData.huntId
        ) {
          state.currentHuntInfo = [];
        }
        if (index !== -1) {
          state.hunts.splice(index, 1);
        }
      })
      .addCase(exitHuntByUserHuntId.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.hasStarted = false;
        state.hasEnded = false;
        state.currentHuntInfo = {
          completeHuntData: [],
          startTime: null,
          endTime: null,
          areAnswersReady: false,
          nrOfObjectives: null,
          nrOfSignedUpUsers: null,
        };
      });
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
