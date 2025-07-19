import React, { useState } from "react";
import ImportImageInput from "../../Components/ImportImageInput/ImportImageInput";
import OtherParametrs from "../../Components/otherParametrs/OtherParametrs";
import { MenuForCreateItemProps } from "../../types/MenuForCreateItem";
import styles from "./MenuForCreateItem.module.css";
import {
  updateImage,
  selectSex,
  selectName,
  selectClothsType,
  selectColor,
  selectClothsSize,
  setPrice,
} from "../../store/Slices/CreateProductSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { imagesSite } from "../../Images/images";
import MenuForCreateDetail from "../MenuForCreateDetails/MenuForCreateDetails";

export default function MenuForCreateItem({
  menuForCreateItem,
  setMenuForCreateItem,
  setErrorMessage,
  handleSubmit,
  token,
  setLocalImages,
  localImages

}: MenuForCreateItemProps) {
  const dispatch = useAppDispatch();
  const [flipped, setFlipped] = useState(false);
  const { image } = useAppSelector((state) => state.ProductSlice.product);

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
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      dispatch(setStateFunc(e.target.value));
    };

  return (
    <>
      {menuForCreateItem && (
        <>
          <div className={styles.overlay} onClick={closeMenuForCreateItem}></div>
          <div className={styles.container}>
            <div className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
              
              <div className={styles.front}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <button
                    type="button"
                    className={styles.closeMenu}
                    onClick={closeMenuForCreateItem}
                  >
                    ×
                  </button>
                  <h2>Create Product</h2>
                  <p>Add details for new Product</p>
                  <div className={styles.menuContent}>
                    <ImportImageInput
                      handleImageUpload={handleImageUpload}
                      image={image}
                    />
                    <OtherParametrs
                      handleChangeSexValue={handleChange(selectSex)}
                      handleChangeClothingTypeValue={handleChange(selectClothsType)}
                      handlePickColor={handleChange(selectColor)}
                      handleChangeClothingTypeSize={handleChange(selectClothsSize)}
                      handleChangePrice={handleChange(setPrice)}
                      handleChangeName={handleChange(selectName)}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.flipButton}
                    onClick={() => setFlipped(true)}
                  >
                    <img
                      src={imagesSite.arrowRight.src}
                      alt="arrowRight"
                      className={styles.arrowRight}
                    />
                  </button>
                </form>
              </div>

              <MenuForCreateDetail
                setFlipped={setFlipped}
                flipped={flipped}
                closeMenuForCreateItem={closeMenuForCreateItem}
                token={token}
                setLocalImages={setLocalImages}
                localImages={localImages}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
