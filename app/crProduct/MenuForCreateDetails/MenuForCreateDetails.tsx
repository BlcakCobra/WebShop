import React from "react";
import styles from "./MenuForCreateDetails.module.css";
import { imagesSite } from "../../Images/images";
import { MenuForCreateDetailType } from "../../types/ComponentsType";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  selectStockDet,
  selectSubjectColorsDet,
  selectSubjectSizesDet,
  setDescription,
  setVideoRew,
  setAvailableForPreorder,
} from "../../store/Slices/CreateProductDetailsSlice";
import MultiSelectExample from "./MultiSelectExample/MultiSelectExample/MultiSelectExample";
import { ClothingSize } from "../../types/ProductSliceType";
import { ColorForDetails } from "../../types/ProductDetails";
import SelectFewImages from "./SelectFewImages/SelectFewImages";

const MenuForCreateDetail: React.FC<MenuForCreateDetailType> = ({
  setFlipped,
  closeMenuForCreateItem,
  setLocalImages,
  localImages
}) => {
  const dispatch = useAppDispatch();


  const handleImagesUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);

    const allFiles = [...localImages, ...newFiles].slice(0, 5);
    setLocalImages(prev => prev = allFiles);
  };


  const colors = [
    "Black", "White", "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink",
    "Brown", "Gray", "Beige", "Cyan", "Magenta", "Lime", "Olive", "Navy", "Teal",
    "Maroon", "Gold", "Silver", "Turquoise", "Coral", "Indigo", "Violet"
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const { description, subjectColors, subjectSizes, stock, availableForPreorder, videoReview } =
    useAppSelector((state) => state.CreateProductDetailsSlice.productDetails);

  return (
    <div className={styles.back}>
      <button
        type="button"
        className={styles.closeMenu}
        onClick={closeMenuForCreateItem}
      >
        ×
      </button>

      <h2>Product Details</h2>
      <p>Here you can add more details...</p>
      <div className={styles.formGroup}>
        <SelectFewImages
          images={localImages}
          handleImagesUpload={(e) => handleImagesUpload(e.target.files)}
        />

        <textarea
          id="description"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          name="description"
          placeholder="Enter product description..."
          rows={5}
          className={styles.description}
        />

        <input
          type="number"
          value={stock}
          placeholder="stock"
          onChange={(e) => dispatch(selectStockDet(Number(e.target.value)))}
          className={styles.input}
        />

        <input
          type="text"
          value={videoReview}
          placeholder="videoReview"
          onChange={(e) => dispatch(setVideoRew(e.target.value))}
          className={styles.input}
        />

        <MultiSelectExample
          options={colors}
          value={subjectColors}
          onChange={(newColors) =>
            dispatch(
              selectSubjectColorsDet(
                newColors.filter((color): color is ColorForDetails[number] =>
                  colors.includes(color)
                )
              )
            )
          }
          label="Choose Colors"
        />

        <MultiSelectExample
          options={sizes}
          value={subjectSizes}
          onChange={(newSizes) =>
            dispatch(
              selectSubjectSizesDet(
                newSizes.filter((size): size is ClothingSize =>
                  sizes.includes(size)
                )
              )
            )
          }
          label="Choose Sizes"
        />

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            name="availableForPreorder"
            checked={availableForPreorder}
            onChange={(e) => dispatch(setAvailableForPreorder(e.target.checked))}
            className={styles.checkbox}
          />
          <label htmlFor="availableForPreorder">Available For Preorder</label>
        </div>
      </div>

      <button
        type="button"
        className={styles.flipButton}
        onClick={() => setFlipped(false)}
      >
        <img
          src={imagesSite.arrowLeft.src}
          alt="arrowLeft"
          className={styles.arrowLeft}
        />
      </button>
    </div>
  );
};

export default MenuForCreateDetail;
