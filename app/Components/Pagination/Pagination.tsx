import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={'←'}
      nextLabel={'→'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      previousClassName={styles.navBtn}
      nextClassName={styles.navBtn}
    />
  );
};

export default Pagination;
