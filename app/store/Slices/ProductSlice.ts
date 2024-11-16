import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductType, initialStateType } from "../../types/ProductSliceType";
import { RequestesToServer } from "./../../api/api";

const AsyncProductSlice = createAsyncThunk(
  "product/create",
  async (args: { token: string; productData: ProductType }) => {
    const { token, productData } = args;
    try {
      const res = await RequestesToServer.CreateProductReq(token, productData);
      if (res.status !== 200) {
        throw new Error(`Product creation failed with status ${res.status}`);
      }
      return res.data; 
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }
);

const initialState: initialStateType = {
  sex: null,
  type: null,
  image: "",
  color: "",
  description: "",
  size: null,
  price: 0,
  stock: 0,
  category: "",
  createdAt: null,
  discount: "",
  rating: 0,
  views: 0,
  loading: false,
  error: null,
};

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AsyncProductSlice.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(AsyncProductSlice.fulfilled, (state, action) => {
        state.loading = false;
        return { ...state, ...action.payload };
      })
      .addCase(AsyncProductSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  },
});

export default ProductSlice.reducer;
