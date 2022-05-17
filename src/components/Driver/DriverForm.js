import React, {useEffect, useState} from "react";
import './Driver.scss'
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../User/AuthContext";
import {Alert, Button, Form} from "react-bootstrap";

function DriverForm() {

    const {id} = useParams();
    const {token} = useAuth();
    const [driver, setDriver] = useState({});
    const [error, setError] = useState("");

    const [born, setBorn] = useState({});
    const [code, setCode,] = useState({});
    const [name, setName] = useState({});
    const [nationalilty, setNationalilty] = useState({});
    const [ref_name, setRef_name] = useState({});
    const [surname, setSurname] = useState({});


    useEffect(() => {
        if (id) getDriver();

        return () => {
            setDriver({});
            setError("");
        };

    }, [])


    const getDriver = () => {
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
    }

    const navigate = useNavigate();
    const goToDrivers = () => navigate(`/drivers`);

    const deleteDriver = () => {
        fetch(
            `${process.env.REACT_APP_BASE_URI}/driver/${id}`,
            {
                method: 'DELETE',
                headers:
                    {
                        'Authorization': token
                    }
            })
            .then(r => {
                if (r.ok) {
                    goToDrivers();
                }
                throw new Error("Unable to get data: " + r.statusText);
            })
            .catch((err) => setError(err.message))
    }

    const goToDriver = (id) => navigate(`/driver/${id}`);

    function postDriver(e) {
        e.preventDefault()

        const requestBody = {
            born: born,
            code: code,
            name: name,
            nationalilty: nationalilty,
            ref_name: ref_name,
            surename: surname

        }

        fetch(`${process.env.REACT_APP_BASE_URI}/driver`,
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
                goToDriver(json.id);
            })
            .catch((err) => {
                setError(err.message)
            });
    }


    return (
        <div>
            {driver.id ? <h1 style={{paddingTop: '2em'}}>Edit of: {driver.name}{driver.surename}</h1> :
                <h1 style={{paddingTop: '2em'}}>New driver</h1>}
            {driver.id ?
                <Button variant="danger" onClick={() => {
                    if (window.confirm('Are you sure you wish to delete this item?')) deleteDriver()
                }}>Delete driver</Button> : ''
            }

            {!driver.id ?

                <div className={'form mt-3'}>
                    <Form onSubmit={postDriver}>
                        <Form.Group controlId="formName">
                            <Form.Control type={"text"} placeholder={"Driver name"} onChange={e => {
                                setName(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formSurname" className={'mt-3'}>
                            <Form.Control type={"text"} placeholder={"Driver surname"} onChange={e => {
                                setSurname(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formRefName" className={'mt-3'}>
                            <Form.Control type={"text"} placeholder={"Driver ref name"} onChange={e => {
                                setRef_name(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formCode" className={'mt-3'}>
                            <Form.Control type={"text"} placeholder="Driver code" onChange={e => {
                                setCode(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formBorn" className={'mt-3'}>
                            <Form.Control type={"number"} placeholder={"Driver born year"} onChange={e => {
                                setBorn(e.target.value);
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="formNationalilty" className={'mt-3'}>
                            <Form.Control type={"text"} placeholder="Driver nationality" onChange={e => {
                                setNationalilty(e.target.value);
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

export default DriverForm;
