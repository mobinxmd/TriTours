import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000/";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
  isOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, cities: action.payLoad, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payLoad, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payLoad],
        isLoading: false,
        currentCity: action.payLoad,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payLoad),
        isLoading: false,
      };
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, isLoading: false, error: action.payLoad };
    case "open":
      return {...state, isOpen: !state.isOpen};
    default:
      throw new Error("Unknown action!");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{isOpen, cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payLoad: data });
      } catch {
        dispatch({ type: "rejected", payLoad: "could not load cities!" });
      }
    }
    fetchData();
  }, []);

  const fetchCity = useCallback(function fetchCity(id) {
    if(+id === currentCity.id) return;
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`http://localhost:9000/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payLoad: data });
      } catch {
        dispatch({ type: "rejected", payLoad: "could not load city!" });
      }
    }
    fetchData();
  },[currentCity.id])

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:9000/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payLoad: data });
    } catch {
      dispatch({ type: "rejected", payLoad: "Error while creating new city!" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payLoad: id });
    } catch {
      dispatch({ type: "rejected", payLoad: "Error while deleting the city!" });
    }
  }
  function handleOpen(){
    dispatch({type: "open"})
  }
  const value = useMemo(()=>{
    return {
      cities,
      isLoading,
      currentCity,
      fetchCity,
      createCity,
      deleteCity,
      handleOpen,
      isOpen,
    }
  },[cities, currentCity, fetchCity, isLoading, isOpen])

  return (
    <CitiesContext.Provider
      value={value}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("You used CitiesContext outside the provider component");
  return context;
}

export { CitiesProvider, useCities };
