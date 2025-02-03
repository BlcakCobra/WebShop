import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RequestesToServer } from "../../api/api";
import { ProductType } from "../../types/ProductSliceType";

export const AsyncProductsWithSpecificTypeSlice = createAsyncThunk(
    "ProductsWithSpecificTypeSlice",
    async (type: string, { rejectWithValue }) => {
        try {
            const res = await RequestesToServer.getProductsWithSpecificType(type);
            if(res){
                if (res.status !== 200) {
                    return rejectWithValue(`Product fetching failed with status ${res.status}`);
                }
                return res.data;
            }
        } catch (error: any) {
            return rejectWithValue(`Error fetching products: ${error.message}`);
        }
    }
);

interface InitialStateType {
    loading: boolean;
    error: string | null;
    sortByTypeList: ProductType[] | null;
}

const initialState: InitialStateType = {
    loading: false,
    error: null,
    sortByTypeList: null,
};

const ProductsWithSpecificTypeSlice = createSlice({
    name: "getProductsWithSpecificTypeSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AsyncProductsWithSpecificTypeSlice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AsyncProductsWithSpecificTypeSlice.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
                state.loading = false;
                state.sortByTypeList = action.payload;
            })
            .addCase(AsyncProductsWithSpecificTypeSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default ProductsWithSpecificTypeSlice.reducer;
