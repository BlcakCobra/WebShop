"use client";
import React, { useEffect, useState } from "react";
import styles from "./crProduct.module.css";
import { useAppDispatch, useAppSelector } from "../store/store";
import MenuForCreateItem from "./MenuForCreateItem/MenuForCreateItem";
import { AsyncProductSlice, resetProduct } from "../store/Slices/CreateProductSlice";
import { AsyncGettingProductSlice } from "../store/Slices/GettingProductSlice";
import { ProductType } from "../types/ProductSliceType";
import GetAllProducts from "../Components/GetAllProducts/GetAllProducts";
import { setProductId, AsyncProductDetailsSlice, resetProductDetails } from "../store/Slices/CreateProductDetailsSlice";
import { useIsAdmin } from "../OwnHooks/isAdminFront";

export default function CrProduct() {
  const [menuForCreateItem, setMenuForCreateItem] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [localImages, setLocalImages] = React.useState<File[]>([]);

  const productData = useAppSelector((state) => state.ProductSlice.product);
  const productDetails = useAppSelector((state) => state.CreateProductDetailsSlice.productDetails);



  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);


  useIsAdmin(token)


  const handleSubmit = async () => {
    setErrorMessage("");

    if (!productData) {
      setErrorMessage("Данные продукта отсутствуют.");
      return;
    }

    const requiredFields: (keyof ProductType)[] = ["sex", "type", "price"];
    const missingFields = requiredFields.filter((field) => !productData[field]);

    if (missingFields.length > 0) {
      setErrorMessage(`Заполните поля: ${missingFields.join(", ")}`);
      return;
    }

    if (!token) {
      setErrorMessage("Токен не найден.");
      return;
    }

    let createdProduct;
    try {
      createdProduct = await dispatch(AsyncProductSlice({ token, productData })).unwrap();
    } catch (err) {
      setErrorMessage("Ошибка при создании продукта.");
      return;
    }

    const productId = createdProduct?.id;
    if (!productId) {
      setErrorMessage("Не удалось получить ID нового продукта.");
      return;
    }

    const {
      description,
      subjectColors,
      subjectSizes,
      stock,
      availableForPreorder,
      videoReview,
    } = productDetails;

    const missingDetails = [];
    if (!description) missingDetails.push("description");
    if (!localImages?.length) missingDetails.push("images");
    if (!subjectColors?.length) missingDetails.push("subjectColors");
    if (!subjectSizes?.length) missingDetails.push("subjectSizes");
    if (stock === undefined || stock === null) missingDetails.push("stock");
    if (availableForPreorder === undefined) missingDetails.push("availableForPreorder");

    if (missingDetails.length > 0) {
      setErrorMessage(`Заполните поля деталей: ${missingDetails.join(", ")}`);
      return;
    }

    const fullDetails = {
      productId,
      description,
      images: localImages,
      subjectSizes,
      subjectColors,
      stock,
      videoReview,
      availableForPreorder,
    };

    try {
      await dispatch(AsyncProductDetailsSlice({ token, productDetails: fullDetails })).unwrap();
    } catch (err) {
      setErrorMessage("Ошибка при создании деталей продукта.");
      return;
    }

    dispatch(resetProduct());
    dispatch(resetProductDetails());
    setLocalImages([]);
    setMenuForCreateItem(false);
    setErrorMessage("");
  };

  useEffect(() => {
    dispatch(AsyncGettingProductSlice());
  }, []);

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
            token={token}
            setLocalImages={setLocalImages}
            localImages={localImages}
          />
          <GetAllProducts />
        </div>
      </div>
    </div>
  );
}
