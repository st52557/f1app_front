import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import './Driver.scss'
import {useParams} from "react-router-dom";
import {useAuth} from "../User/AuthContext";
import PointsGraph from "./PointsGraph";

function Driver() {

    const {id} = useParams();
    const {token} = useAuth();
    const [driver, setDriver] = useState({});
    const [sumPoints, setSumPoints] = useState({});

    useEffect(() => {
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
            .catch((err) => console.error(err))

        getSumPoints(id);

    }, [])

    const getSumPoints = (idParam) => {
        fetch(`${process.env.REACT_APP_BASE_URI}/result/sum/${idParam}`,
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
                const res = json.map((data) => ({...data, time: data.round + "_" + data.year}));
                setSumPoints(res);
            })
            .catch((err) => {
                console.error(err)
            });
    }

    return (
        <div id={"driver"}>
            <Container>

                <span id={"driver-name"}>{driver.name} {driver.surename}</span>

                <div>
                    <div>

                        <div className={"driver-info"}>
                            <div className={"driver-field"}>
                                <span>Code</span>
                                <span className={"driver-attribute"}>{driver.code}</span>
                            </div>

                            <div className={"driver-field"}>
                                <span>Nationality</span>
                                <span className={"driver-attribute"}>{driver.nationalilty}</span>
                            </div>

                            <div className={"driver-field"}>
                                <span>Born</span>
                                <span className={"driver-attribute"}>{driver.born}</span>
                            </div>
                        </div>

                        <br/>

                        <PointsGraph data={sumPoints} driver={driver}/>

                    </div>
                </div>
            </Container>
        </div>
    )


}

export default Driver;
