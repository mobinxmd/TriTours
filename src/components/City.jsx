import styles from "./City.module.css";
import { useNavigate, useParams } from "react-router";
import Button from "./Button";
import { useCities } from "../contexts/citiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));


function City() {
  const {fetchCity, currentCity, isLoading}= useCities()
  const { cityName, date, emoji, notes } = currentCity;

  const navigate = useNavigate();
  const {id} =useParams()

  


  useEffect(() => {
    fetchCity(id)
    
  }, [id, fetchCity])
  
  if(!emoji) return;
  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
    return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
}


   
  return <>
        <div className={styles.city}>
        {isLoading? <Spinner /> : <> <div className={styles.row}>
            <h6>City name</h6>
            <h3>
             <span>{flagemojiToPNG(emoji)}</span>{cityName}
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date || null)}</p>
          </div>

          {notes && (
            <div className={styles.row}>
              <h6>Your notes</h6>
              <p>{notes}</p>
            </div>
          )}

          <div className={styles.row}>
            <h6>Learn more</h6>
            <a
              href={`https://en.wikipedia.org/wiki/${cityName}`}
              target="_blank"
              rel="noreferrer"
            >
              Check out {cityName} on Wikipedia &rarr;
            </a>
          </div>

          <div>
            <Button onClick={(e)=> {
              e.preventDefault();
              navigate(-1);
              }} type={'back'} >&larr; Back</Button>
          </div>  
           </>}
      </div>
  </>
 
}

export default City;
