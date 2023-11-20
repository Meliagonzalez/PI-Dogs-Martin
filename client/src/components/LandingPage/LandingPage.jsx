import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles['landing-page']}>
      <div className={styles.content}>
      <h1 className={styles['animated-text']}>Meet your</h1>
      <h1 className={styles['animated-text']}>doggy</h1>
      <div className={styles['button-container']}>
        <Link to="/home">
        <button className={styles.button}>Let's see!</button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
