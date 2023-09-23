import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from './Message'
import {useCities} from '../contexts/citiesContext';
 function CountryList() {
    const {cities, isLoading} = useCities()
    if(isLoading) return <h2>Loading...</h2>
    if(!cities.length) return <Message message={"Add your cities by clicking on the map!"}/>

    const countries = cities.reduce((arr, cur, )=>{
        if(!arr.map(el=> el.country).includes(cur.country))
        return [...arr, {country: cur.country, emoji: cur.emoji}]
        else return arr;
    },[])

    return (
       <ul className={styles.countryList}>
           {countries.map(country=><CountryItem country={country} key={country.country} />)}
       </ul>
    )
}

export default CountryList;