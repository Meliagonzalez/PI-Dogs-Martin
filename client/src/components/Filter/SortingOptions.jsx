import React from "react";
import styles from "./SortingOptions.module.css";

const SortingOptions = ({ onSortChange }) => {
  const handleSortChange = (event) => {
    const [field, order] = event.target.value.split("-");
    onSortChange(field, order);
  };

  return (
    <div className={styles.sortingOptions}>
      <label className={styles.label}>Sort by:</label>
      <select className={styles.select} onChange={handleSortChange}>
        <option value="name-asc">A-Z</option>
        <option value="name-desc">Z-A</option>
        <option value="weight-asc">Weight Ascending</option>
        <option value="weight-desc">Weight Descending</option>
      </select>
    </div>
  );
};

export default SortingOptions;
