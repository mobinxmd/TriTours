import { useNavigate } from "react-router";
import styles from "./Map.module.css";
import Button from "./Button";
import Spinner from './Spinner';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/citiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import {MdOutlineMenu} from 'react-icons/md';
import User from "./User";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, -3.7337]);
  const { cities,handleOpen } = useCities();
  const {
    isLoading: isLoadingGeolocation,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const {lat, lng} = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <>
      <div className={styles.mapContainer} >
        <User />

        <span onClick={handleOpen} className={styles.menu}><MdOutlineMenu /></span>

       { 
        <Button type={"position"} onClick={getPosition}>
          {isLoadingGeolocation ? <Spinner size={"25px"} /> : "Get Your Position"}
        </Button>
       }
        <MapContainer
          className={styles.map}
          zoom={14}
          center={mapPosition}
          scrollWheelZoom={true}
          
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <h3>{city.cityName}</h3> 
                <p>🎇{city.notes }</p>
              </Popup>
            </Marker>
          ))}
          <ChangeCenter position={mapPosition} />
          <DetectClick />
        </MapContainer>
      </div>
    </>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, 10);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  const {handleOpen} = useCities();
  useMapEvents({
    click: (e) => {
      handleOpen(),
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
 
  });
}
