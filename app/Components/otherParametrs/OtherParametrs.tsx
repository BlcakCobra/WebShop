"use client"
import React, { useEffect } from 'react';
import styles from "./OtherParametrs.module.css";
import {  useAppSelector } from '../../store/store';
import { OtherParametrsTypes } from '../../types/ComponentsType';

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
  const color = product?.color || "";
  const size = product?.size || "";
  const price = product?.price || "";

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
