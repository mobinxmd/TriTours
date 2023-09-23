import styles from './CityList.module.css';
import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../contexts/citiesContext';


export default function CityList(){
const {cities, isLoading} = useCities()
if(isLoading) return <h2>Loading...</h2>
if(!cities.length) return <Message message={"Add your cities by clicking on the map!"}/>
    return (
        <>
          <ul className={styles.cityList}>
            {cities.map(city=> (<CityItem city={city} key={city.id}/>))}
        </ul>  
        </>
    )
}
