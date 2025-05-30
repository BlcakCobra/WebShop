import { ReactNode } from "react";

export type ClothingType =
  | "t-shirts" | "blouses" | "shirts" | "hoodies" | "sweatshirts" | "tank tops"
  | "jeans" | "shorts" | "trousers" | "pants" | "skirts" | "leggings"
  | "casual dresses" | "cocktail dresses" | "maxi dresses" | "mini dresses" | "formal gowns"
  | "coats" | "jackets" | "blazers" | "parkas" | "vests"
  | "bras" | "panties" | "boxers" | "briefs" | "lingerie"
  | "sneakers" | "boots" | "sandals" | "heels" | "flats"
  | "hats" | "scarves" | "belts" | "gloves" | "bags"
  | "sports bras" | "yoga pants" | "tracksuits" | "athletic shorts"
  | "pajamas" | "nightgowns" | "robes"
  | "bikinis" | "swimsuits" | "swim trunks"
  | "";

export type ClothingSize = "S" | "M" | "L" | "XL" | "XXL" | "";

export type SexType = "Man" | "Woman" | "Other" | ""

export interface ProductType {
  [x: string]: any;
  name:string
  sex:SexType ;
  type: ClothingType;
  image: string;
  color: string;
  size: ClothingSize | "";
  price: number;
  discount: number | 0;
  rating: number;
  views: number;
}

export type FilteredProductType = Omit<ProductType, "loading" | "error">;
