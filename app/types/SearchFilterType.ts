import { ClothingType, SexType } from "./ProductSliceType";

export type SortOption = "" | "newest" | "rating_desc" | "price_desc" | "price_asc" | "oldest";

export interface SearchFilterParams {
  searchQuery?: string;
  sort?: SortOption;
  priceFrom?: number;
  priceTo?: number;
  type?: ClothingType;
  sex?: SexType;
  discount?:"true" | "false";
  rating?: number;
}
