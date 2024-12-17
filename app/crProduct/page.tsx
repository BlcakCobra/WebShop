"use client";
import React, { ChangeEvent, FormEvent } from "react";
import styles from "./crProduct.module.css";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  updateImage,
  selectSex,
  selectClothsType,
  selectColor,
  selectClothsSize,
  setDescription,
  setPrice,
  setStock,
  AsyncProductSlice,
} from "../store/Slices/ProductSlice";
import ImportImageInput from "../Components/ImportImageInput/ImportImageInput";
import OtherParametrs from "../Components/otherParametrs/OtherParametrs";

export default function CrProduct() {
  const [menuForCreateItem, setMenuForCreateItem] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const dispatch = useAppDispatch();
  const productData = useAppSelector((state) => state.ProductSlice.product);  

  const openMenuForCreateItem = () => {
    setMenuForCreateItem(true);
    setErrorMessage("");
  };

  const closeMenuForCreateItem = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.preventDefault();
    setMenuForCreateItem(false);
    setErrorMessage("");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          dispatch(updateImage(reader.result as string)); 
        }
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleChange = (setStateFunc: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    dispatch(setStateFunc(value)); 
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productData || !productData.sex || !productData.type || !productData.price || !productData.stock || !productData.description) {
      setErrorMessage(`Пожалуйста, заполните поля - ${!productData?.image ? "image," : ""}${!productData?.type ? "type," : ""}${!productData?.color ? "color," : ""}${!productData?.createdAt ? "createdAt," : ""}${!productData?.size ? "size," : ""}${!productData?.sex ? "sex," : ""}${!productData?.price ? "price," : ""}${!productData?.description ? "description," : ""}`);
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Токен не найден.");
      return;
    }
  
    dispatch(AsyncProductSlice({ token, productData }));
  };


  return (
    <div className={styles.Main}>
      <div className={styles.createItem} onClick={openMenuForCreateItem}>
        <div className={styles.circle}>+</div>
      </div>

      {menuForCreateItem && (
        <>
          <div className={styles.overlay} onClick={closeMenuForCreateItem}></div>
          <form onSubmit={handleSubmit}>
            <div className={styles.createItemMenu}>
              <button className={styles.closeMenu} onClick={closeMenuForCreateItem}>
                ×
              </button>
              <h2>Create Product</h2>
              <p>Add details for new Product</p>
              <ImportImageInput handleImageUpload={handleImageUpload} errorMessage={errorMessage} />
              <OtherParametrs 
                handleChangeSexValue={handleChange(selectSex)} 
                handleChangeClothingTypeValue={handleChange(selectClothsType)} 
                handlePickColor={handleChange(selectColor)} 
                handleChangeClothingTypeSize={handleChange(selectClothsSize)} 
                handleDescriptionChange={handleChange(setDescription)} 
                handleChangePrice={handleChange(setPrice)}
                handleChangeStock={handleChange(setStock)}
              />

            </div>
          </form>
        </>
      )}
    </div>
  );
}
