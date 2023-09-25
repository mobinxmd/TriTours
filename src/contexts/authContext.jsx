import { createContext, useContext, useReducer } from "react";
import { supabase } from "../supabase/supabaseClient";

const AuthContext = createContext();
const initialState = {
  userAuthenticated: false,
  userError: '',
  isLoading: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, userAuthenticated: true, userError: '' };
    case "logout":
      return { ...state, userAuthenticated: false };
    case "loading":
      return { ...state, isLoading: action.payLoad, };
    case "rejected":
      return { ...state, userError: action.payLoad };
    default:
      throw new Error("Your action is not stored in reducer");
  }
}

function AuthProvider({ children }) {

  const [{ userError, isLoading, userAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  
  async function userLogin(userEmail, userPassword) {
    if (userEmail.length <= 0 && userPassword.length <= 0)
      return dispatch({
        type: "rejected",
        payLoad: "write your account details!",
      });
    dispatch({ type: "loading", payLoad: true });
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      });
      if (error) return  dispatch({type: 'rejected', payLoad: error.message});
      if (data.user !== null) {
        dispatch({ type: "login" });
      }
    } catch (error) {
      dispatch({ type: "rejected", payLoad: error });
    } finally {
      dispatch({ type: "loading", payLoad: false });
    }
  }

 async function userLogout() {
    dispatch({type: 'loading', payLoad: true})
    await supabase.auth.signOut()
    dispatch({ type: "logout" });
    dispatch({type: 'loading', payLoad: false})
  }

  return (
    <AuthContext.Provider
      value={{userAuthenticated, userError, isLoading, userLogin, userLogout}}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth Should not be used outside AuthProvider!");
  return context;
}

export { AuthProvider, useAuth };
