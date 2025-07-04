"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import styles from "./SearchAllResaults.module.css";
import { useAppDispatch, useAppSelector } from '../store/store';
import { AsyncSearchAnythingSlice, setChooseWhichArr, setCurrentPage } from '../store/Slices/SearchAnythingSlice';
import { useEffect, useState } from 'react';
import FilterSearchedProduct from '../Components/FilterSearchedProduct/FilterSearchedProduct';
import Pagination from '../Components/Pagination/Pagination';
import MapForProducts from '../Components/MapForProducts/MapForProducts';


export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { someSearchResults,currentPage } = useAppSelector(state => state.SearchAnythingSlice);
  const {filterdResault} = useAppSelector(state => state.FilterSearchedProductSlice)
  const [hasSearched, setHasSearched] = useState(false);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(AsyncSearchAnythingSlice({ searchQuery: query, page }));
  };
  
  
  useEffect(() => {
    if (query && query.trim().length > 2 && !hasSearched) {
      dispatch(setChooseWhichArr("all"));
      dispatch(AsyncSearchAnythingSlice({ searchQuery: query, page : 1 }));
      setHasSearched(true);
    }
  }, []);

const productsToRender = () => {
  if (filterdResault?.products?.length) {
    return filterdResault.products;
  }
  if (someSearchResults?.products?.length) {
    return someSearchResults.products;
  }
  return [];
}
const productsToPagination = () => {
  if (filterdResault?.products?.length) {
    return filterdResault.totalPages;
  }
  if (someSearchResults?.products?.length) {
    return someSearchResults.totalPages;
  }
  return 1;
}
  return (
    <div>
      <h1>Результаты поиска для: {query}</h1>
      <FilterSearchedProduct/>
      <div className={styles.Main}>
        <div className={styles.colum}>
          <div className={styles.row}>
            <MapForProducts productsList={productsToRender()}/>
          </div>
        </div>
      </div>
      <Pagination
    pageCount={productsToPagination() ?? 1}
    onPageChange={handlePageChange}
/>

    </div>
  );
}
