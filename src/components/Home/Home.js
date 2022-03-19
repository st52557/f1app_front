import React from 'react';
import {useAuth} from "../User/AuthContext";
import {Link} from "react-router-dom";
import './Home.scss'

function Home() {

    const {user} = useAuth();
    const {token} = useAuth();

    return (
        <div>
            <div style={{height: "90vh"}}>
                <div className={'hero-area'}>
                    <div>
                        <h1 id={'hero-text'}>Hello world!</h1>
                        <p className={'sub-hero'}>If you see this everything is working!</p>
                    </div>
                    <div className={'sub-hero'}>
                        <Link to="/">Home</Link><br/>
                        <Link to="/login">Login</Link><br/>
                        <Link to="/signup">Sign Up</Link><br/>
                        <br/>
                        <h2>Home Page</h2>
                        <p>Hi {user && user.sub}</p>
                    </div>
                </div>
            </div>
        {/*  Possibility for another page under hero banner -> */}
        </div>
    )

}

export default Home;