import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

// Async thunk for fetching preview data
export const getPreviewData = createAsyncThunk(
  "general/getPreviewData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}general/getPreviewData`);
      return {
        nrOfLocations: res.data.data.nrOfLocations,
        nrOfHunts: res.data.data.nrOfHunts,
        nrOfSignedUpUsers: res.data.data.nrOfSignedUpUsers,
      };
    } catch (error) {
      console.error("Error while fetching preview data:", error);
      return rejectWithValue(error);
    }
  }
);

export const sendVerificationEmail = createAsyncThunk(
  "/general/sendVerificationEmail",
  async ({ email, change, type }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}general/sendVerificationEmail`, {
        email: email,
        change: change,
        type: type,
      });
      return {
        status: res.data.status,
        tempChange: res.data.data,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "/general/changePassword",
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${apiUrl}general/changePassword`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            sessionid: getState().auth.sessionId,
          },
          withCredentials: true,
        }
      );
      return {
        status: res.data.status,
        user: res.data.data,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/general/resetPassword",
  async ({ email, newPassword }, { getState, rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}general/resetPassword`, {
        email,
        newPassword,
      });
      return {
        status: res.data.status,
        user: res.data.data,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "/general/verifyCode",
  async ({ verificationCode, change, type }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}general/verifyCode`, {
        verificationCode: verificationCode,
        change: change,
        type: type,
      });
      console.log("res", res.data);
      return {
        status: res.data.status,
        tempChange: res.data.data,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  previewData: {
    nrOfLocations: 0,
    nrOfHunts: 0,
    nrOfSignedUpUsers: 0,
  },
  loading: false,
  error: null,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPreviewData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPreviewData.fulfilled, (state, action) => {
        state.loading = false;
        const { nrOfLocations, nrOfHunts, nrOfSignedUpUsers } = action.payload;
        state.previewData = {
          nrOfLocations: nrOfLocations || 0,
          nrOfHunts: nrOfHunts || 0,
          nrOfSignedUpUsers: nrOfSignedUpUsers | 0,
        };
      })
      .addCase(getPreviewData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch preview data";
      });
  },
});

export default generalSlice.reducer;
