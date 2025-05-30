import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestesToServer } from "../../api/api";
import {SearchAnythingSliceType} from "./../../types/SearchSliceType"

export const AsyncSearchAnythingSlice = createAsyncThunk(
  "AsyncSearchAnythingSlice",
  async ({ searchQuery, page }: { searchQuery: string, page: number }, { rejectWithValue }) => {
    try {
      if (!searchQuery) {
        throw new Error("Search query is required.");
      }

      const res = await RequestesToServer.SearchProduct(searchQuery, page);
      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);


type InitialStateType = {
  someSearchResults: SearchAnythingSliceType | null | undefined;
  error: string | null;
  loading: boolean;
  searchQuery:string | ""
  chooseWhichArr: "five" | "all" | ""
  currentPage?: number ;
};

const initialState: InitialStateType = {
  someSearchResults: null,
  error: null,
  loading: false,
  searchQuery:"",
  chooseWhichArr: "",
  currentPage:1
};

const SearchAnythingSlice = createSlice({
  name: "SearchAnythingSlice",
  initialState,
  reducers: {
    setSearchQuery(state,action){
      state.searchQuery = action.payload
    },
    setChooseWhichArr(state, action) {
      state.chooseWhichArr = action.payload; 
    },
    applySearchLimit(state) {
      if (state.chooseWhichArr === "five" && state.someSearchResults) {
        state.someSearchResults.products = state.someSearchResults.products.slice(0, 5);
      }
    },
    resetSearchQuery(state){
      state.searchQuery = ""
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    resetCurrentPage(state) {
      state.currentPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncSearchAnythingSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AsyncSearchAnythingSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.someSearchResults = action.payload;
      })
      .addCase(AsyncSearchAnythingSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default SearchAnythingSlice.reducer;

export const {setSearchQuery,applySearchLimit,setChooseWhichArr,resetSearchQuery,setCurrentPage,resetCurrentPage} = SearchAnythingSlice.actions