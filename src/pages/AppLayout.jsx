import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import { useCities } from "../contexts/citiesContext";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  const { isOpen } = useCities();

  return (
    <>
      <div className={styles.app}>
        <div className={isOpen ? styles.open : styles.close || ""}>
          <Sidebar />
        </div>
        <Map />
      </div>
    </>
  );
}
