import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginSliceinitialState } from "./../../types/AuthenticationSliceType";
import { RequestesToServer } from "../../api/api";

export const AsyncLoginSlice = createAsyncThunk(
    "AsyncLoginSlice",
    async (_userData: { username: string; password: string }, _thunkAPI) => {
        try {
            const res = await RequestesToServer.LoginReq(_userData.username, _userData.password);
            if (res.status !== 200) {
                throw new Error(`Login failed with status ${res.status}`);
            }
            return res.data;
        } catch (error: any) {
            console.error('Login Error:', error);
            return _thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState: LoginSliceinitialState = {
    loading: false,
    user: null,
    error: null,
    username: "",
    password: "",
    token: typeof window !== "undefined" ? localStorage.getItem('token') : null,
};

const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState: initialState,
    reducers: {
        controlUsername(state,action){
            state.username = action.payload
        },
        controlPassword(state,action){
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(AsyncLoginSlice.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(AsyncLoginSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; 
                state.error = null;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                state.username = ""
                state.password = ""
            })
            .addCase(AsyncLoginSlice.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload as string; 
            });
    },
});

export const {controlPassword,controlUsername} = LoginSlice.actions
export default LoginSlice.reducer