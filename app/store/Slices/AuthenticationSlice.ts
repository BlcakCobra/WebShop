import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestesToServer } from "../../api/api";
import {AuthenticationSliceinitialState} from "./../../types/AuthenticationSliceType"


export const AsynkAuthentication = createAsyncThunk(
    "AsynkAuthentication",
    async (userData: { username: string; password: string; confirmPassword: string }, thunkAPI) => {
        try {
            const res = await RequestesToServer.RegistrationReq(userData.username, userData.password, userData.confirmPassword);
            console.log('API Response:', res);
            return res.data;
        } catch (error: any) {
            console.error("Something went wrong", error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
const initialState : AuthenticationSliceinitialState ={
    loading: false,
    user: null ,
    error: null ,
    username: "",
    password: "",
    confirmPassword: ""
}
export const AuthenticationSlice = createSlice({
    name:"AuthenticationSlice",
    initialState:initialState,
    reducers:{
        controlUsername(state,action){
            state.username = action.payload
        },
        controlPassword(state,action){
            state.password = action.payload
        },
        controlConfirmPassword(state,action){
            state.confirmPassword = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(AsynkAuthentication.pending,(state) =>{
            state.loading = true
        })
        .addCase(AsynkAuthentication.fulfilled,(state,action) =>{
            state.user = action.payload
            state.loading = false
            state.username = ""
            state.password = ""
            state.confirmPassword = ""
        }) 
        .addCase(AsynkAuthentication.rejected,(state,action)=>{
            state.error = action.payload as string;
            state.loading = false
        })
    }
})

export  const  {controlUsername,controlPassword,controlConfirmPassword} = AuthenticationSlice.actions