import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  dogsPerPage,
  maxPagesToShow = 5,
}) => {
  const handlePrevClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const generatePageButtons = () => {
    const pageButtons = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`${styles.paginationButton} ${
            currentPage === i ? styles.activePage : ""
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  const startIndex = (currentPage - 1) * dogsPerPage;
  const endIndex = startIndex + dogsPerPage;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={handlePrevClick}
      >
        Prev
      </button>
      <div className={styles.pageButtons}>{generatePageButtons()}</div>
      <button
        className={styles.paginationButton}
        disabled={currentPage === totalPages}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
