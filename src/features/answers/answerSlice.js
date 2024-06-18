import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getAllAnswersForCSV = createAsyncThunk("answer/fetchAllAnswersForCSV", async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
        const response = await axios.get(`${apiUrl}answer/getAllAnswers`, {
            headers: {
                "sessionid": auth.sessionId,
            },
            withCredentials: true
        });
        return response.data;  // Directly return the fetched data
    } catch (error) {
        console.error('Error while fetching answers:', error);
        return rejectWithValue(error);
    }
}
);
export const getNumberOfCorrectAnswers = createAsyncThunk("answer/getNumberOfCorrectAnswers", async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
        const res = await axios.get(`${apiUrl}answer/getNumberOfCorrectAnswers`, {
            headers: {
                "sessionid": auth.sessionId,
            },
            withCredentials: true
        });
        return res.data;
    } catch (err) {
        console.error(err);
        return rejectWithValue(err);
    }
});
export const submitAnswer = createAsyncThunk("answer/submitAnswer", async (answerData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
        const res = await axios.post(`${apiUrl}answer/submit`,
            answerData, {
            headers: {
                "sessionid": auth.sessionId,
            },
            withCredentials: true,
        });
        return res.data;
    }
    catch (err) {
        console.error(err);
        return rejectWithValue(err);
    }
});
export const updateAnswerById = createAsyncThunk("answer/updateAnswerById", async ({ answerId, answerData }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
        const res = await axios.put(`${apiUrl}answer/updateAnswerById/${answerId}`,
            answerData, {
            headers: {
                "sessionid": auth.sessionId,
            },
            withCredentials: true,
        });
        if (res.status === 200) {
            return res.data
        }
        else
            return res.message;
    }
    catch (err) {
        console.error(err);
        return rejectWithValue(err);
    }
});

export const getAnswer = createAsyncThunk("answer/getAnswer", async (locationId, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
        const res = await axios.get(`${apiUrl}answer/getAnswer/${locationId}`, {
            headers: {
                "sessionid": auth.sessionId,
            },
            withCredentials: true,
        });
        return res.data;
    }
    catch (err) {
        console.error(err);
        return rejectWithValue(err);
    }
});

export const getAnswersByUserId = createAsyncThunk("answer/getAnswersByUserId", async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    try {
        const res = await axios.get(`${apiUrl}answer/getAnswersByUserId`, {
            headers: {
                "sessionid": auth.sessionId,
            },
            withCredentials: true,
        });
        return res.data;
    }
    catch (err) {
        console.error("err",err);
        return rejectWithValue(err);
    }
});

const initialState = {
    answers: [],
    currentAnswerId: null,
    loading: false,
    error: null,
};
const answerSlice = createSlice({
    name: 'answer',
    initialState,
    reducers: {
        clearCurrentAnswerId(state) {
            state.currentAnswerId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitAnswer.pending, (state) => {
                state.loading = true;
            })
            .addCase(submitAnswer.fulfilled, (state, action) => {
                ///check that action.payload.data._id is not already in the state
                const existingIndex = state.answers.findIndex(answer => answer._id === action.payload.data._id);
                if (action.payload) {
                    if (existingIndex !== -1) {
                        state.answers[existingIndex] = action.payload.data;
                    }
                    else {
                        state.answers.push(action.payload.data); // Add new answer to the list
                        state.currentAnswerId = action.payload.data._id; // Store the new answer ID
                        state.loading = false;
                        state.error = null;
                    }
                }
                ///else -> user already submitted answer
            })
            .addCase(submitAnswer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateAnswerById.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAnswerById.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.answers.findIndex(answer => answer._id === action.payload.data._id);
                    if (index !== -1) {
                        state.answers[index] = action.payload; // Update the answer in the list
                    }
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(updateAnswerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAnswer.fulfilled, (state, action) => {
                // Check if the action.payload contains an answer and set the currentAnswerId
                if (action.payload && action.payload.data._id) {
                    state.currentAnswerId = action.payload.data._id;
                    // Optionally, update or add the answer to the answers array
                    const existingIndex = state.answers.findIndex(answer => answer._id === action.payload.data._id);
                    if (existingIndex !== -1) {
                        state.answers[existingIndex] = action.payload.data;
                    } else {
                        state.answers.push(action.payload.data);
                    }
                }
            })
            .addCase(getAnswersByUserId.fulfilled, (state, action) => {
                if (action.payload)
                    state.answers = action.payload.data;
            })
            .addCase(getAnswersByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCurrentAnswerId } = answerSlice.actions;

export default answerSlice.reducer;