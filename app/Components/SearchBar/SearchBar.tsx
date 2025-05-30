'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from "./SearchBar.module.css";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  applySearchLimit,
  AsyncSearchAnythingSlice,
  resetSearchQuery,
  setChooseWhichArr,
  setSearchQuery
} from '../../store/Slices/SearchAnythingSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  const { searchQuery, someSearchResults } = useAppSelector(state => state.SearchAnythingSlice);
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef<HTMLFormElement>(null);

  console.log(someSearchResults);
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

useEffect(() => {
  const trimmed = searchQuery.trim();

  const delayDebounce = setTimeout(() => {
    if (trimmed.length > 2 && pathname !== "/search") {
      dispatch(setChooseWhichArr("five"));
      dispatch(AsyncSearchAnythingSlice({ searchQuery: trimmed, page: 1 }))
        .then(() => {
          dispatch(applySearchLimit());
          setShowDropdown(true);
        });
    } else {
      setShowDropdown(false);
    }
  }, 400);

  return () => clearTimeout(delayDebounce); 
}, [searchQuery, pathname]);


  useEffect(() => {
    const trimmed = searchQuery.trim();
  
    const delayDebounce = setTimeout(() => {
      if (trimmed.length > 2 && pathname !== "/search") {
        dispatch(setChooseWhichArr("five"));
        dispatch(AsyncSearchAnythingSlice({ searchQuery: trimmed, page: 1 }))
          .then(() => {
            dispatch(applySearchLimit());
            setShowDropdown(true);
          });
      } else {
        setShowDropdown(false);
      }
    }, 400);
  
    return () => clearTimeout(delayDebounce); 
  }, [searchQuery]);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 2) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit} ref={wrapperRef}>
      <div className={styles.SearchRow}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className={styles.SearchBar}
          placeholder="🔍  Search"
        />
      </div>

      {showDropdown  && someSearchResults && someSearchResults?.products?.length > 0 && (
        <div className={styles.FoundProducts}>
          {someSearchResults.products.map((el) => (
            <div
              className={styles.ProductBox}
              key={el._id}
              onClick={() => {
                router.push(`/productPage/${el._id}`);
                setShowDropdown(false); 
              }}
            >
              <img src={el.image} alt={el.name} className={styles.ProductImage} />
              <div className={styles.ProductInfo}>
                <div className={styles.ProductName}>{el.name}</div>
                <div className={styles.ProductPrice}>${el.price.toFixed(2)}</div>
                <div className={styles.ProductType}>{el.type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
