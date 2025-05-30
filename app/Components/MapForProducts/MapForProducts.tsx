import React from 'react'
import styles from "./MapForProducts.module.css"
import {  useRouter } from 'next/navigation';
import { MapForProductsType } from '../../types/ComponentsType';
import { ProductType } from '../../types/ProductSliceType';

 const MapForProducts:React.FC<MapForProductsType> = ({productsList}) => {
      const router = useRouter();
      
  return (
           <>
            {productsList?.length ? (
              (productsList).map((el:ProductType) => (
                <div key={el._id} className={styles.ProductBox} onClick={() => router.push(`/productPage/${el._id}`)}>
                  <img className={styles.ProductImage} src={el.image} alt="Product" />
                  <div className={styles.ProductInfo}>
                    <div className={styles.ProductPrice}>${el.price}</div>
                    <div>{el.name}</div>
                    <div className={styles.ProductRating}>Rating: {el.rating} ⭐</div>
                    <div className={styles.ProductDetails}>For: {el.sex}</div>
                    <div className={styles.ProductDetails}>Size: {el.size}</div>
                    <div className={styles.ProductColor} style={{ backgroundColor: el.color }}></div>
                    <div className={styles.ProductDetails}>Type: {el.type}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>Нет результатов</p>
            )}
           </>
  )
}
export default MapForProducts