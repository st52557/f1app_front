import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import './Driver.scss'
import {useParams} from "react-router-dom";
import {useAuth} from "../User/AuthContext";

function Driver() {

    const {id} = useParams();
    const {token} = useAuth();
    const [driver, setDriver] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URI}/driver/${id}`,
            {
                method: 'GET',
                headers:
                    {
                        'Authorization': token
                    }
            })
            .then(r => {
                if (r.ok) {
                    return r.json();
                }
                throw new Error("Unable to get data: " + r.statusText);
            })
            .then(json => {
                setDriver(json);
            })
            .catch((err) => setError(err.message))
    }, [])


    return (
        <div>
            <h1 style={{paddingTop: '2em'}}>{driver.name} + {driver.surename}</h1>

            <Container>
                <div>
                    <h4>{driver.code}</h4>

                    <div>

                        {JSON.stringify(driver, null, 2)}

                    </div>
                </div>
            </Container>
        </div>
    )


}

export default Driver;
