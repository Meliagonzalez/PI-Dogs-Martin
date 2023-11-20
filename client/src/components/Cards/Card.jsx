import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";


const defaultDogImages = {
};

const Card = ({ id, name, image, temperaments, weight }) => {
  const handleImageError = (e) => {
    const defaultImage =
      defaultDogImages[id] ||
      "https://img.freepik.com/free-vector/404-error-web-template-with-cute-dog_23-2147763341.jpg";
    e.target.src = defaultImage;
  };

  return (
    <div className={styles.card}>
      <Link to={`/detail/${id}`} className={styles.link}>
        <img
          src={image}
          alt={name}
          className={styles.card__image}
          onError={handleImageError}
        />
        <div className={styles.card__overlay}>
          <div className={styles.card__header}>
            <div className={styles.card__thumb}></div>
            <div>
              <h3 className={styles.card__title}>{name}</h3>
            </div>
          </div>
          <p className={styles.card__description}>
            <span className={styles.card__tagline}>{temperaments}</span>
            <span className={styles.card__status}>Weight: {weight}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
