import { ClothingType, SexType } from "./ProductSliceType";

export type SortOption = "" | "newest" | "rating_desc" | "price_desc" | "price_asc" | "oldest";

export interface SearchFilterParams {
  sort?: SortOption;
  priceFrom?: number;
  priceTo?: number;
  type?: ClothingType;
  sex?: SexType;
  discount?:"true" | "false";
  rating?: number;
}
export interface SearchFilterParamsForRequest{
    params:SearchFilterParams,
    page:number
}