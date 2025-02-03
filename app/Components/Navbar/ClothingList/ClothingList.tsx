import React, { useState } from "react";
import styles from "./ClothingList.module.css";
import Link from "next/link";

type ProductCategories = {
  [key: string]: string[];
};

export default function ClothingList() {
  const productCategories: ProductCategories = {
    clothing: [
      "t-shirts", "blouses", "shirts", "hoodies", "sweatshirts", "tank tops",
      "jeans", "shorts", "trousers", "pants", "skirts", "leggings",
      "casual dresses", "cocktail dresses", "maxi dresses", "mini dresses",
      "formal gowns", "coats", "jackets", "blazers", "parkas", "vests",
      "sports bras", "yoga pants", "tracksuits", "athletic shorts",
      "pajamas", "nightgowns", "robes",
    ],
    underwear: ["bras", "panties", "boxers", "briefs", "lingerie"],
    shoes: ["sneakers", "boots", "sandals", "heels", "flats"],
    accessories: ["hats", "scarves", "belts", "gloves", "bags"],
    swimwear: ["bikinis", "swimsuits", "swim trunks"],
  };

  const [showCategories, setShowCategories] = useState(false);

  
  return (
    <div className={styles.menuContainer}>
      <button className={styles.mainButton} onClick={() => setShowCategories((prev) => !prev)}>
      Categories
      </button>
      {showCategories && (
        <div className={styles.categoriesList}>
          {Object.keys(productCategories).map((category) => (
            <div key={category} className={styles.categoryBox}>
              <div className={styles.categoryTitle}>
                {category === "clothing" && "👕 Clothing"}
                {category === "underwear" && "🩲 Underwear"}
                {category === "shoes" && "🥾 Shoes"}
                {category === "accessories" && "👜 Accessories"}
                {category === "swimwear" && "🩱 Swimwear"}
              </div>
              <div className={styles.productList}>
                {productCategories[category].map((item, index) => (
                  <Link key={index} href={`/productType/${item}`} className={styles.productItem}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
