import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductType, ClothingSize, ClothingType, ProductTypeWithId } from "../../types/ProductSliceType";
import { RequestesToServer } from "../../api/api";

interface initialStateType {
  product: ProductTypeWithId;
  loading: boolean;
  error: string | undefined;
  idForDetails: string | undefined;
}

const initialState: initialStateType = {
  product: {
    id: "",
    name: "",
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
  idForDetails: ""
};

export const AsyncProductSlice = createAsyncThunk(
  "AsyncProductSlice",
  async (args: { token: string; productData: ProductTypeWithId }, { dispatch, rejectWithValue }) => {
    const { token, productData } = args;
    try {
      const res = await RequestesToServer.CreateProductReq(token, productData);
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`Product creation failed with status ${res.status}`);
      }
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
      state.product.image = action.payload;
    },
    selectSex: (state, action: PayloadAction<"Man" | "Woman" | "Other">) => {
      state.product.sex = action.payload;
    },
    selectName: (state, action: PayloadAction<string>) => {
      state.product.name = action.payload;
    },
    selectClothsType: (state, action: PayloadAction<ClothingType>) => {
      state.product.type = action.payload;
    },
    selectClothsSize: (state, action: PayloadAction<ClothingSize>) => {
      state.product.size = action.payload;
    },
    selectColor: (state, action: PayloadAction<string>) => {
      state.product.color = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.product.price = action.payload;
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
      .addCase(AsyncProductSlice.fulfilled, (state, action: PayloadAction<ProductTypeWithId>) => {
         if (action.payload) {
            state.product = action.payload;
          }
        state.loading = false;
        state.product = action.payload; 
      })
      .addCase(AsyncProductSlice.rejected, (state, action) => {
        console.log("❌ Ошибка при создании продукта:", action.error.message);
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
