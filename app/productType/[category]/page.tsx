"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { AsyncProductsWithSpecificTypeSlice } from "../../store/Slices/ProductsWithSpecificTypeSlice";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import styles from "./ProductCategoryPage.module.css";
import MapForProducts from "../../Components/MapForProducts/MapForProducts";

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
                    <MapForProducts productsList={sortByTypeList}/>
                </div>
            </div>
        </div>
    );
}
