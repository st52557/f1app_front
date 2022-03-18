import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import {Alert, Button, Container, Form} from "react-bootstrap";

function SignUp() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [signedUp, setSignedUp] = useState(false);

    function signUpHandler(e) {
        e.preventDefault();

        if (password !== confirmedPassword) {
            setError("Passwords do not match.");
            return;
        }

        const newUser = {
            name: name,
            password: password,
            email: email
        }

        fetch(`${process.env.REACT_APP_BASE_URI}/user/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(response => {
                if (response.ok) {
                    setSignedUp(true);
                    return;
                }
                throw new Error(`Unable to get data: ${response.statusText}`);
            })
            .catch((err) => {
                setError(err.message);
            })
    }

    if (signedUp) {
        return <Navigate to="/"/>;
    }
    else {
        return (
            <div className={'form'}>
                <Form onSubmit={signUpHandler}>
                    <Form.Group controlId="formUsername">
                        <Form.Control placeholder={"Username"} type={"text"} onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group controlId="formEmail" className={'mt-3'}>
                        <Form.Control placeholder={"E-Mail"} type={"email"} onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword" className={'mt-3'}>
                        <Form.Control placeholder={"Password"} type={"password"} onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword" className={'mt-3'}>
                        <Form.Control placeholder={"Confirm password"} type={"password"} onChange={(e) => {
                            setConfirmedPassword(e.target.value)
                        }}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className={'mt-3'}>
                        Submit
                    </Button>
                </Form>

                <Alert hidden={!error} type={"danger"}>
                    {error}
                </Alert>

            </div>
        )
    }
}

export default SignUp;