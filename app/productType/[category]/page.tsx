"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { AsyncProductsWithSpecificTypeSlice } from "../../store/Slices/ProductsWithSpecificTypeSlice";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import styles from "./ProductCategoryPage.module.css";

export default function Page() {
    const params = useParams();
    const category = params?.category ? String(params.category) : "";
    const dispatch = useAppDispatch();
    const { sortByTypeList, loading, error } = useAppSelector((state) => state.ProductsWithSpecificType);
    const router = useRouter();

    useEffect(() => {
        if (category) {
            dispatch(AsyncProductsWithSpecificTypeSlice(category));
        }
    }, [category]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div className={styles.Main}>
            <div className={styles.colum}>
                <div className={styles.row}>
                    {Array.isArray(sortByTypeList) && sortByTypeList.length > 0 ? (
                        sortByTypeList.map((el) => (
                            <div key={el._id} className={styles.ProductBox} onClick={() => router.push(`/productPage/${el._id}`)}>
                                <img className={styles.ProductImage} src={el.image} alt="Product" />
                                <div className={styles.ProductInfo}>
                                    <div className={styles.ProductPrice}>${el.price}</div>
                                    <div>{el.name}</div>
                                    <div className={styles.ProductRating}>Rating: {el.rating} ⭐</div>
                                    <div className={styles.ProductDetails}>For: {el.sex}</div>
                                    <div className={styles.ProductDetails}>Size: {el.size}</div>
                                    <div className={styles.ProductColor} style={{ backgroundColor: el.color }}></div>
                                    <div className={styles.ProductDetails}>Type: {el.type}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
