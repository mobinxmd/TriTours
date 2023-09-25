import styles from './CityList.module.css';
import CityItem from './CityItem';
import Message from './Message';

import { useCities } from '../contexts/citiesContext';
import { useEffect } from 'react';


export default function CityList(){
const{cities, isLoading, fetchData} =useCities()



useEffect(() => {
    fetchData();
}, [fetchData])

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
