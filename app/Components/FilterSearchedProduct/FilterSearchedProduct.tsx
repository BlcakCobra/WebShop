"use client";
import React, { useEffect, useState } from "react";
import style from "./filterSearchedProduct.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  setSortValue,
  setSex,
  setPriceFrom,
  setPriceTo,
  setDiscount,
  setType,
  setRating,
  resetFilters,
  AsyncSearchResultFilterSlice,
} from "../../store/Slices/SearchResaultFilterSlice";
import { ClothingType, SexType } from "../../types/ProductSliceType";
import {SearchFilterParams,SortOption} from "./../../types/SearchFilterType"


export default function FilterSearchedProduct() {
  const {
    priceFrom,
    priceTo,
    sex,
    filterdResault,
    sort,
    type,
    rating,
    discount,
  } = useAppSelector((state) => state.FilterSearchedProductSlice);
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

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
        if(searchQuery || sort || priceFrom || priceTo || sex || discount || type || rating)

dispatch(
  AsyncSearchResultFilterSlice({
    searchQuery,
    sort,
    priceFrom,
    priceTo,
    sex,
    discount: discount !== undefined ? String(discount) as "true" | "false" : undefined,
    type,
    rating,
  } as SearchFilterParams)
);
    }, 300); 
    return () => clearTimeout(delayDebounce); 
  }, [priceFrom, priceTo, sex, sort, discount, type, rating, searchQuery]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortValue(e.target.value as SortOption));
  };

  const handlePriceFromKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setPriceFrom(Number((e.target as HTMLInputElement).value)));
    }
  };

  const handlePriceToKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setPriceTo(Number((e.target as HTMLInputElement).value)));
    }
  };
  console.log(filterdResault);
  
  return (
    <form>
      <div className={style.SearchFilterMenu}>
        <div className={style.priceFT}>
          <input
            type="number"
            value={priceFrom}
            onChange={(e) => dispatch(setPriceFrom(Number(e.target.value)))}
            onKeyDown={handlePriceFromKeyDown}
            placeholder="Price From $"
          />
          <input
            type="number"
            value={priceTo}
            onChange={(e) => dispatch(setPriceTo(Number(e.target.value)))}
            onKeyDown={handlePriceToKeyDown}
            placeholder="Price To $"
          />
        </div>

        <div className={style.sortByX}>
          <button type="button" onClick={() => dispatch(setSortValue("newest"))}>
            Newest
          </button>
          <button type="button" onClick={() => dispatch(setSortValue("oldest"))}>
            Oldest
          </button>
          <button type="button" onClick={() => dispatch(setSortValue("rating_desc"))}>
            Rating Desc
          </button>
          <button type="button" onClick={() => dispatch(setSortValue("price_desc"))}>
            Price Desc
          </button>
          <button type="button" onClick={() => dispatch(setSortValue("price_asc"))}>
            Price Asc
          </button>
        </div>

        <select
          value={sex}
          onChange={(e) => dispatch(setSex(e.target.value as SexType))}
          className={style.formInput}
        >
          <option value="">Select sex</option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={type}
          onChange={(e) => dispatch(setType(e.target.value as ClothingType))}
          className={style.formInput}
        >
          <option value="">Select type</option>
          {clothingTypes.map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </select>

        <label className={style.formCheckbox}>
          <input
            type="checkbox"
            checked={discount}
            onChange={(e) => dispatch(setDiscount(e.target.checked))}
          />
          Discount only
        </label>

        <select
          value={rating}
          onChange={(e) => dispatch(setRating(Number(e.target.value)))}
          className={style.formInput}
        >
          <option value={0}>Select rating</option>
          <option value={1}>1⭐ and more</option>
          <option value={2}>2⭐ and more</option>
          <option value={3}>3⭐ and more</option>
          <option value={4}>4⭐ and more</option>
          <option value={5}>5⭐</option>
        </select>

        <button
          type="button"
          onClick={() => dispatch(resetFilters())}
          className={style.resetButton}
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
}
