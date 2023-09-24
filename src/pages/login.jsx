
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Spinner from "../components/Spinner";
import Button from "../components/Button";

export default function Login() {
const navigate = useNavigate()
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const {userError, userLogin, isLoading, userAuthenticated} = useAuth()


 function handleSubmit(e){
    e.preventDefault();
   userLogin(userEmail, userPassword)
  
  
  }
   useEffect(() => {
    if(userAuthenticated) navigate("/app")
   }, [navigate,userAuthenticated])   
    



  return (
    
    <main className={styles.login}>
        <PageNav />
     <form className={styles.form} onSubmit={handleSubmit}>
        {isLoading? <div className={styles.error}><Spinner /></div>: <>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={userEmail}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={userPassword}
          />
        </div>

        <div className={styles.btn}>
          <Button type={"primary"}>Login</Button>
          {userError? <p className={styles.error}>{userError}</p> : <span className={styles.span} >{"Don't have an account?"}<Link to="/signup" className={styles.link}>Create an Account</Link></span> }
        </div>
        </>}
      </form>
      <span className={styles.loginInfo}>
        <h4>{"Use the Demo Account version below to login"}</h4>
        <p>
          Email: demo@gmail.com
          <br /> 
          Password: Demo@1212
          </p>
        </span>
    </main>
   
  );
}
