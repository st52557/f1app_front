import React, {useEffect, useState} from "react";
import './Race.scss'
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../User/AuthContext";
import {Alert, Button, Form} from "react-bootstrap";

function RaceForm() {

    const {id} = useParams();
    const {token} = useAuth();
    const [race, setRace] = useState({});
    const [error, setError] = useState("");
    const [circuit, setCircuit] = useState({});
    const [round, setRound] = useState({});
    const [year, setYear] = useState({});


    useEffect(() => {
        if (id) getRace();

        return () => {
            setRace({});
            setError("");
        };

    }, [])


    const getRace = () => {
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
    }

    const navigate = useNavigate();
    const goToRaces = () => navigate(`/races`);

    const deleteRace = () => {
        fetch(
            `${process.env.REACT_APP_BASE_URI}/race/${id}`,
            {
                method: 'DELETE',
                headers:
                    {
                        'Authorization': token
                    }
            })
            .then(r => {
                if (r.ok) {
                    goToRaces();
                }
                throw new Error("Unable to get data: " + r.statusText);
            })
            .catch((err) => setError(err.message))
    }

    const goToRace = (idParam) => navigate(`/race/${idParam}`);

    function postRace(e) {
        e.preventDefault()

        const requestBody = {
            circuit: circuit,
            round: round,
            year: year

        }

        fetch(`${process.env.REACT_APP_BASE_URI}/race`,
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
                goToRace(json.id);
            })
            .catch((err) => {
                setError(err.message)
            });
    }


    return (
        <div>
            {race.id ? <h1 style={{paddingTop: '2em'}}>Edit of: {race.circuit}</h1> :
                <h1 style={{paddingTop: '2em'}}>New race</h1>}
            {race.id ?
                <Button variant="danger" onClick={() => {
                    if (window.confirm('Are you sure you wish to delete this item?')) deleteRace()
                }}>Delete race</Button> : ''
            }

            {!race.id ?

                <div className={'form'}>
                    <Form onSubmit={postRace}>
                        <Form.Group controlId="formCircuit">
                            <Form.Control type={"text"} placeholder={"Circuit name"} onChange={e => {
                                setCircuit(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formYear" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder="Year" onChange={e => {
                                setYear(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formRound" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder="Round" onChange={e => {
                                setRound(e.target.value);
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

export default RaceForm;
