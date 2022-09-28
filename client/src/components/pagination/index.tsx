import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import React from 'react';


type PaginationPage = {
  currentPage:number;
  onChangePage:(page: number) => void;
}
const Pagination: React.FC<PaginationPage>= ({currentPage, onChangePage}) => {

    return ( <>
     <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel="<"
      />
    </> );
}
 
export default Pagination;