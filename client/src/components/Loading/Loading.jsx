import React from 'react';
import loadingGif from '../../assets/images/doggif.gif';
import styles from '../Loading/Loading.module.css'
const Loading = () => {
    return (
      <div className={styles.loadingContainer}>
        <img src={loadingGif} alt="Loading..." className={styles.loadingGif} />
      </div>
    );
  };
  
  export default Loading;