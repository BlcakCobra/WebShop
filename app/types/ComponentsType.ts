import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { ClothingSize, ProductType } from "./ProductSliceType";
import { ColorForDetails } from "./ProductDetails";

export interface BurgerType {
    isOpen:boolean,
    toggleMenu: () => void
}


export interface AdminMenuType{
    isAdmin:boolean,
    openSettingsMenuAdmin:()=>void,
    settingsMenuAdmin:boolean
}

export interface NavProfileType{
    settingsMenuProfile:boolean,
    openSettingsMenuProfile:()=>void

}

export interface ImportImageInputType {
    handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void; 
    image:string
  }

  export interface OtherParametrsTypes {
    handleChangeSexValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangeClothingTypeValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handlePickColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeClothingTypeSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangePrice: (e: React.ChangeEvent<HTMLInputElement>) => void;  
    handleChangeName:(e: React.ChangeEvent<HTMLInputElement>) => void;  
}
  
export interface UpdateProductType {
    id:string
}




export interface MapForProductsType {
    [x: string]: any;
    productsList:ProductType[] | undefined | null
}



export interface MenuForCreateDetailType {
    setFlipped: (value: boolean) => void;
    closeMenuForCreateItem: () => void;
    flipped:boolean
    token: string | null
    setLocalImages: React.Dispatch<React.SetStateAction<File[]>>;
    localImages:File[]
    
}



export interface MultiSelectExampleType {
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  label: string;
}

export interface SelectFewImagesProps {
  images: File[];
  handleImagesUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}