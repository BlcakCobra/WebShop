import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RequestesToServer} from "./../../api/api"
import { ClothingSize, ClothingType } from "../../types/ProductSliceType";
import {FilteredProductType} from "../../types/ProductSliceType"

export const AsyncUpdateProductSlice = createAsyncThunk(
    "AsyncUpdateProductSlice",
    async (args:{token: string,id: string,updatedProduct: FilteredProductType}) =>{
    const { token,id, updatedProduct } = args;

        try {
            const res = await RequestesToServer.updateData(token,id,updatedProduct)
                if (res?.status !== 200) {
                    throw new Error(`Product creation failed with status ${res?.status}`);
                  }
                  return res.data
           
        } catch (error:any) {
            throw new Error(`Error creating product: ${error.message}`);

        }
    }
)
interface initialStateType  {
        loading:boolean,
        updatedProduct: FilteredProductType | null,
        error:string
}

    const initialState:initialStateType = {
        loading:false,
        updatedProduct:null,
        error:""
    }
const UpdateProductSlice = createSlice({
    name:"UpdateProductSlice",
    initialState,
    reducers:{
        updateImage: (state, action: PayloadAction<string>) => {
            if (state.updatedProduct) {
              state.updatedProduct.image = action.payload;
            }
          },
          selectSex: (state, action: PayloadAction<"Man" | "Woman" | "Other">) => {
            if (state.updatedProduct) {
              state.updatedProduct.sex = action.payload;
            }
          },
          selectClothsType: (state, action: PayloadAction<ClothingType>) => {
            if (state.updatedProduct) {
              state.updatedProduct.type = action.payload;
            }
          },
          selectClothsSize: (state, action: PayloadAction<ClothingSize>) => {
            if (state.updatedProduct) {
              state.updatedProduct.size = action.payload;
            }
          },
          selectColor: (state, action: PayloadAction<string>) => {
            if (state.updatedProduct) {
              state.updatedProduct.color = action.payload;
            }
          },
          setDescription: (state, action: PayloadAction<string>) => {
            if (state.updatedProduct) {
              state.updatedProduct.description = action.payload;
            }
          },
          setPrice: (state, action: PayloadAction<number>) => {
            if (state.updatedProduct) {
              state.updatedProduct.price = action.payload;
            }
          },
          setStock: (state, action: PayloadAction<number>) => {
            if (state.updatedProduct) {
              state.updatedProduct.stock = action.payload;
            }
          }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(AsyncUpdateProductSlice.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(AsyncUpdateProductSlice.fulfilled,(state,action)=>{
            state.loading = false
            state.updatedProduct = action.payload
        })
        .addCase(AsyncUpdateProductSlice.rejected,(state,action)=>{
            state.error = action.error.message || "Что-то пошло не так";
        })
    }
})
export default UpdateProductSlice.reducer

export const {
  updateImage,
  selectSex,
  setStock,
  selectClothsType,
  setPrice,
  selectClothsSize,
  selectColor,
  setDescription,
} = UpdateProductSlice.actions;
