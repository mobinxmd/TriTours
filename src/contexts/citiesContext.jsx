import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { supabase } from "../supabase/supabaseClient";

const CitiesContext = createContext();
// const BASE_URL = "http://localhost:9000/";

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
      return { ...state, isOpen: !state.isOpen };
    case "openForm":
      return { ...state, isOpen: action.payLoad };
    default:
      throw new Error("Unknown action!");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{ isOpen, cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchData = useCallback(async function fetchData() {
    dispatch({ type: "loading" });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("cities")
      .select("*")
      .eq("uid", user?.id);
    dispatch({ type: "cities/loaded", payLoad: data });
    if (error) console.log(error);
    if (error) dispatch({ type: "rejected", payLoad: error });
  }, []);

  const fetchCity = useCallback(
    function fetchCity(id) {
      if (+id === currentCity.id) return;
      async function fetchData() {
        dispatch({ type: "loading" });
        try {
          const { data, error } = await supabase
          .from('cities')
          .select("*")
          .eq('id', id)
          if(error)throw Error(error)

          dispatch({ type: "city/loaded", payLoad: data[0] });
        } catch (error){
          dispatch({ type: "rejected", payLoad: "could not load city!" });
        }
      }
      fetchData();
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("cities")
      .insert({ uid: user.id, ...newCity })
      .select();
    if (data) dispatch({ type: "city/created", payLoad: data[0] });

    if (error) dispatch({ type: "rejected", payLoad: error });
  }

  async function deleteCity(id) {
    try {
      const { error } = await supabase
      .from('cities')
      .delete()
      .eq('id', id)
      dispatch({ type: "city/deleted", payLoad: id });
      console.log(error)
    } catch {
      dispatch({ type: "rejected", payLoad: "Error while deleting the city!" });
    }
  }
  function handleOpen() {
    dispatch({ type: "open" });
  }
  const value = useMemo(() => {
    return {
      cities,
      isLoading,
      currentCity,
      createCity,
      deleteCity,
      handleOpen,
      isOpen,
      fetchCity,
      dispatch,
      fetchData,
    };
  }, [fetchData,fetchCity, cities, currentCity, isLoading, isOpen]);

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("You used CitiesContext outside the provider component");
  return context;
}

export { CitiesProvider, useCities };
