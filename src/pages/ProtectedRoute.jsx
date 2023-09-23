import { useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router";


export default function ProtectedRoute({children}) {
    const {userAuthenticated} = useAuth()
    const navigate = useNavigate()
useEffect(() => {
    if(!userAuthenticated) navigate('/')
}, [userAuthenticated, navigate])
    return userAuthenticated ? children : null;
}
