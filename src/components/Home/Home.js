import React from 'react';
import {useAuth} from "../User/AuthContext";
import './Home.scss'

function Home() {

    const {user} = useAuth();
    const {admin} = useAuth();

    return (
        <div>
            <div style={{height: "87vh"}}>
                <div className={'hero-area'}>
                    <div>
                        <h1 id={'hero-text'}>Hello world!</h1>
                        <p className={'sub-hero'}>And good day to the others!</p>
                    </div>
                    <div className={'sub-hero'}>
                        <h2>Home Page</h2>
                        <p>Hi {user && user.sub}</p>
                        <p>Admin rights: {admin && admin.toString()}</p>
                    </div>
                </div>
                <a id={"credit"} href="https://commons.wikimedia.org/wiki/File:RB13_(35832271851).jpg">Andrew &amp; Alan Frost from Essex, United Kingdom, CC BY 2.0</a>
            </div>
            <footer>
                <div id="footer">
                    <div className="container text-center">
                        <div className="col-md-12">
                            <p>&copy; 2022 Created by Lukáš Semorád / st52557</p>
                        </div>
                        <div className="col-md-6">
                        </div>
                    </div>
                </div>
            </footer>
            {/*  Possibility for another page under hero banner -> */}
        </div>
    )

}

export default Home;