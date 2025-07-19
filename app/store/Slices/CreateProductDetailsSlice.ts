import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestesToServer } from '../../api/api';
import { ColorForDetails, ProductDetailsType } from '../../types/ProductDetails';
import { ClothingSize } from '../../types/ProductSliceType';

export const AsyncProductDetailsSlice = createAsyncThunk(
  "AsyncProductDetailsSlice",
  async (
    { token, productDetails }: { token: string; productDetails: ProductDetailsType },
    { rejectWithValue }
  ) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }

      const res = await RequestesToServer.createProductDetails(token, productDetails);
      if (!res) throw new Error("No response from server");
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка запроса");
    }
  }
);

type InitialStateType = {
  error: string;
  loading: boolean;
  productDetails: ProductDetailsType;
};

let initialState: InitialStateType = {
  error: "",
  loading: false,
  productDetails: {
    productId: "",
    description: "",
    images: [],
    subjectSizes: [],
    subjectColors: [],
    stock: 0,
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
    setDescription: (state, action: PayloadAction<string>) => {
      state.productDetails.description = action.payload;
    },
    selectStockDet: (state, action: PayloadAction<number>) => {
      state.productDetails.stock = action.payload;
    },
    selectSubjectSizesDet: (state, action: PayloadAction<ClothingSize[]>) => {
      state.productDetails.subjectSizes = action.payload;
    },
    selectSubjectColorsDet: (state, action: PayloadAction<ColorForDetails>) => {
      state.productDetails.subjectColors = action.payload;
    },
    clearImages: (state) => {
      state.productDetails.images = [];
    },
    setVideoRew(state, action: PayloadAction<string>)  {
      state.productDetails.videoReview = action.payload;
    },
    setAvailableForPreorder: (state, action: PayloadAction<boolean>) => {
      state.productDetails.availableForPreorder = action.payload;
    },
    resetProductDetails(state){
      if(state.productDetails){
      state.productDetails = { ...initialState.productDetails }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncProductDetailsSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AsyncProductDetailsSlice.fulfilled, (state, action) => {
      if (action.payload) {
        state.productDetails = { ...state.productDetails, ...action.payload };;
      }
      state.loading = false;
    });
    builder.addCase(AsyncProductDetailsSlice.rejected, (state, action) => {
      console.log("❌ Ошибка при создании деталей продукта:", action.error.message);
      state.loading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.error.message || "Что-то пошло не так";
    });

  },
});

export default ProductDetailsSlice.reducer;

export const {
  setProductId,
  setDescription,
  selectStockDet,
  selectSubjectSizesDet,
  selectSubjectColorsDet,
  setVideoRew,
  setAvailableForPreorder,
  resetProductDetails
} = ProductDetailsSlice.actions;
