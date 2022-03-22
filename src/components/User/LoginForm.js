import {Link, Navigate} from "react-router-dom";
import {useAuth} from "./AuthContext";
import React, {useState} from 'react';
import {Form, Button, Container, Row, Alert, Col} from 'react-bootstrap';
import './User.css'

function LoginForm() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const {setTokens} = useAuth();
    const {setAdmin} = useAuth();

    function postLogin(e) {
        e.preventDefault()

        const requestBody = {
            name: name,
            password: password
        }

        fetch(`${process.env.REACT_APP_BASE_URI}/user/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                setTokens(json);
                console.log(json.admin);
                setLoggedIn(true);
            })
            .catch((err) => {
                setIsError(err.message)
            });
    }

    if (loggedIn) {
        return (
            <Navigate to="/"/>
        )
    } else {
        return (
            <div className={'form'}>
                <Form onSubmit={postLogin}>
                    <Form.Group controlId="formUsername">
                        <Form.Control type={"text"} placeholder={"Username"} onChange={e => {
                            setName(e.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword" className={'mt-3'}>
                        <Form.Control type={"password"} placeholder="Password" onChange={e => {
                            setPassword(e.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group className={'reset-pass'}>
                        <Link to="/password-reset">I forgot my password</Link>
                    </Form.Group>
                    <Button variant="primary" type="submit" className={'mt-3 center'}>
                        Login
                    </Button>
                </Form>

                <Alert hidden={!isError} type={"danger"}>
                    {isError}
                </Alert>
            </div>
        )
    }
}

export default LoginForm;