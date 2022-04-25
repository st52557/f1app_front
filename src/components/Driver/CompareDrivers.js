import React, {useEffect, useState, Component, useMemo} from "react";
import {Col, Row, Container} from "react-bootstrap";
import './Driver.scss'
import {useAuth} from "../User/AuthContext";
import Select from 'react-select'

function CompareDrivers() {

    const {token} = useAuth();
    const [drivers, setDrivers] = useState([]);
    const [selected1, setSelected1] = useState({});
    const [selected2, setSelected2] = useState({});
    const [comparedDrivers, setComparedDrivers] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {

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
                throw new Error("Unable to get data: " + r.statusText);
            })
            // .then(response => response.json())
            .then(json => {

                setDrivers((json.map(({id, name, surename}) => ({value: id, label: name + " " + surename}))));

            })
            .catch((err) => setError(err.message))

    }, [])

    const compareDrivers = () => {
        fetch(`${process.env.REACT_APP_BASE_URI}/drivers-compare?firstDriverId=${encodeURIComponent(selected1.value)}&secondDriverId=${encodeURIComponent(selected2.value)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(`Unable to get data: ${response.statusText}`)
            })
            .then(json => {
                setComparedDrivers(json);
            })
            .catch((err) => {
                setError(err.message)
            });
    }

    useEffect(() => {

        if (selected1.value && selected2.value) {
            compareDrivers();
        }

    }, [selected1, selected2])


    const selectSecondDriver = (selectedOption) => {
        setSelected2(selectedOption);
    };

    const selectFirstDriver = (selectedOption) => {
        setSelected1(selectedOption);
    };


    return (

        <div>
            <h1 style={{paddingTop: '2em',paddingBottom: '2em'}}>Comparing drivers</h1>

            <div className={"compare-drivers"}>
                <Container>
                    <Row className={"justify-content-md-center"}>
                        <Col className={"compared-driver"}>
                            <div>
                                <Select
                                    options={drivers}
                                    value={selected1}
                                    onChange={selectFirstDriver}
                                />
                                <br/>
                                {comparedDrivers &&
                                <div>
                                    <p>Overtakes: {comparedDrivers?.overtakes?.firstDriver}</p>
                                    <p>Points: {comparedDrivers?.pointsScored?.firstDriver}</p>
                                    <p>Wins: {comparedDrivers?.racesWon?.firstDriver}</p>
                                </div>
                                }
                            </div>
                        </Col>
                        <Col className={"compared-driver"}>
                            <div>
                                <Select
                                    options={drivers}
                                    value={selected2}
                                    onChange={selectSecondDriver}
                                />
                                <br/>
                                {comparedDrivers &&
                                <div>
                                    <p>Overtakes: {comparedDrivers?.overtakes?.secondDriver}</p>
                                    <p>Points: {comparedDrivers?.pointsScored?.secondDriver}</p>
                                    <p>Wins: {comparedDrivers?.racesWon?.secondDriver}</p>
                                </div>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    )


}

export default CompareDrivers;
