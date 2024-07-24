import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createHunt,
  deleteHuntById,
  exitHuntByUserHuntId,
  joinHuntById,
} from "../hunt/huntSlice";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
function saveToLocalStorage(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (err) {
    console.error(`Error saving data to local storage`, err);
  }
}
function loadFromLocalStorage(key) {
  try {
    const jsonValue = localStorage.getItem(key);
    if (!jsonValue) {
      return undefined;
    }
    return JSON.parse(jsonValue);
  } catch (err) {
    console.error(`Error loading data from local storage`, err);
    return undefined;
  }
}
export const checkLogin = createAsyncThunk(
  "auth/checkLogin",
  async (_, { rejectWithValue }) => {
    try {
      const sessionId = loadFromLocalStorage("sessionId");
      if (sessionId) {
        const res = await axios.get(`${apiUrl}auth/checkLoggedIn`, {
          headers: {
            sessionid: sessionId,
          },
          withCredentials: true,
        });
        //console.log(res);
        return res.data;
      } else {
        return rejectWithValue({
          message: "Not logged in",
        });
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiUrl}auth/login`, credentials);
      const { user, sessionId } = res.data;
      const huntState = user.huntState;
      saveToLocalStorage("sessionId", sessionId);
      saveToLocalStorage("userInfo", user);
      saveToLocalStorage("huntState", huntState);
      saveToLocalStorage("currentHuntState", huntState);
      return { user, sessionId, huntState };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}auth/register`, userData);
      if (response.data.status === "success") {
        localStorage.setItem("emailForVerification", userData.email); // Store email for verification page
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (err) {
      return rejectWithValue(
        err.response.status === 409
          ? "redirect"
          : err.response.data.message
          ? err.response.data.message
          : err.response.data.error.undefined
      );
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      axios.get(`${apiUrl}auth/logout`, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email, verificationCode }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}auth/verifyEmail`, {
        email,
        verificationCode,
      });
      if (response.data.status === "success") {
        localStorage.removeItem("emailForVerification"); // Clean up after verification
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response.data.message ||
          "An error occurred during email verification."
      );
    }
  }
);

export const startHunt = createAsyncThunk(
  "users/startHunt",
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`${apiUrl}users/startHunt`, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
      const { currentHuntState } = getState().auth;
      saveToLocalStorage("currentHuntState", {
        hasEndedHunt: false,
        hasStartedHunt: true,
        ...currentHuntState,
      });
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const endHunt = createAsyncThunk(
  "users/endhunt",
  async (_, { getState, rejectWithValue }) => {
    try {
      await axios.get(`${apiUrl}users/endhunt`, {
        headers: {
          sessionid: getState().auth.sessionId,
        },
        withCredentials: true,
      });
      saveToLocalStorage("huntState", {
        hasEndedHunt: true,
        hasStartedHunt: true,
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateUserAttributes = createAsyncThunk(
  "auth/updateUserAttributes",
  async (attributes, { getState, rejectWithValue }) => {
    const { sessionId, user } = getState().auth;
    try {
      const res = await axios.put(
        `${apiUrl}users/editAccount/${user._id}`,
        attributes,
        {
          headers: {
            sessionid: sessionId,
          },
          withCredentials: true,
        }
      );
      return {
        user: res.data.data,
        status: res.data.status,
        message: res.data.message,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  isLoggedIn: !!loadFromLocalStorage("sessionId"), //!! -> gets a boolean value from local storage
  sessionId: loadFromLocalStorage("sessionId"),
  huntState: loadFromLocalStorage("huntState") || [],
  currentHuntState: loadFromLocalStorage("currentHuntState") || [],
  user: loadFromLocalStorage("userInfo"),
  status: "idle", // "idle" , "loading" , "succeeded" , "failed",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuthState(state) {
      const sessionId = sessionStorage.getItem("sessionId");
      const userInfo = sessionStorage.getItem("userInfo");
      if (sessionId && userInfo) {
        state.isLoggedIn = true;
        state.sessionId = sessionId;
        state.user = userInfo;
        state.currentHuntState = state.huntState.find(
          (hunt) => hunt.huntId === state.user.currentHuntId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.sessionId = action.payload.sessionId;
        state.huntState = action.payload.user.huntState;
        state.currentHuntState = action.payload.user.huntState.find(
          (hunt) => hunt.huntId === action.payload.user.currentHuntId
        );
        state.status = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.sessionId = null;
        state.status = "failed";
        state.error = action.payload || "Failed to login";
      })
      .addCase(checkLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.data;
        state.huntState = action.payload.data.huntState;
        state.currentHuntState = action.payload.data.huntState.find(
          (hunt) => hunt.huntId === action.payload.data.currentHuntId
        );
        state.status = "success";
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.sessionId = null;
        state.status = "failed";
        state.error = action.payload || "Session invalid/expired";
      })
      .addCase(startHunt.fulfilled, (state, action) => {
        state.currentHuntState.hasStartedHunt = true;
        const index = state.huntState.findIndex(
          (hunt) => hunt.huntId === state.currentHuntState.huntId
        );
        state.huntState[index] = state.currentHuntState;
        state.status = "success";
      })
      .addCase(endHunt.fulfilled, (state, action) => {
        state.currentHuntState.hasEndedHunt = true;
        const index = state.huntState.findIndex(
          (hunt) => hunt.huntId === state.currentHuntState.huntId
        );
        state.huntState[index] = state.currentHuntState;
        state.status = "success";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.sessionId = null;
        state.status = "idle";
        state.error = null;
        localStorage.removeItem("sessionId");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("huntState");
        localStorage.removeItem("currentHuntState");
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to register";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(verifyEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(joinHuntById.fulfilled, (state, action) => {
        if (state.user) {
          state.user.currentHuntId = action.payload.huntId;
          state.huntState = state.user.huntState;
          state.currentHuntState = state.huntState.find(
            (hunt) => hunt.huntId === state.user.currentHuntId
          );
          ///Update huntState if it doesn't exist
          if (
            !state.user.huntState.find(
              (huntState) => huntState.huntId === action.payload.huntId
            )
          ) {
            state.user.huntState.push({
              huntId: action.payload.huntId,
              hasEndedHunt: false,
              hasStartedHunt: false,
            });
            state.huntState = state.user.huntState;
            state.currentHuntState = state.huntState.find(
              (hunt) => hunt.huntId === state.user.currentHuntId
            );
          }
          state.currentHuntState = state.huntState.find(
            (hunt) => hunt.huntId === action.payload.huntId
          );
        }
        saveToLocalStorage("userInfo", state.user);
      })
      .addCase(createHunt.fulfilled, (state, action) => {
        if (state.user) {
          state.user.createdHuntIds.push(action.payload.hunt._id);
        }
        saveToLocalStorage("userInfo", state.user);
      })
      .addCase(deleteHuntById.fulfilled, (state, action) => {
        const deletedHuntId = action.payload.huntId;

        if (state.user) {
          state.user.createdHuntIds = state.user.createdHuntIds.filter(
            (id) => id !== deletedHuntId
          );
          if (state.user.currentHuntId === deletedHuntId) {
            state.user.currentHuntId = null;
            state.currentHuntState = [];
          }
          state.user.huntState = state.user.huntState.filter(
            (hunt) => hunt.huntId !== deletedHuntId
          );
          saveToLocalStorage("userInfo", state.user);
        }
        state.status = "idle";
      })
      .addCase(exitHuntByUserHuntId.fulfilled, (state, action) => {
        if (state.user) {
          state.user.currentHuntId = null;
          state.currentHuntState = null;
          saveToLocalStorage("userInfo", state.user);
        }
        state.status = "idle";
      })
      .addCase(updateUserAttributes.fulfilled, (state, action) => {
        const { user } = action.payload;
        console.log("newUser", user);
        state.user = user;
        saveToLocalStorage("userInfo", user);
        state.status = "succeeded";
      });
  },
});
export const { initializeAuthState } = authSlice.actions;
export default authSlice.reducer;
