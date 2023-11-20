import React, { useState } from "react";
import styles from "../Filter/OriginFilter.module.css";
import { useDispatch } from "react-redux";
import { originFilter } from "../../Redux/Actions/actions";

const FilterOrigin = ({ onFilterChange }) => {
  const [selectedOrigin, setSelectedOrigin] = useState(""); // Agrega el estado local

  const dispatch = useDispatch();

  const handleOriginChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOrigin(selectedValue); // Almacena la selección en el estado local
    dispatch(originFilter(selectedValue)); // Envía la selección al reducer
    onFilterChange(selectedValue);
  };

  return (
    <div className={styles.filterOriginContainer}>
      <p className={styles.filterLabel}>Filter by Origin:</p>
      <label className={styles.filterOption}>
        <input
          type="radio"
          value="AllOrigins"
          name="origin"
          checked={selectedOrigin === "AllOrigins"}
          onChange={handleOriginChange}
        />
        All
      </label>

      <label className={styles.filterOption}>
        <input
          type="radio"
          value="Database"
          name="origin"
          checked={selectedOrigin === "Database"}
          onChange={handleOriginChange}
        />
        Database
      </label>

      <label className={styles.filterOption}>
        <input
          type="radio"
          value="API"
          name="origin"
          checked={selectedOrigin === "API"}
          onChange={handleOriginChange}
        />
        API
      </label>
    </div>
  );
};

export default FilterOrigin;
