import { ClothingType } from "../../app/types/ProductSliceType";

export interface searchQueryType{
    searchQuery?:string,
    name?:string,
    sex?: "Man" | "Woman" | "Other" | "",
    type?: ClothingType,
    page?:string,
    limit?:string
}
