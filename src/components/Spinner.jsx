import styles from "./Spinner.module.css";

function Spinner({size}) {
  return (
    <div className={styles.spinnerContainer} >
      <div className={styles.spinner}style={{width: size, height: size}}></div>
    </div>
  );
}

export default Spinner;
