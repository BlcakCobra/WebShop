import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestesToServer } from '../../api/api';
import {ProductType} from "../../types/ProductSliceType"

export const AsyncGetProductById = createAsyncThunk(
    "AsyncGetProductByIdSlice",
    async (args:{id:string},{rejectWithValue}) =>{
        try {
            if (!args.id) {
                return rejectWithValue("Product ID is missing");
            }
                const res =await RequestesToServer.getProductById(args.id)
                return res?.data
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
              }
              return rejectWithValue('An unexpected error occurred.');
        }
    }
)
interface DeleteProductState {
    loading: boolean;
    product:null | ProductType
    error: string | null;
  }
  
  const initialState: DeleteProductState = {
    loading: false,
    product:null,
    error: null,
  };
const GetProductByIdSlice = createSlice({
    name:"GetProductByIdSlice",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(AsyncGetProductById.fulfilled,(state,action) =>{
            state.product = action.payload
            state.loading = false
        })
        .addCase(AsyncGetProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })
          .addCase(AsyncGetProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
    }
})

export default GetProductByIdSlice.reducer