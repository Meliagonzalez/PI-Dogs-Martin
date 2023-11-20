import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Temperaments } from '../../Redux/Actions/actions';
import styles from './TemperamentFilter.module.css';
const TemperamentFilter = ({ onChange }) => {
  const [selectedTemperament, setSelectedTemperament] = useState('');
  const dispatch = useDispatch();

  const handleTemperamentChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTemperament(selectedValue);
    onChange(selectedValue);
  };

  const temperamentos = useSelector(state => state.temperament);

  useEffect(() => {
    dispatch(Temperaments());
  }, [dispatch]);

  return (
    <div className={styles.sortingOptions}>
      <label className={styles.label}>Filter by Temperament:</label>
      <select className={styles.select} value={selectedTemperament} onChange={handleTemperamentChange}>
        <option value="">All</option>
        {temperamentos.map((temperament) => (
          <option key={temperament.id} value={temperament.name}>
            {temperament.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemperamentFilter;
