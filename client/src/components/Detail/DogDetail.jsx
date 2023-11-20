import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styles from "./DogDetail.module.css";

const DogDetail = () => {
  const { id } = useParams();

  const allDogs = useSelector((state) => state.allDogs);
  const dogDetail = allDogs.find((dog) => dog.id == id);

  const isHorizontalImage =
    dogDetail &&
    dogDetail.imagen &&
    dogDetail.imagen.width > dogDetail.imagen.height;

  return (
    <div className={styles["dog-detail-container"]}>
      {dogDetail ? (
        <div className={styles["dog-detail"]}>
          <Link to="/home" className={styles.homeButton}>Go Back to Home</Link>
          <h1>{dogDetail.nombre}</h1>
          <p>{`Id: ${dogDetail.id}`}</p>
          <p>{`Name: ${dogDetail.nombre}`}</p>
          <p>{`Height: ${
            dogDetail.altura.metric ? dogDetail.altura.metric : dogDetail.altura
          } cm`}</p>
          <p>{`Weight: ${
            dogDetail.peso.metric ? dogDetail.altura.metric : dogDetail.altura
          } kg`}</p>
          {console.log(dogDetail.temperaments)}
          <p>{`Temperaments: ${
            dogDetail.temperamento && dogDetail.temperamento.join(", ")
          }`}</p>
          <p>{`Life Span: ${dogDetail.longevidad}`}</p>
          <img
            className={`${styles["dog-detail-img"]} ${
              isHorizontalImage
                ? styles["horizontal-img"]
                : styles["vertical-img"]
            }`}
            src={dogDetail.imagen}
            alt={dogDetail.nombre}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DogDetail;
