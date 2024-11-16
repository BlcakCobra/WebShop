import { configureStore } from "@reduxjs/toolkit";
import  AuthenticationSlice  from "./Slices/AuthenticationSlice";
import LoginSlice from "./Slices/LoginSlice"
import ProductSlice from "./Slices/ProductSlice"
import { TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer:{
        Authentication:AuthenticationSlice,
        login:LoginSlice,
        ProductSlice:ProductSlice
    }       
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;