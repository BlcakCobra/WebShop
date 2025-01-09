import { FormEvent } from "react";

export interface MenuForCreateItemProps {
    menuForCreateItem: boolean;
    setMenuForCreateItem: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: () => void;
  }