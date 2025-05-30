"use client";

import React, { useEffect } from "react";
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
import {
  SearchFilterParams,
  SortOption,
} from "./../../types/SearchFilterType";

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

  const clothingTypes: ClothingType[] = [
    "t-shirts", "blouses", "shirts", "hoodies", "sweatshirts", "tank tops",
    "jeans", "shorts", "trousers", "pants", "skirts", "leggings",
    "casual dresses", "cocktail dresses", "maxi dresses", "mini dresses",
    "formal gowns", "coats", "jackets", "blazers", "parkas", "vests",
    "bras", "panties", "boxers", "briefs", "lingerie", "sneakers",
    "boots", "sandals", "heels", "flats", "hats", "scarves", "belts",
    "gloves", "bags", "sports bras", "yoga pants", "tracksuits",
    "athletic shorts", "pajamas", "nightgowns", "robes", "bikinis",
    "swimsuits", "swim trunks",
  ];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const shouldRequest =
        sort !== "" ||
        priceFrom > 0 ||
        priceTo > 0 ||
        sex !== "" ||
        discount === true ||
        type !== "" ||
        rating > 0;

      if (shouldRequest) {
        dispatch(
          AsyncSearchResultFilterSlice({
            sort,
            priceFrom,
            priceTo,
            sex,
            discount:
              discount !== undefined
                ? String(discount) as "true" | "false"
                : undefined,
            type,
            rating,
          } as SearchFilterParams)
        );
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [priceFrom, priceTo, sex, sort, discount, type, rating]);

  const handleSortChange = (value: SortOption) => {
    dispatch(setSortValue(value));
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "from" | "to"
  ) => {
    const value = e.target.value;
    const number = value === "" ? 0 : Math.max(0, Number(value));
    if (type === "from") dispatch(setPriceFrom(number));
    else dispatch(setPriceTo(number));
  };

  const handlePriceKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: "from" | "to"
  ) => {
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement;
      const number = input.value === "" ? 0 : Math.max(0, Number(input.value));
      if (type === "from") dispatch(setPriceFrom(number));
      else dispatch(setPriceTo(number));
    }
  };
  
  return (    
    <form>
      <div className={style.SearchFilterMenu}>
        <div className={style.priceFT}>
          <input
            type="number"
            value={priceFrom}
            min={0}
            onChange={(e) => handlePriceChange(e, "from")}
            onKeyDown={(e) => handlePriceKeyDown(e, "from")}
            placeholder="Price From $"
          />
          <input
            type="number"
            value={priceTo}
            min={0}
            onChange={(e) => handlePriceChange(e, "to")}
            onKeyDown={(e) => handlePriceKeyDown(e, "to")}
            placeholder="Price To $"
          />
        </div>

        <div className={style.sortByX}>
          {["newest", "oldest", "rating_desc", "price_desc", "price_asc"].map(
            (option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSortChange(option as SortOption)}
                className={
                  sort === option ? style.activeSortButton : undefined
                }
              >
                {option.replace("_", " ").toUpperCase()}
              </button>
            )
          )}
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
