import React, { useEffect, useState } from 'react';
import style from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    onSearch(searchTerm)
  }, [searchTerm])

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={style.searchBar}>
      <input
        type="text"
        placeholder="Search by breed name"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
