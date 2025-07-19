import { ClothingSize } from "./ProductSliceType";

export type ColorForDetails = (
  | "Black" | "White" | "Red" | "Green" | "Blue" | "Yellow" | "Orange" | "Purple" | "Pink" | "Brown" | "Gray" | "Beige" | "Cyan" | "Magenta" | "Lime" | "Olive"
  | "Navy" | "Teal" | "Maroon" | "Gold" | "Silver" | "Turquoise" | "Coral" | "Indigo" | "Violet" | ""
)[];


export type ProductDetailsType = {
    productId: string; 
    description: string;
    images: File[];
    // reviews?: {
    //     user: string;
    //     rating: number;
    //     comment?: string;
    // }[];
    subjectSizes: ClothingSize[];
    subjectColors: ColorForDetails | [];
    stock: number;
    videoReview?: string;
    availableForPreorder?: boolean;
};
