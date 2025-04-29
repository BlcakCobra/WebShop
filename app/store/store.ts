import { configureStore } from "@reduxjs/toolkit";
import  AuthenticationSlice  from "./Slices/AuthenticationSlice";
import LoginSlice from "./Slices/LoginSlice"
import ProductSlice from "./Slices/CreateProductSlice"
import gettingProductSlice from "./Slices/GettingProductSlice"
import {deleteProductReducer} from "./Slices/DeleteProductSlice"
import UpdateProductSluce from "./Slices/updateProductSlice"
import GetProductByIdSlice from "./Slices/GetProductByIdSlice"
import { TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import  ProductsWithSpecificType from "../store/Slices/ProductsWithSpecificTypeSlice";
import CreateProductDetailsSlice from "./Slices/CreateProductDetailsSlice"
import SearchAnythingSlice from "./Slices/SearchAnythingSlice"
import SearchResaultFilterSlice from "./Slices/SearchResaultFilterSlice"

export const store = configureStore({
    reducer:{
        Authentication:AuthenticationSlice,
        login:LoginSlice,
        ProductSlice:ProductSlice,
        gettingProductSlice:gettingProductSlice,
        deleteProductSlice:deleteProductReducer,
        ProductsWithSpecificType:ProductsWithSpecificType,
        GetProductByIdSlice:GetProductByIdSlice,
        CreateProductDetailsSlice:CreateProductDetailsSlice,
        SearchAnythingSlice:SearchAnythingSlice,
        SearchResaultFilterSlice:SearchResaultFilterSlice
        }       
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;