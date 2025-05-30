import { ClothingType, SexType } from "../../app/types/ProductSliceType";
import { SearchFilterParams, SortOption } from "../../app/types/SearchFilterType";

export interface searchQueryType{
    searchQuery?:string,
    name?:string,
    sex?: "Man" | "Woman" | "Other" | "",
    type?: ClothingType,
    page?:string,
    limit?:string
}


export type ServerSearchFilterParams = Omit<SearchFilterParams, "discount" | "priceFrom" | "priceTo" | "rating"> & {
  discount?: string;
  priceFrom?: string;
  priceTo?: string;
  rating?: string;
  page?:string
  limit?:string
};