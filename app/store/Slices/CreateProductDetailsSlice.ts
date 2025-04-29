import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestesToServer } from '../../api/api';
import { ProductDetailsType } from '../../types/ProductDetails';


export const AsyncProductDetailsSlice = createAsyncThunk(
    "AsyncProductDetailsSlice",
    async ({ token, productDetails }: { token: string; productDetails: ProductDetailsType }, { rejectWithValue }) => {
      try {
        if (!token) {
          throw new Error("Token not found");
        }
  
        const res = await RequestesToServer.createProductDetailsController(token, productDetails); 
        return res; 
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  type InitialStateType = {
    error:string,
    loading:boolean,
    productDetails:ProductDetailsType
  }

  let initialState: InitialStateType = {
    error: "",
    loading: false,
    productDetails: {
      productId: "",
      description: "",
      images: [],
      reviews: [], 
      specifications: {}, 
      subjectSizes: [],
      subjectColors: [],
      stock: 0,
      relatedProducts: [], 
      videoReview: "", 
      availableForPreorder: false, 
    },
  };
   
  const ProductDetailsSlice = createSlice({
    name: "ProductDetailsSlice",
    initialState,
    reducers: {
      setProductId: (state, action: PayloadAction<string>) => {
        state.productDetails.productId = action.payload;
      },
      setDescriptionDet: (state, action: PayloadAction<string>) => {
        state.productDetails.description = action.payload;
      },
      setImagesDet: (state, action: PayloadAction<string[]>) => {
        state.productDetails.images = action.payload;
      },
      setReviewsDet: (state, action: PayloadAction<[]>) => {
        state.productDetails.reviews = action.payload;
      },
      selectStockDet: (state, action: PayloadAction<number>) => {
        state.productDetails.stock = action.payload;
      },
      selectSubjectSizesDet: (state, action: PayloadAction<[]>) => { 
        state.productDetails.subjectSizes = action.payload;
      },
      selectSubjectColorsDet: (state, action: PayloadAction<string[]>) => { 
        state.productDetails.subjectColors = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(AsyncProductDetailsSlice.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(AsyncProductDetailsSlice.fulfilled, (state, action) => {
        if (action.payload) {
          state.productDetails = action.payload;
        }
        state.loading = false;
      });
      builder.addCase(AsyncProductDetailsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      });
    },
  });
  

export default ProductDetailsSlice.reducer

export const {setProductId} = ProductDetailsSlice.actions