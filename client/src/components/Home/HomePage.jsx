import Card from "../Cards/Card";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import style from "./HomePage.module.css";
import SearchBar from "../SearchBar/SerchBar";
import Pagination from "../Pagination/Pagination";
import FilterOrigin from "../Filter/OriginFilter";
import React, { useState, useEffect } from "react";
import SortingOptions from "../Filter/SortingOptions";
import { useSelector, useDispatch } from "react-redux";
import TemperamentFilter from "../Filter/TemperamentFilter";
import { fetchDogs, filterByTemperament } from "../../Redux/Actions/actions";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [filteredOrigin, setFilteredOrigin] = useState("");

  const allDogs = useSelector((state) => state.allDogs); // Selecciono datos del estado global con useSelector
  const dogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  const dogsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedTemperament, setSelectedTemperament] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dis = await dispatch(fetchDogs());
        if (dis) {
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        return error.message;
      }
    };
    fetchData();
  }, [dispatch]);

  // Función para manejar la búsqueda de perros por nombre:
  const handleSearch = (term) => {
    const results = allDogs.filter((dog) =>
      dog.nombre.toLowerCase().includes(term.toLowerCase()),
    );
    setSearchResults(results);
    setCurrentPage(1);
  };

  // Función para filtrar perros por temperamento:
  const handleFilterByTemperament = (selectedValue) => {
    setSelectedTemperament(selectedValue);
    setCurrentPage(1);
  };

  //Función para filtrar perros por origen:
  const handleFilterByOrigin = (origin) => {
    console.log("Filtered origin:", origin);
    setFilteredOrigin(origin);
    setCurrentPage(1);
  };

  // Variables para almacenar los perros a mostrar y paginar
  let dogsToShow = [];
  let dogsToPaginate = dogs;

  // Si se seleccionó un origen, filtrar por origen
  if (filteredOrigin === "API") {
    dogsToPaginate = dogsToPaginate.filter((dog) => typeof dog.id === "number");
  } else if (filteredOrigin === "Database") {
    dogsToPaginate = dogsToPaginate.filter((dog) => typeof dog.id === "string");
  }

  // Si hay resultados de búsqueda, mostrar esos resultados
  if (searchResults.length > 0) {
    dogsToPaginate = searchResults;
  }

  // Si se seleccionó un temperamento, filtrar por temperamento
  if (selectedTemperament) {
    dogsToPaginate = dogsToPaginate.filter(
      (dog) =>
        (dog.temperamento && dog.temperamento.includes(selectedTemperament)) ||
        (dog.temperaments &&
          dog.temperaments.some((temp) => temp.name === selectedTemperament)),
    );
  }

  // Ordenar perros según el campo y el orden seleccionados
  const sortedDogs = dogsToPaginate.slice().sort((a, b) => {
    if (sortField === "name") {
      return sortOrder === "asc"
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre);
    } else if (sortField === "weight") {
      const aWeight = parseFloat(a.peso?.metric) || 0;
      const bWeight = parseFloat(b.peso?.metric) || 0;
      return sortOrder === "asc" ? aWeight - bWeight : bWeight - aWeight;
    }
  });

  // Obtener los perros a mostrar en la página actual con un slice
  dogsToShow = sortedDogs.slice(
    (currentPage - 1) * dogsPerPage,
    currentPage * dogsPerPage,
  );

  // Calculo el total de páginas aquí:
  const totalPages = Math.ceil(dogsToPaginate.length / dogsPerPage);

  // Función para manejar el cambio de campo y orden de ordenamiento
  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    setCurrentPage(1);
  };

  return (
    <div className={style.homeContainer}>
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <SortingOptions onSortChange={handleSortChange} />
      <TemperamentFilter onChange={handleFilterByTemperament} />
      <FilterOrigin onFilterChange={handleFilterByOrigin} />

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.cardContainer}>
            {dogsToShow.map((dog) => (
              <Card
                key={dog.id}
                id={dog.id}
                name={dog.nombre}
                image={dog.imagen}
                temperaments={
                  dog.temperamento
                    ? dog.temperamento
                        .map((temperamento) => temperamento)
                        .join(", ")
                    : dog.temperaments
                        .map((temperamento) => temperamento.name)
                        .join(", ")
                }
                weight={
                  dog.peso.metric ? `${dog.peso.metric} kg` : `${dog.peso} kg`
                }
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            dogsPerPage={dogsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
