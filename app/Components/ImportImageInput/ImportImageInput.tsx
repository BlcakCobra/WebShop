import React from 'react'
import styles from "./ImportImageInput.module.css"
import { useAppSelector } from '../../store/store'
import { ImportImageInputType } from '../../types/ComponentsType'

const ImportImageInput:React.FC<ImportImageInputType> = ({handleImageUpload,errorMessage}) => {
  const product = useAppSelector((state) => state.ProductSlice).product;
  
  const image = product?.image || "";

  return (
    <div className={styles.importImageBox}>
      {image ? (
        <img src={image} alt="Product" className={styles.previewImage} />
      ) : (
        <p>No image uploaded</p>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.fileInput}
      />
      </div>
  );
}
export default ImportImageInput