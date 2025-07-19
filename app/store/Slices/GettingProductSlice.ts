import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {RequestesToServer} from "./../../api/api"
import { ProductType, ProductTypeWithId } from "../../types/ProductSliceType";

export const AsyncGettingProductSlice = createAsyncThunk(
    "AsyncGettingProductSlice",
    async ()=> {
       try {
        const res = await RequestesToServer.getAllProducts()
        if (res.status !== 200) {
            throw new Error(`Product creation failed with status ${res.status}`);
          }
          return res.data
       } catch (error:any) {
        throw new Error(`Error creating product: ${error.message}`);
       }
    }
)   

    interface initialStateType{
        products:null | ProductTypeWithId[],
        loading:boolean,
        error:string
    }
    const initialState:initialStateType = {
        products:null,
        loading:false,
        error: ""
    }



 const gettingProductSlice = createSlice({
    name : "gettingProductSlice",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(AsyncGettingProductSlice.pending,(state,action) =>{
            state.loading = true
        })
        .addCase(AsyncGettingProductSlice.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload || []
        })
        .addCase(AsyncGettingProductSlice.rejected,(state,action) =>{
            state.loading = false
            state.error = action.error.message || "Something went wrong";
        })
    }
})

export default gettingProductSlice.reducer