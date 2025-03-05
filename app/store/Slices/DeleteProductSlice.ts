import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestesToServer } from '../../api/api';

interface DeleteProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: DeleteProductState = {
  loading: false,
  success: false,
  error: null,
};

export const AsyncDeleteProductSlice = createAsyncThunk(
  'AsyncDeleteProductSlice',
  async (args: { token: string; id: string }, {  rejectWithValue }) => {
    try {
      const response = await RequestesToServer.deleteTheProduct(args.token, args.id);

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred.');
    }
  }
);

const deleteProductSlice = createSlice({
  name: 'deleteProductSlice',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncDeleteProductSlice.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(AsyncDeleteProductSlice.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(AsyncDeleteProductSlice.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccess} = deleteProductSlice.actions;
export const deleteProductReducer = deleteProductSlice.reducer;
