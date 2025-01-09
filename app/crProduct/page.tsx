"use client";
import React, { useEffect } from "react";
import styles from "./crProduct.module.css";
import { useAppDispatch, useAppSelector } from "../store/store";
import MenuForCreateItem from "./MenuForCreateItem/MenuForCreateItem";
import { AsyncProductSlice } from "../store/Slices/CreateProductSlice";
import { AsyncGettingProductSlice } from "../store/Slices/GettingProductSlice";
import { ProductType } from "../types/ProductSliceType";
import GetAllProducts from "../Components/GetAllProducts/GetAllProducts";

export default function CrProduct() {
  const [menuForCreateItem, setMenuForCreateItem] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const dispatch = useAppDispatch();
  const productData = useAppSelector((state) => state.ProductSlice.product);

  const handleSubmit = () => {
    if (!productData) {
      setErrorMessage("Данные продукта отсутствуют.");
      return;
    }

    const requiredFields: (keyof ProductType)[] = ["sex", "type", "price", "stock", "description"];
    const missingFields = requiredFields.filter((field) => !productData?.[field]);

    if (missingFields.length > 0) {
      setErrorMessage(`Заполните поля: ${missingFields.join(", ")}.`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Токен не найден.");
      return;
    }

    dispatch(AsyncProductSlice({ token, productData }));
    setMenuForCreateItem(false); 
    setErrorMessage(""); 
  };

  useEffect(() => {
    dispatch(AsyncGettingProductSlice());
  }, [dispatch]);

  const openMenuForCreateItem = () => {
    setMenuForCreateItem(true);
    setErrorMessage("");
  };

  return (
    <div className={styles.Main}>
      <div className={styles.colum}>
      <div className={styles.row}>
        <div className={styles.createItem} onClick={openMenuForCreateItem}>
          <div className={styles.circle}>+</div>
        </div>
        <MenuForCreateItem
          menuForCreateItem={menuForCreateItem}
          setMenuForCreateItem={setMenuForCreateItem}
          setErrorMessage={setErrorMessage}
          handleSubmit={handleSubmit} 
        />
        <GetAllProducts
        />
      </div>
      </div>
    </div>
  );
}
