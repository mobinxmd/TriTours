import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";
import { useAuth } from "../contexts/authContext";
import { useEffect } from "react";

export default function Homepage() {
  const {userAuthenticated, userLogout} = useAuth()


  
useEffect(() => {
 userLogout()
}, [])



  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          TriTours keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to={userAuthenticated?"/app": "/login"}  className="cta">Start Tracking</Link>
      </section>
    </main>
  );
}
