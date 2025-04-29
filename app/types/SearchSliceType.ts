import {ProductType} from "./ProductSliceType"

export type SearchAnythingSliceType ={
    page:number,
    products:ProductType[],
    totalItems:number,
    totalPages:number ,
}