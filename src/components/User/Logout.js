import {useAuth} from "./AuthContext";
import {Navigate} from "react-router-dom";

function Logout() {
    const { removeTokens } = useAuth()
    removeTokens()
    return <Navigate to="/"/>;
}

export default Logout;