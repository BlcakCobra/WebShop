"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { AsyncProductsWithSpecificTypeSlice } from "../../store/Slices/ProductsWithSpecificTypeSlice";
import { useParams } from "next/navigation";

import styles from "./ProductCategoryPage.module.css"
export default function Page() {
    const params = useParams();
    const category = params?.category as string;
    const dispatch = useAppDispatch();
    const { sortByTypeList, loading, error } = useAppSelector((state) => state.ProductsWithSpecificType);

    useEffect(() => {
        dispatch(AsyncProductsWithSpecificTypeSlice(category));
    }, []);
    
    console.log(sortByTypeList);

    return (
    <div className={styles.Main}>
        <div className={styles.colum}>
        <div className={styles.row}>


            {sortByTypeList
                ? sortByTypeList.map((el) => (
                      <div key={el._id} className={styles.ProductBox}>
                          <img
                              className={styles.ProductImage}
                              src={el.image}
                              alt="Product"
                          />
                          <div className={styles.ProductInfo}>
                              <div className={styles.ProductPrice}>${el.price}</div>
                              <div className={styles.ProductRating}>
                                  Rating: {el.rating} ⭐
                              </div>
                              <div className={styles.ProductDetails}>For: {el.sex}</div>
                              <div className={styles.ProductDetails}>Size: {el.size}</div>
                              <div
                                  className={styles.ProductColor}
                                  style={{ backgroundColor: el.color }}
                              ></div>

                              <div className={styles.ProductDetails}>{el.description}</div>
                              <div className={styles.ProductDetails}>Type: {el.type}</div>
                          </div>
                      </div>
                  ))
                : <p>No products available</p>}
      </div>
      </div>
      </div>
    );
}
