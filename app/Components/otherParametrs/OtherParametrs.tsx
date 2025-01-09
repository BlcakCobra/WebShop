import React, { useEffect } from 'react';
import styles from "./OtherParametrs.module.css";
import { useAppDispatch, useAppSelector } from '../../store/store';
import { OtherParametrsTypes } from '../../types/ComponentsType';
import { AsyncProductSlice } from '../../store/Slices/CreateProductSlice';

const OtherParametrs: React.FC<OtherParametrsTypes> = ({ handleChangeSexValue, handleChangeClothingTypeValue,handleChangeStock, handleChangeClothingTypeSize,handlePickColor ,handleDescriptionChange,handleChangePrice}) => {
  const product = useAppSelector((state) => state.ProductSlice.product);

  const sex = product?.sex || "";
  const type = product?.type || "";
  const image = product?.image || "";
  const color = product?.color || "";
  const description = product?.description || "";
  const size = product?.size || "";
  const price = product?.price || "";
  const stock = product?.stock || "";
  const discount = product?.discount || "";
  const rating = product?.rating || 0;
  const views = product?.views || 0;

  const {isAdmin} = useAppSelector(state => state.login)

  const dispath = useAppDispatch()

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
  const clothingSize = ["S", "M", "L", "XL", "XXL" ]

  const token = localStorage.getItem("token")


  
  useEffect(() => {
    if (isAdmin && token && sex && type && price && stock && size && color) {
      const productData = {
        sex,
        type,
        image,
        color,
        description: description || "No description provided",
        size,
        price,
        stock,
        createdAt: new Date().toISOString(),
        discount: discount || 0,
        rating: rating || 0,
        views: views || 0,
      };
      dispath(AsyncProductSlice({ token, productData }));
    } else {
      console.warn("Product data is incomplete:", { sex, type, price, stock, size, color, description });
    }
  }, []);
  
  
  return (
    <div className={styles.otherParametrs}>
      
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

      <div className={styles.descriptionContainer}>
         <label htmlFor="productDescription" className={styles.descriptionLabel}>
           Product Description
          </label>
          <textarea
          id="productDescription"
          value={description}
          onChange={handleDescriptionChange}
          className={styles.descriptionInput}
          placeholder="Enter product description here..."
          rows={5} 
          minLength={10}
          maxLength={150}
      ></textarea>
      </div>
        <div className={styles.InputBox}>

    <input
      type="text"
      value={price}
      onChange={handleChangePrice} 
      className={styles.SecondformInput}
      placeholder='Price'
    />
        <input
      type="text"
      value={stock}
      onChange={handleChangeStock} 
      className={styles.SecondformInput}
      placeholder='Stock'
    />
        </div>
    <button className={styles.AddProduct} type="submit">Add Product</button>
    </div>
  );
};

export default OtherParametrs;
