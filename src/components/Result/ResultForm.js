import React, {useEffect, useState} from "react";
import './Result.scss'
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../User/AuthContext";
import {Alert, Button, Form} from "react-bootstrap";

function ResultForm() {

    const {id} = useParams();
    const {token} = useAuth();
    const [result, setResult] = useState({});
    const [error, setError] = useState("");

    const [fastestLap,setFfastestLap] = useState(0);
    const [fastestTimeSpeed, setFastestTimeSpeed] = useState(0);
    const [laps, setLaps] = useState(0);
    const [milisTime, setMilisTime] = useState(0);
    const [points, setPoints] = useState(0);
    const [positionFinal, setPositionFinal] = useState(0);
    const [positionOrder, setPositionOrder] = useState(0);
    const [positionStart, setPositionStart] = useState(0);
    const [raceId, seTraceId] = useState(0);
    const [driverId, setDriverId] = useState(0);


    useEffect(() => {
        if (id) getResult();

        return () => {
            setResult({});
            setError("");
        };

    }, [])


    const getResult = () => {
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
    }

    const navigate = useNavigate();
    const goToResults = () => navigate(`/results`);

    const deleteResult = () => {
        fetch(
            `${process.env.REACT_APP_BASE_URI}/result/${id}`,
            {
                method: 'DELETE',
                headers:
                    {
                        'Authorization': token
                    }
            })
            .then(r => {
                if (r.ok) {
                    goToResults();
                }
                throw new Error("Unable to get data: " + r.statusText);
            })
            .catch((err) => setError(err.message))
    }

    const goToResult = (id) => navigate(`/result/${id}`);

    function postResult(e) {
        e.preventDefault()

        const requestBody = {
            fastestLap: fastestLap,
            fastestTimeSpeed: fastestTimeSpeed,
            laps: laps,
            milisTime: milisTime,
            points: points,
            positionFinal: positionFinal,
            positionOrder: positionOrder,
            positionStart: positionStart,
            raceId: raceId,
            driverId: driverId

        }

        fetch(`${process.env.REACT_APP_BASE_URI}/result`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(`Unable to get data: ${response.statusText}`)
            })
            .then(json => {
                console.log(json.id);
                goToResult(json.id);
            })
            .catch((err) => {
                setError(err.message)
            });
    }


    return (
        <div>
            {result.id ? <h1 style={{paddingTop: '2em'}}>Edit of: {result.circuit}</h1> :
                <h1 style={{paddingTop: '2em'}}>New result</h1>}
            {result.id ?
                <Button variant="danger" onClick={() => {
                    if (window.confirm('Are you sure you wish to delete this item?')) deleteResult()
                }}>Delete result</Button> : ''
            }

            {!result.id ?

                <div className={'form'}>
                    <Form onSubmit={postResult}>
                        <Form.Group controlId="formDriverId" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder={"Driver id"} onChange={e => {
                                setDriverId(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formRaceId" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder="Race id" onChange={e => {
                                seTraceId(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formPoints" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder="Points" onChange={e => {
                                setPoints(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formLaps" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder={"Laps completed"} onChange={e => {
                                setLaps(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formFastestTimeSpeed" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder="Fastest speed" onChange={e => {
                                setFastestTimeSpeed(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formFastestLap" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder="Fastest lap" onChange={e => {
                                setFfastestLap(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formMilisTime" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder="Race milis time" onChange={e => {
                                setMilisTime(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formPosStart" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder="Position start" onChange={e => {
                                setPositionStart(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formPosFinal" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder="Position final" onChange={e => {
                                setPositionFinal(e.target.value);
                            }}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className={'mt-3 center'}>
                            Create
                        </Button>
                    </Form>

                    <Alert hidden={!error} type={"danger"}>
                        {error}
                    </Alert>
                </div>
                : ''
            }

            <div>


            </div>


        </div>
    )


}

export default ResultForm;
