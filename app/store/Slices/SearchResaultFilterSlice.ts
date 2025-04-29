import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestesToServer } from "../../api/api";

interface SearchFilterParams {
  searchQuery: string;
  sort?: string;
  priceFrom?: number;
  priceTo?: number;
  type?: string;
  sex?: string;
  discount?: boolean;
  rating?: number;
}

export const AsyncSearchResaultFilterSlice = createAsyncThunk(
  "AsyncSearchResaultFilterSlice",
  async (params: SearchFilterParams, { rejectWithValue }) => {
    try {
      const res = await RequestesToServer.SearchResaultFilter(params);
      return res;
    } catch (error) {
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

const initialState = {
  filterdResault: [],
  error: "",
  loading: false,
};

const SearchResaultFilterSlice = createSlice({
  name: "SearchResaultFilterSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AsyncSearchResaultFilterSlice.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(AsyncSearchResaultFilterSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.filterdResault = action.payload;
      })
      .addCase(AsyncSearchResaultFilterSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default SearchResaultFilterSlice.reducer;
