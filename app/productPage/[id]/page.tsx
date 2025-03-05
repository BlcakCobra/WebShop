"use client"
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useParams } from 'next/navigation';
import { AsyncGetProductById } from "../../store/Slices/GetProductByIdSlice";
import style from "./productPage.module.css";

export default function Page() {
    const params = useParams();
    const id = params?.id ? String(params.id) : "";
    const { product, loading, error } = useAppSelector((state) => state.GetProductByIdSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(AsyncGetProductById({ id }));
        }
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!product) return <p>Товар не найден</p>;

    return (
       <>{id}</>
    );
}
