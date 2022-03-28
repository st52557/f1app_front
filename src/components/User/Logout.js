import {useAuth} from "./AuthContext";
import {Navigate} from "react-router-dom";
import {useEffect} from "react";

function Logout() {
    const {removeTokens} = useAuth()


    useEffect(() =>{
        removeTokens();
    });

    return <Navigate to="/"/>;
}

export default Logout;