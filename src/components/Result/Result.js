import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import './Result.scss'
import {useParams} from "react-router-dom";
import {useAuth} from "../User/AuthContext";

function Result() {

    const { id } = useParams();
    const {token} = useAuth();
    const [result, setResult] = useState({});
    const [error, setError] = useState("");


    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URI}/result/${id}`,
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
                setResult(json);
            })
            .catch((err) => setError(err.message))
    }, [])


    return (
        <div>
            <h1 style={{paddingTop: '2em'}}>{result?.driver?.name + " " + result?.driver?.surename}</h1>
            <h4>{result?.race?.year} - {result?.race?.circuit}</h4>

            <Container>
                <div className={"race-detail"}>

                    <p>Starting position: <span className={"fw-bold"}>{result.positionStart}</span></p>
                    <p>Final position: <span className={"fw-bold"}>{result.positionFinal}</span></p>

                    <br/>
                    <p>Fastest lap: <span className={"fw-bold"}>{result.fastestLap}</span></p>
                    <p>Fastest lap time: <span className={"fw-bold"}>{result.fastestLapTime}</span></p>
                    <p>Fastest lap speed: <span className={"fw-bold"}>{result.fastestTimeSpeed}</span></p>
                    <p>Laps drove: <span className={"fw-bold"}>{result.laps}</span></p>

                    <div className={"race-detail"}>



                    </div>
                </div>
            </Container>
        </div>
    )


}

export default Result;
