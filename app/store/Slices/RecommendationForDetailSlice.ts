import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestesToServer } from '../../api/api';
import { ColorForDetails, ProductDetailsType } from '../../types/ProductDetails';
import { ClothingSize } from '../../types/ProductSliceType';


export const AstncRecommendationForDetailSlice =createAsyncThunk(
    "AstncRecommendationForDetailSlice",
    async ({productId}:{productId:string},{ rejectWithValue }) =>{
        try {
            if(!productId){
                return rejectWithValue("Произошла ошибка при получении данных.");
            }
        } catch (error) {
      return rejectWithValue(error.message || "Ошибка запроса");
            
        }
    }
)
const RecommendationForDetailSlice = createSlice({
    name:"RecommendationForDetailSlice",
    initialState:{
        recProducts:[],
        error:"",
        loading:false
    },
    reducers:{},
    extraReducers:((builder) =>{
        builder
        .addCase()
    })
})