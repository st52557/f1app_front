import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import './Race.scss'
import {useParams} from "react-router-dom";
import {useAuth} from "../User/AuthContext";

function Race() {

    const { id } = useParams();
    const {token} = useAuth();
    const [race, setRace] = useState({});
    const [error, setError] = useState("");


    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URI}/race/${id}`,
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
                setRace(json);
            })
            .catch((err) => setError(err.message))
    }, [])


    return (
        <div>
            <h1 style={{paddingTop: '2em'}}>{race.circuit}</h1>

            <Container>
                <div className={"race-detail"}>
                    <h4>{race.year}</h4>

                    <p>Race number in its season: {race.round}</p>
                    <div className={"race-detail"}>



                    </div>
                </div>
            </Container>
        </div>
    )


}

export default Race;
