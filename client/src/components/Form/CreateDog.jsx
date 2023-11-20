import React from "react";
import { createDog, fetchDogs } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Form/CreateDog.module.css";


const CreateDog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector(state => state.temperament);

  const [form, setForm] = useState({
    imagen: "",
    nombre: "",
    alturaMin: "",
    alturaMax: "",
    pesoMin: "",
    pesoMax: "",
    longevidad: "",
    temperamento: [],
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [minHeightError, setMinHeightError] = useState("");
  const [maxHeightError, setMaxHeightError] = useState("");
  const [minWeightError, setMinWeightError] = useState("");
  const [maxWeightError, setMaxWeightError] = useState("");

  const validateName = (name) => {
    if (/\d/.test(name)) {
      return "Name should not contain numbers";
    }
    return "";
  };

  const validateForm = (formData) => {
    const { nombre, alturaMin, alturaMax, pesoMin, pesoMax } = formData;
    const errors = {};

    const nameError = validateName(nombre);
    if (nameError) {
      errors.nombre = nameError;
    }

    const alturaError = validateMinMax(alturaMin, alturaMax);
    if (alturaError) {
      errors.alturaMin = alturaError;
    }

    const pesoError = validateMinMax(pesoMin, pesoMax);
    if (pesoError) {
      errors.pesoMin = pesoError;
    }

    return errors;
  };

  const validateMinMax = (min, max) => {
    if (parseInt(min) > parseInt(max)) {
      return "Minimum value should not be greater than Maximum value";
    }
    return "";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleTemperamentChange = (event) => {
    const selectTemperament = event.target.value;
  
    setForm((prevForm) => ({
      ...prevForm,
      temperamento: prevForm.temperamento.includes(selectTemperament)
        ? prevForm.temperamento.filter((item) => item !== selectTemperament)
        : [...prevForm.temperamento, selectTemperament],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nombre = form.nombre.trim();

    if (nombre === "") {
      setErrorMessage("Please enter a name");
      return;
    }

    if (nombre.length > 20) {
      setErrorMessage("Name should not exceed 20 characters");
      return;
    }

    if (
      form.alturaMin === "" ||
      form.alturaMax === "" ||
      form.pesoMin === "" ||
      form.pesoMax === "" ||
      isNaN(form.longevidad)
    ) {
      setErrorMessage(
        "Please enter valid values for Height, Weight, and Lifespan"
      );
      return;
    }

    const alturaMin = parseInt(form.alturaMin);
    const alturaMax = parseInt(form.alturaMax);
    const pesoMin = parseInt(form.pesoMin);
    const pesoMax = parseInt(form.pesoMax);

    if (alturaMin >= alturaMax) {
      setMinHeightError("Minimum Height should be less than Maximum Height");
      return;
    } else {
      setMinHeightError("");
    }

    if (pesoMin >= pesoMax) {
      setMinWeightError("Minimum Weight should be less than Maximum Weight");
      return;
    } else {
      setMinWeightError("");
    }

    const newDog = {
      imagen: form.imagen,
      nombre: nombre,
      altura: `${alturaMin} - ${alturaMax}`,
      peso: `${pesoMin} - ${pesoMax}`,
      longevidad: parseInt(form.longevidad),
      temperaments: form.temperamento
    };

    dispatch(createDog(newDog))
    dispatch(fetchDogs())
    
      .then(() => {
        setSuccessMessage("Dog created successfully!");
        setTimeout(() => {
          navigate(`/home`);
        }, 1000);
      })
      .catch((error) => {
        setErrorMessage("Error creating dog");
        console.error("Error creating dog:", error);
      });
  };

  return (
    <div className={styles.formRoot}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.homeButtonContainer}>
          <Link to="/home" className={styles.homeButton}>
            Home
          </Link>
        </div>

        {successMessage && <div className="success">{successMessage}</div>}
        <div>
          <label className={styles.label}>Image: </label>
          <input
            className={styles.inputField}
            type="text"
            name="imagen"
            value={form.imagen}
            onChange={handleInputChange}
          />
        </div>
        {errorMessage && form.imagen === "" && (
          <div className="error-message">{errorMessage}</div>
        )}

        <div>
          <label className={styles.label}>Name: </label>
          <input
            className={styles.inputField}
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleInputChange}
          />
        </div>
        {errorMessage && form.nombre === "" && (
          <div className="error-message">{errorMessage}</div>
        )}
        {errorMessage && form.nombre.length > 20 && (
          <div className="error-message">{errorMessage}</div>
        )}

        <div>
          <label className={styles.label}>Min Height: </label>
          <input
            className={styles.inputField}
            type="number"
            name="alturaMin"
            value={form.alturaMin}
            onChange={handleInputChange}
          />
          {minHeightError && <div className="error-message">{minHeightError}</div>}
        </div>

        <div>
          <label className={styles.label}>Max Height: </label>
          <input
            className={styles.inputField}
            type="number"
            name="alturaMax"
            value={form.alturaMax}
            onChange={handleInputChange}
          />
          {maxHeightError && <div className="error-message">{maxHeightError}</div>}
        </div>

        <div>
          <label className={styles.label}>Min Weight: </label>
          <input
            className={styles.inputField}
            type="number"
            name="pesoMin"
            value={form.pesoMin}
            onChange={handleInputChange}
          />
          {minWeightError && <div className="error-message">{minWeightError}</div>}
        </div>

        <div>
          <label className={styles.label}>Max Weight: </label>
          <input
            className={styles.inputField}
            type="number"
            name="pesoMax"
            value={form.pesoMax}
            onChange={handleInputChange}
          />
          {maxWeightError && <div className="error-message">{maxWeightError}</div>}
        </div>

        <div>
          <label className={styles.label}>Life Span: </label>
          <input
            className={styles.inputField}
            type="number"
            name="longevidad"
            value={form.longevidad}
            onChange={handleInputChange}
          />
        </div>
        {errorMessage && isNaN(form.longevidad) && (
          <div className="error-message">{errorMessage}</div>
        )}

        <div>
          <label className={styles.label}>
            Temperaments:
            <select className={styles.select} multiple value={form.temperamento} onChange={handleTemperamentChange}>
              {temperaments.map((temperament) => (
                <option key={temperament.id} value={temperament.name}>
                  {temperament.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button className={styles.buttonContainer} type="submit">
          Create Dog
        </button>
      </form>
    </div>
  );
};

export default CreateDog;
