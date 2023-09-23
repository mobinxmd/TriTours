// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from './Message';
import { useCities } from "../contexts/citiesContext";


const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

export function ConvertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const {createCity, isLoading} = useCities()
  const { lat, lng } = useUrlPosition();
  const [emoji, setEmoji] = useState();
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");
  const [country, setCountry] = useState("");
  const [loadingCityData, setLoadingCityData] = useState(false);

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCityData() {
      try {
        setLoadingCityData(true);
        setError("");
        const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "It doesn't seems to be a city. Please click on a City. 😊"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(ConvertToEmoji(data.countryCode));
      } catch (error) {
        setError(error.message)
      } finally {
        setLoadingCityData(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e){
    e.preventDefault()
    const newCity={
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng 
      },
    }
    // console.log(newCity)
   await createCity(newCity)
    navigate('/app/cities')
  }


  if(loadingCityData)return <h1>loading...</h1>;
  if(error)return <Message message={error}/>
  if(!emoji) return;
  const fixedEmoji = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
    return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
}

  return (
    <form className={`${styles.form} ${isLoading? styles.loading : ""}`} onSubmit={(e)=>handleSubmit(e)}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{fixedEmoji(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" selected={date} dateFormat="dd/MM/yyyy" onChange={d=> setDate(d)}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
