import { useNavigate } from "react-router";
import { useAuth } from "../contexts/authContext";
import styles from "./User.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

import Spinner from "./Spinner";

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

function User() {
  const navigate = useNavigate();
  const { userLogout, isLoading } = useAuth();
  const [mainUser, setMainUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("profiles")
        .select("name, avatar_url")
        .eq("uid", user.id);
      setMainUser(data[0]);
    }
    getUser();
  }, []);

 async function handleClick() {
   await userLogout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={mainUser.avatar_url} alt={mainUser.name} />
      <span>Welcome, {mainUser.name}</span>
      <button onClick={handleClick}>
        {isLoading ? <Spinner size={"20px"} /> : "Log out"}
      </button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
