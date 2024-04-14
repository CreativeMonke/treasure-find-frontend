import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
export const checkLogin = createAsyncThunk("auth/checkLogin", async (_, { rejectWithValue }) => {
    try {
        const sessionId = loadFromLocalStorage("sessionId")
        if (sessionId) {
            const res = await axios.get(`${apiUrl}auth/checkLoggedIn`, {
                headers: {
                    "sessionid": sessionId,
                },
                withCredentials: true,
            });
            //console.log(res);
            return res.data;
        }
        else {
            return rejectWithValue("Not logged in");
        }
    } catch (err) {
        return rejectWithValue(err);
    }
});
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${apiUrl}auth/login`, credentials);
        const { user, sessionId } = res.data;
        const huntState = user[0].huntState;
        saveToLocalStorage("sessionId", sessionId);
        saveToLocalStorage("userInfo", user);
        saveToLocalStorage("huntState", huntState);
        return { user, sessionId, huntState };
    }
    catch (err) {
        return rejectWithValue(err);
    }
});
export const logout = createAsyncThunk("auth/logout", async (_, { getState, rejectWithValue }) => {
    try {
        axios.get(`${apiUrl}auth/logout`, {
            headers: {
                "sessionid": getState().auth.sessionId,
            },
            withCredentials: true,
        })

    } catch (err) {
        return rejectWithValue(err);
    }
});

export const startHunt = createAsyncThunk("users/startHunt", async (_, { getState, rejectWithValue }) => {
    try {
        await axios.get(`${apiUrl}users/startHunt`, {
            headers: {
                "sessionid": getState().auth.sessionId,
            },
            withCredentials: true,
        })
        saveToLocalStorage("huntState", {
            "hasEndedHunt": false,
            "hasStartedHunt": true,
        });
    } catch (err) {
        return rejectWithValue(err);
    }
});
export const endHunt = createAsyncThunk("users/endhunt", async (_, { getState, rejectWithValue }) => {
    try {
        await axios.get(`${apiUrl}users/endhunt`, {
            headers: {
                "sessionid": getState().auth.sessionId,
            },
            withCredentials: true,
        })
        saveToLocalStorage("huntState", {
            "hasEndedHunt": true,
            "hasStartedHunt": true,
        });
    } catch (err) {
        return rejectWithValue(err);
    }
});
const initialState = {
    isLoggedIn: !!loadFromLocalStorage("sessionId"), //!! -> gets a boolean value from local storage
    sessionId: loadFromLocalStorage("sessionId"),
    huntState: loadFromLocalStorage("huntState"),
    user: loadFromLocalStorage("userInfo"),
    status: "idle", // "idle" , "loading" , "succeeded" , "failed",
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /*
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            state.sessionId = null;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('sessionId');
            localStorage.removeItem('userInfo');
        },
        */
        initializeAuthState(state) {
            const sessionId = sessionStorage.getItem('sessionId');
            const userInfo = sessionStorage.getItem('userInfo');
            if (sessionId && userInfo) {
                state.isLoggedIn = true;
                state.sessionId = sessionId;
                state.user = userInfo;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.sessionId = action.payload.sessionId;
                state.huntState = action.payload.user[0].huntState;
                state.status = 'succeeded';
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.sessionId = null;
                state.status = 'failed';
                state.error = action.payload || "Failed to login";
            }).addCase(checkLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkLogin.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = loadFromLocalStorage("userInfo");
                //state.user = action.payload.user; // Make sure your backend returns user info
                //state.sessionId = action.payload.sessionId; // Ensure sessionId is returned or managed appropriately
                state.status = 'succeeded';
            })
            .addCase(checkLogin.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.sessionId = null;
                state.status = 'failed';
                state.error = action.payload || "Session invalid/expired";
            })
            .addCase(startHunt.fulfilled, (state, action) => {
                state.huntState.hasStartedHunt = true;
                state.status = 'idle';
            })
            .addCase(endHunt.fulfilled, (state, action) => {
                state.huntState.hasEndedHunt = true;
                state.status = 'idle';
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.sessionId = null;
                state.status = 'idle';
                state.error = null;
                localStorage.removeItem('sessionId');
                localStorage.removeItem('userInfo');
            });
    },
});
export const { initializeAuthState } = authSlice.actions;
export default authSlice.reducer;