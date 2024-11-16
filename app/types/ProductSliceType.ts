type ClothingType = 
  "t-shirts" | "blouses" | "shirts" | "hoodies" | "sweatshirts" | "tank tops" |
  "jeans" | "shorts" | "trousers" | "pants" | "skirts" | "leggings" |
  "casual dresses" | "cocktail dresses" | "maxi dresses" | "mini dresses" | "formal gowns" |
  "coats" | "jackets" | "blazers" | "parkas" | "vests" |
  "bras" | "panties" | "boxers" | "briefs" | "lingerie" |
  "sneakers" | "boots" | "sandals" | "heels" | "flats" |
  "hats" | "scarves" | "belts" | "gloves" | "bags" |
  "sports bras" | "yoga pants" | "tracksuits" | "athletic shorts" |
  "pajamas" | "nightgowns" | "robes" |
  "bikinis" | "swimsuits" | "swim trunks" | null;

type ClothingSize = 
    "S"| "M"| "L"| "XL"| "XXL" | null;

export type initialStateType={ 
    sex: "male" | "female" | null,
    type:ClothingType,
    image:string, 
    color:string, 
    description:string, 
    size:ClothingSize, 
    price:number, 
    stock:number, 
    category:string, 
    createdAt:Date | null, 
    discount:string, 
    rating:number,
    views:number ,
    error:any,
    loading:boolean
}
export type ProductType={
    sex: "male" | "female" | null,
    type:ClothingType,
    image:string, 
    color:string, 
    description:string, 
    size:ClothingSize, 
    price:number, 
    stock:number, 
    category:string, 
    createdAt:Date | null, 
    discount:string, 
    rating:number,
    views:number 
}