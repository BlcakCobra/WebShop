import { configureStore } from "@reduxjs/toolkit";
import { AuthenticationSlice } from "./Slices/AuthenticationSlice";
import {LoginSlice} from "./Slices/LoginSlice"
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

export const store = configureStore({
    reducer:{
        Authentication : AuthenticationSlice.reducer,
        login:LoginSlice.reducer
    }       
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;