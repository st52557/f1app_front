import React, {useEffect, useState} from "react";
import './Result.scss'
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../User/AuthContext";
import {Alert, Button, Form} from "react-bootstrap";
import Select from "react-select";

function ResultForm() {

    const {id} = useParams();
    const {token} = useAuth();
    const [result, setResult] = useState({});
    const [error, setError] = useState("");

    const [fastestLap, setFfastestLap] = useState(0);
    const [fastestTimeSpeed, setFastestTimeSpeed] = useState(0);
    const [laps, setLaps] = useState(0);
    const [milisTime, setMilisTime] = useState(0);
    const [points, setPoints] = useState(0);
    const [positionFinal, setPositionFinal] = useState(0);
    const [positionStart, setPositionStart] = useState(0);
    const [drivers, setDrivers] = useState([]);
    const [races, setRaces] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [selectedRace, setSelectedRace] = useState(null);

    useEffect(() => {
        if (id) getResult();
        fetchDrivers();
        fetchRaces();

        return () => {
            setResult({});
            setError("");
        };

    }, [])

    const fetchRaces = () => {

        fetch(
            `${process.env.REACT_APP_BASE_URI}/races`,
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
                throw new Error("Unable to get races: " + r.statusText);
            })
            .then(json => {
                setRaces((json.map(({id, circuit, year}) => ({value: id, label: year + " - " + circuit}))));

            })
            .catch((err) => setError(err.message))

    }
    const fetchDrivers = () => {

        fetch(
            `${process.env.REACT_APP_BASE_URI}/drivers`,
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
                throw new Error("Unable to get drivers: " + r.statusText);
            })
            .then(json => {

                setDrivers((json.map(({id, name, surename}) => ({value: id, label: name + " " + surename}))));

            })
            .catch((err) => setError(err.message))


    }

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

    const goToResult = (idParam) => navigate(`/result/${idParam}`);

    function postResult(e) {
        e.preventDefault()

        const requestBody = {
            fastestLap: fastestLap,
            fastestTimeSpeed: fastestTimeSpeed,
            laps: laps,
            milisTime: milisTime,
            points: points,
            positionFinal: positionFinal,
            positionStart: positionStart,
            raceId: selectedRace.value,
            driverId: selectedDriver.value

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

    const selectDriver = (selectedOption) => {
        setSelectedDriver(selectedOption);
    };

    const selectRace = (selectedOption) => {
        setSelectedRace(selectedOption);
    };

    return (
        <div>
            {result.id ? <h1 style={{paddingTop: '2em'}}>Edit of: {result.driver.code} - {result.race.circuit}</h1> :
                <h1 style={{paddingTop: '2em'}}>New result</h1>}
            {result.id ?
                <Button variant="danger" onClick={() => {
                    if (window.confirm('Are you sure you wish to delete this item?')) deleteResult()
                }}>Delete result</Button> : ''
            }

            {!result.id ?

                <div className={'form mt-3'}>
                    <Form onSubmit={postResult}>
                        <Form.Group controlId="formDriverId" className={'mt-3'}>
                            <Select
                                placeholder={'Driver'}
                                options={drivers}
                                value={selectedDriver}
                                onChange={selectDriver}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRaceId" className={'mt-3'}>
                            <Select
                                placeholder={'Race'}
                                options={races}
                                value={selectedRace}
                                onChange={selectRace}
                            />
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
