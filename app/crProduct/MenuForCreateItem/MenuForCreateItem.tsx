import React from "react";
import ImportImageInput from "../../Components/ImportImageInput/ImportImageInput";
import OtherParametrs from "../../Components/otherParametrs/OtherParametrs";
import {MenuForCreateItemProps} from "../../types/MenuForCreateItem"
import styles from "./MenuForCreateItem.module.css";
import {
  updateImage,
  selectSex,
  selectClothsType,
  selectColor,
  selectClothsSize,
  setDescription,
  setPrice,
  setStock,
} from "../../store/Slices/CreateProductSlice";
import { useAppDispatch } from "../../store/store";



export default function MenuForCreateItem({
  menuForCreateItem,
  setMenuForCreateItem,
  setErrorMessage,
  handleSubmit,
}: MenuForCreateItemProps) {
  const dispatch = useAppDispatch();

  const closeMenuForCreateItem = () => {
    setMenuForCreateItem(false);
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

  const handleChange =
    (setStateFunc: any) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      dispatch(setStateFunc(e.target.value));
    };

  return (
    <>
      {menuForCreateItem && (
        <>
          <div className={styles.overlay} onClick={closeMenuForCreateItem}></div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit()
            }}
          >
            <div className={styles.createItemMenu}>
              <button
                type="button"
                className={styles.closeMenu}
                onClick={closeMenuForCreateItem}
              >
                ×
              </button>
              <h2>Create Product</h2>
              <p>Add details for new Product</p>
              <ImportImageInput handleImageUpload={handleImageUpload} errorMessage={""} />
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
      )}
    </>
  );
}
