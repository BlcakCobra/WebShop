"use client"
import React, { useEffect } from 'react';
import styles from "./OtherParametrs.module.css";
import { useAppDispatch, useAppSelector } from '../../store/store';
import { OtherParametrsTypes } from '../../types/ComponentsType';
import { AsyncProductSlice } from '../../store/Slices/CreateProductSlice';

const OtherParametrs: React.FC<OtherParametrsTypes> = ({ 
  handleChangeSexValue,
  handleChangeName, 
  handleChangeClothingTypeValue, 
  handleChangeClothingTypeSize,
  handlePickColor,
  handleChangePrice
}) => {
  const product = useAppSelector((state) => state.ProductSlice.product);
  
  const name = product?.name || "";
  const sex = product?.sex || "";
  const type = product?.type || "";
  const image = product?.image || "";
  const color = product?.color || "";
  const size = product?.size || "";
  const price = product?.price || "";
  const discount = product?.discount || "";
  const rating = product?.rating || 0;
  const views = product?.views || 0;

  const { isAdmin } = useAppSelector(state => state.login);

  const dispatch = useAppDispatch();

  const clothingTypes = [
    "t-shirts", "blouses", "shirts", "hoodies", "sweatshirts", "tank tops", 
    "jeans", "shorts", "trousers", "pants", "skirts", "leggings", 
    "casual dresses", "cocktail dresses", "maxi dresses", "mini dresses", 
    "formal gowns", "coats", "jackets", "blazers", "parkas", "vests", 
    "bras", "panties", "boxers", "briefs", "lingerie", "sneakers", 
    "boots", "sandals", "heels", "flats", "hats", "scarves", "belts", 
    "gloves", "bags", "sports bras", "yoga pants", "tracksuits", 
    "athletic shorts", "pajamas", "nightgowns", "robes", "bikinis", 
    "swimsuits", "swim trunks"
  ];
  const clothingSize = ["S", "M", "L", "XL", "XXL" ];

  const token = localStorage.getItem("token");

  const handleAddProduct = () => {
    if (!isAdmin || !token || !sex || !type || !price || !size || !color) {
      console.warn("Product data is incomplete:", { sex, type, price, size, color });
      return;
    }
  
    const productData = {
      name,
      sex,
      type,
      image,
      color,
      size,
      price,
      discount: discount || 0,
      rating: rating || 0,
      views: views || 0,
    };
  
    dispatch(AsyncProductSlice({ token, productData }));
    console.log("Add Prod");
  };
  useEffect(() =>{
    console.log("123");
  },[])
  return (
    <div className={styles.otherParametrs}>
      <input
        type="text"
        value={name}
        onChange={handleChangeName} 
        className={styles.SecondformInput}
        placeholder="Name"
      />
      <select
        value={sex}
        onChange={handleChangeSexValue}
        className={styles.formInput}
      >
        <option value="">Select sex</option>
        <option value="Man">Man</option>
        <option value="Woman">Woman</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={type}
        onChange={handleChangeClothingTypeValue}
        className={styles.formInput}
      >
        <option value="">Select type</option>
        {clothingTypes.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>

      <select
        value={size}
        onChange={handleChangeClothingTypeSize}
        className={styles.formInput}
      >
        <option value="">Select size</option>
        {clothingSize.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>

      <input
        type="color"
        value={color || "#000000"}
        onChange={handlePickColor}
        className={styles.formInput}
      />

      <div className={styles.InputBox}>
        <input
          type="text"
          value={price}
          onChange={handleChangePrice}
          className={styles.SecondformInput}
          placeholder="Price"
        />
      </div>

      <button className={styles.AddProduct} type="submit" >
        Add Product
      </button>
    </div>
  );
};

export default OtherParametrs;
