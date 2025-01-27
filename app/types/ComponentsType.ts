import { ChangeEvent, HTMLInputTypeAttribute } from "react";

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
    handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleChangePrice: (e: React.ChangeEvent<HTMLInputElement>) => void;  
    handleChangeStock: (e: React.ChangeEvent<HTMLInputElement>) => void;  
}
  
export interface UpdateProductType {
    id:string
}