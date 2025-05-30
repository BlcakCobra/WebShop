import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestesToServer } from "../../api/api";
import { ClothingType, ProductType, SexType } from "../../types/ProductSliceType";
import {SearchFilterParams,SortOption} from "./../../types/SearchFilterType"
 

export const AsyncSearchResultFilterSlice = createAsyncThunk(
  "AsyncSearchResaultFilterSlice",
  async (params: SearchFilterParams, { rejectWithValue }) => {
    try {
      const res = await RequestesToServer.SearchResultFilter(params);
      return res;
    } catch (error) {
      return rejectWithValue("Произошла ошибка при получении данных.");
    }
  }
);

type initialStateType = {
  filterdResault: ProductType[]; 
  error: string;
  loading: boolean;
  priceTo:number
  priceFrom:number
  sex: "Man"|  "Woman" | "Other" |""
  type:ClothingType
  sort: "newest" | "rating_desc" | "price_desc" | "price_asc" | "oldest" | "";
  discount:boolean
  rating:number
};

const initialState: initialStateType = {
  filterdResault: [],
  error: "",
  loading: false,
  priceTo:0,
  priceFrom:0,
  sex:"",
  type:"",
  sort:"",
  discount:false,
  rating:0
};

 const FilterSearchedProductSlice = createSlice({
  name: "FilterSearchedProductSlice",
  initialState,
  reducers: {
    setPriceTo: (state, action: PayloadAction<number>) => {
      state.priceTo = action.payload;
    },
    setPriceFrom: (state, action: PayloadAction<number>) => {
      state.priceFrom = action.payload;
    },
    setSortValue: (state, action: PayloadAction<SortOption>) => {
      state.sort = action.payload;
    },
    setSex: (state, action: PayloadAction<SexType>) => {
      state.sex = action.payload;
    },
    setDiscount: (state, action: PayloadAction<boolean>) => {
      state.discount = action.payload;
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    setType: (state, action: PayloadAction<ClothingType>) => {
      state.type = action.payload;
    },
    resetFilters: (state) => {
      state.priceTo = 0;
      state.priceFrom = 0;
      state.sort = "";
      state.sex = "";
      state.type = "";
      state.rating = 0;
      state.discount = false;
    },
    setFilteredResult: (state, action: PayloadAction<ProductType[]>) => {
      state.filterdResault = action.payload;
    },
  },extraReducers: (builder) => {
    builder
      .addCase(AsyncSearchResultFilterSlice.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AsyncSearchResultFilterSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.filterdResault = action.payload;
      })
      .addCase(AsyncSearchResultFilterSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
  
});

export const {  resetFilters, setPriceTo,setPriceFrom,setSortValue,setSex,setDiscount,setType,setRating } = FilterSearchedProductSlice.actions;
export default FilterSearchedProductSlice.reducer;
