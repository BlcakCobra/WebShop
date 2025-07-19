import React from "react";

export interface MenuForCreateItemProps {
    menuForCreateItem: boolean;
    setMenuForCreateItem: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: () => void;
    token:string |null
    setLocalImages: React.Dispatch<React.SetStateAction<File[]>>;
    localImages:File[]
  }