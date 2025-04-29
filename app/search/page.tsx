"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import styles from "./SearchAllResaults.module.css";
import { useAppDispatch, useAppSelector } from '../store/store';
import { AsyncSearchAnythingSlice, setChooseWhichArr, setCurrentPage } from '../store/Slices/SearchAnythingSlice';
import { useEffect, useState } from 'react';
import FilterSearchedProduct from '../Components/FilterSearchedProduct/FilterSearchedProduct';
import Pagination from '../Components/Pagination/Pagination';


export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { someSearchResults } = useAppSelector(state => state.SearchAnythingSlice);

  const [hasSearched, setHasSearched] = useState(false);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(AsyncSearchAnythingSlice({ searchQuery: query, page : 1}));
  };
  useEffect(() => {
    if (query && query.trim().length > 2 && !hasSearched) {
      console.log("Делаем запрос при загрузке страницы", query);
      dispatch(setChooseWhichArr("all"));
      dispatch(AsyncSearchAnythingSlice({ searchQuery: query, page : 1 }));
      setHasSearched(true);
    }
  }, []);

  return (
    <div>
      <h1>Результаты поиска для: {query}</h1>
      <FilterSearchedProduct/>
      <div className={styles.Main}>
        <div className={styles.colum}>
          <div className={styles.row}>
            {someSearchResults?.products?.length ? (
              someSearchResults.products.map((el) => (
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
          </div>
        </div>
      </div>
      <Pagination
    pageCount={someSearchResults?.totalPages ?? 1}
    onPageChange={handlePageChange}
/>

    </div>
  );
}
