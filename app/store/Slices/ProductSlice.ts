import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {ProductType } from "../../types/ProductSliceType";
import { RequestesToServer } from "./../../api/api";




export const AsyncProductSlice = createAsyncThunk(
  "AsyncProductSlice",
  async (args: { token: string; productData: ProductType }) => {
    const { token, productData } = args;
    try {
      const res = await RequestesToServer.CreateProductReq(token, productData);
      if (res.status !== 200) {
        throw new Error(`Product creation failed with status ${res.status}`);
      }
      return res.data; 
    } catch (error:any) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }
);
interface initialStateType {
  product: ProductType | null 
  loading: boolean;
  error: any;
}
const initialState: initialStateType = {
  product: {
    sex: "",
    type: "",
    image: "",
    color: "",
    description: "",
    size: "",
    price: 0,
    stock: 0,
    createdAt: new Date().toISOString(),
    discount: "",
    rating: 0,
    views: 0,
  },
  loading: false,
  error: null,
};


const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
      updateImage: (state, action) => {
      if (state.product) {
        state.product.image = action.payload;
      }
    },
      selectSex: (state, action) => {
      if (state.product) {
        state.product.sex = action.payload;
      }
    },
      selectClothsType: (state, action) => {
      if (state.product) {
        state.product.type = action.payload;
      }
    },
      selectClothsSize: (state, action) => {
      if (state.product) {
        state.product.size = action.payload;
      }
    },
      selectColor: (state, action) => {
      if (state.product) {
        state.product.color = action.payload;
      }
    },
      setDescription: (state, action) => {
      if (state.product) {
        state.product.description = action.payload;
      }
    },
     setPrice: (state, action) => {
      if (state.product) {
        state.product.price = action.payload;
      }
    },
     setStock: (state, action) => {
      if (state.product) {
        state.product.stock = action.payload;
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncProductSlice.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(AsyncProductSlice.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Received data:", action.payload);
        
        state.product = action.payload;
      
        if (state.product) {
          console.log("Clearing data for product:", state.product); 
          state.product.color = "";
          state.product.description = "";
          state.product.sex = "";
          state.product.size = "";
          state.product.stock = 0;
          state.product.price = 0;
          state.product.type = "";
          state.product.image = "";
        }
      })
      
      .addCase(AsyncProductSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
      
  },
});

export default ProductSlice.reducer;
export const {updateImage,selectSex,setStock,selectClothsType,setPrice,selectClothsSize,selectColor,setDescription} = ProductSlice.actions