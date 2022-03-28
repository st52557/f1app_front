import {createContext, useContext, useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";

const getUser = (token) => (token && jwt_decode(token));

const AuthContext = createContext();

function AuthProvider({children}) {

    const removeTokens = () => {
        localStorage.removeItem("tokens");
        localStorage.removeItem("admin");

        setState({
            status: 'success',
            error: null,
            user: null,
            token: authTokens,
            admin: null,
            setTokens,
            removeTokens
        })
    }


    const [authTokens, setAuthTokens] = useState();

    const [state, setState] = useState({
        status: 'pending'
    })

    const setTokens = (data) => {
        localStorage.setItem("tokens", data.token);
        localStorage.setItem("admin", data.admin);

        console.log("setTokens: ", data.admin);

        setAuthTokens(data.token);
        const user = getUser(data.token);
        setState({
                status: 'success',
                error: null,
                user: user,
                token: data.token,
                admin: data.admin,
                setTokens,
                removeTokens
            }
        );

    }


    useEffect(() => {
        const user = getUser(localStorage.getItem("tokens"));
        const admin = localStorage.getItem("admin");
        console.log("useEffect: ", admin);
        setState({
                status: 'success',
                error: null,
                user: user,
                admin: admin,
                token: localStorage.getItem("tokens"),
                setTokens,
                removeTokens
            }
        );
    }, [])

    return (
        <AuthContext.Provider value={state}>
            {state.status === 'pending' ? (
                'Loading...'
            ) : state.status === 'error' ? (
                <div>
                    Oh no
                    <div>
                        <pre>{state.error.message}</pre>
                    </div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const state = useContext(AuthContext)
    const isPending = state.status === 'pending'
    const isError = state.status === 'error'
    const isSuccess = state.status === 'success'
    const isAuthenticated = state.user && isSuccess
    return {
        ...state,
        isPending,
        isError,
        isSuccess,
        isAuthenticated,
    }
}

export {AuthProvider, useAuth}