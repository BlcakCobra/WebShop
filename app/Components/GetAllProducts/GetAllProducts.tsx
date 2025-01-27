import React, { useEffect } from "react";
import styles from "./GetAllProducts.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { AsyncGettingProductSlice } from "../../store/Slices/GettingProductSlice";
import DeleteProductButton from "../DeleteProductButton/DeleteProductButton";
import UpdateProduct from "../UpdateProduct/UpdateProduct";

export default function GetAllProducts() {
    const { products } = useAppSelector((state) => state.gettingProductSlice);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(AsyncGettingProductSlice());
    }, []);
    console.log(products);
    
    

    return (
        <>
        {products
                ? products.map((el) => (
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
                              <DeleteProductButton
                              id={el._id}
                              />
                              {/* <UpdateProduct
                              id={el._id}
                              /> */}
                          </div>
                      </div>
                  ))
                : <p>No products available</p>}
        </>
    );
}
