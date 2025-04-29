import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductType, ClothingSize, ClothingType } from "../../types/ProductSliceType";
import { RequestesToServer } from "../../api/api";
import { setProductId } from "./CreateProductDetailsSlice";

interface initialStateType {
  product: ProductType;
  loading: boolean;
  error: string | undefined;
}

const initialState: initialStateType = {
  product: {
    name:"",
    sex: "",
    type: "", 
    image: "",
    color: "",
    size: "",
    price: 0,
    discount: 0,
    rating: 0,
    views: 0,
  },
  loading: false,
  error: undefined,
};

export const AsyncProductSlice = createAsyncThunk(
  "AsyncProductSlice",
  async (args: { token: string; productData: ProductType }, {dispatch, rejectWithValue }) => {
    const { token, productData } = args;
    try {
      const res = await RequestesToServer.CreateProductReq(token, productData);
      if (res.status !== 200) {
        throw new Error(`Product creation failed with status ${res.status}`);
      }
        dispatch(setProductId(res.data.id));

        return res.data;
      
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    updateImage: (state, action: PayloadAction<string>) => {
      if (state.product) {
        state.product.image = action.payload;
      }
    },
    selectSex: (state, action: PayloadAction<"Man" | "Woman" | "Other">) => {
      if (state.product) {
        state.product.sex = action.payload;
      }
    },
    selectName: (state, action: PayloadAction<string>) => {
      if (state.product) {
        state.product.name = action.payload;
      }
    },
    selectClothsType: (state, action: PayloadAction<ClothingType>) => {
      if (state.product) {
        state.product.type = action.payload;
      }
    },
    selectClothsSize: (state, action: PayloadAction<ClothingSize>) => {
      if (state.product) {
        state.product.size = action.payload;
      }
    },
    selectColor: (state, action: PayloadAction<string>) => {
      if (state.product) {
        state.product.color = action.payload;
      }
    },
    setPrice: (state, action: PayloadAction<number>) => {
      if (state.product) {
        state.product.price = action.payload;
      }
    },
    resetProduct: (state) => {
      state.product = { ...initialState.product };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncProductSlice.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(AsyncProductSlice.fulfilled, (state, action: PayloadAction<ProductType>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(AsyncProductSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      });
  },
});

export default ProductSlice.reducer;
export const {
  updateImage,
  selectSex,
  selectName,
  selectClothsType,
  setPrice,
  selectClothsSize,
  selectColor,
  resetProduct,
} = ProductSlice.actions;
