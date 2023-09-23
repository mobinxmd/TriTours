import { useNavigate } from "react-router";
import PageNav from "../components/PageNav";
import { supabase } from "../supabase/supabaseClient";
import styles from "./Login.module.css";
import {useState} from 'react';
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Button from "../components/Button";

const avatar = "https://i.pravatar.cc/100?u=ddfssss";
export default function Signup() {
    const navigate = useNavigate()
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  function handleSubmit(e){
    e.preventDefault();
    if(userEmail.length <= 0 && userPassword.length <= 0) return setError("write your details!");
  async function signUp(){
      setIsLoading(true)
        try{
            let {data, error } = await supabase.auth.signUp({
                email: userEmail,
                password: userPassword,
              })
              if(error)return setError(error);
              insertUser(data.user.id)
              navigate("/app")
              }catch(error){
            setError(error)
            }finally{
              setIsLoading(false)
            }
        }
  signUp()
async function insertUser(userId){
  const {data, error} = await supabase
  .from("profiles")
  .insert([{
    uid: userId, name: userName, avatar_url: avatar
  }])
  .select()
 if(error) console.error(error)
 if(data) console.log(data)
}
 
  }

  return (
    <main className={styles.login}>
        <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        {isLoading? <Spinner /> : <><div className={styles.row}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            required
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={userEmail}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={userPassword}
          />
        </div>

        <div className={styles.btn}>
          <Button type={"primary"}>Sign up</Button>
          {error? <p className={styles.error}>{error}</p> :<span className={styles.span}>{"Already have an account?"}<Link to="/login" className={styles.link}>Login</Link></span>}
        </div></>}
      </form>
    </main>
  );
}
