import React from 'react';
import {useAuth} from "../User/AuthContext";

function Home() {

    const {user} = useAuth();
    const {token} = useAuth();

    return (
        <div>
            <h2>Home Page</h2>
            <p>Hi {user && user.sub}</p>
        </div>
    )

}

export default Home;