import React, {useEffect, useState} from "react";
import './Race.scss'
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../User/AuthContext";
import {Button} from "react-bootstrap";

function RaceForm() {

    const {id} = useParams();
    const {token} = useAuth();
    const [race, setRace] = useState({});
    const [error, setError] = useState("");


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


    return (
        <div>
            {race.id ? <h1 style={{paddingTop: '2em'}}>Edit of: {race.circuit}</h1> : <h1 style={{paddingTop: '2em'}}>New race</h1>}
            {race.id ?
                <Button variant="danger" onClick={() => {
                if (window.confirm('Are you sure you wish to delete this item?')) deleteRace()
                }}>Delete race</Button> : ''
            }

                <div>


                </div>


        </div>
)


}

export default RaceForm;
