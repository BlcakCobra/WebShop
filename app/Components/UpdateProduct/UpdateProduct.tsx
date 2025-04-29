"use client"
import React from 'react'
import OtherParametrs from '../otherParametrs/OtherParametrs';
import ImportImageInput from '../ImportImageInput/ImportImageInput';

import { selectSex,selectClothsType,selectColor,selectClothsSize,setDescription ,setPrice,AsyncUpdateProductSlice, updateImage} from '../../store/Slices/updateProductSlice';
import styles from "./UpdateProduct.module.css"
import { useAppDispatch, useAppSelector } from '../../store/store';
import { ProductType } from '../../types/ProductSliceType';
import { UpdateProductType } from '../../types/ComponentsType';



export default function UpdateProduct({id}:UpdateProductType) {
  const {image} = useAppSelector(state => state.ProductSlice.product)

    const dispatch = useAppDispatch();
    const {loading,error,updatedProduct} = useAppSelector(state => state.updateProductSlice)

  const [menuForUpdateeItem, setMenuForUpdateeItem] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");


      const closeMenuForUpdateItem = () => {
        setMenuForUpdateeItem(false);
        setErrorMessage("");
      };

          const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                if (reader.result) {
                  dispatch(updateImage(reader.result as string));
                }
              };
              reader.readAsDataURL(file);
            }
          };
          
        

  const handleSubmit = () => {
    if (!updatedProduct) {
      setErrorMessage("Данные продукта отсутствуют.");
      return;
    }

    const requiredFields: (keyof ProductType)[] = ["sex", "type", "price", "stock", "description"];
    const missingFields = requiredFields.filter((field) => !updatedProduct?.[field]);

    if (missingFields.length > 0) {
      setErrorMessage(`Заполните поля: ${missingFields.join(", ")}.`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Токен не найден.");
      return;
    }

    dispatch(AsyncUpdateProductSlice({ token,id, updatedProduct }));
    setMenuForUpdateeItem(false); 
    setErrorMessage(""); 
  };

  const handleChange =
  (setStateFunc: any) =>
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    dispatch(setStateFunc(e.target.value));
  };


  return (
    <>
    <button onClick={menuForUpdateeItem} disabled={loading} className={styles.DeleteBut}>
      {loading ? 'Deleting...' : 'Delete'}
    </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
     {menuForUpdateeItem}
      <>
        <div className={styles.overlay} onClick={closeMenuForUpdateItem}></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit()
          }}
        >
          <div className={styles.updateItem}>
            <button
              type="button"
              className={styles.closeMenu}
              onClick={closeMenuForUpdateItem}
            >
              ×
            </button>
            <h2>Update Product</h2>
            <p>Update details for updated Product</p>
            <ImportImageInput handleImageUpload={handleImageUpload} image={image}/>
            <OtherParametrs
              handleChangeSexValue={handleChange(selectSex)}
              handleChangeClothingTypeValue={handleChange(selectClothsType)}
              handlePickColor={handleChange(selectColor)}
              handleChangeClothingTypeSize={handleChange(selectClothsSize)}
              handleDescriptionChange={handleChange(setDescription)}
              handleChangePrice={handleChange(setPrice)}
              handleChangeStock={handleChange(setStock)}
            />
          </div>
        </form>
      </>
  </>
  )
}

