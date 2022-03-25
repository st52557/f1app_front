import React, {useEffect, useState} from "react";
import {Col, Row, Container} from "react-bootstrap";
import './Driver.scss'
import {useAuth} from "../User/AuthContext";
import SelectSearch from "react-select-search";


function CompareDrivers() {

    const {token} = useAuth();
    const [drivers, setDrivers] = useState([]);
    const [selected1, setSelected1] = useState("");
    const [selected2, setSelected2] = useState("");
    const [driver1, setDriver1] = useState({});
    const [driver2, setDriver2] = useState({});
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

                setDrivers((json.map(({ id, name, surename }) => ({ value: id, name: name+" "+surename }))));

            })
            .catch((err) => setError(err.message))

    }, [])

    const getDriver = (id, first) => {

    }


    return (
        <div>
            <h1 style={{paddingTop: '2em'}}>Comparing drivers</h1>

            <div className={"compare-drivers"}>
                <Container>
                    <Row className={"justify-content-md-center"}>
                        <Col className={"compared-driver"}>
                            <div>
                                {/*<SelectSearch*/}
                                {/*    options={drivers}*/}
                                {/*    search*/}
                                {/*    placeholder="Select your country"*/}
                                {/*/> */}
                                <h4>1 -{driver1.name}</h4>

                                <div>

                                    {JSON.stringify(driver1, null, 2)}

                                </div>
                            </div>
                        </Col>
                        <Col className={"compared-driver"}>
                            <div >
                                <SelectSearch
                                    options={drivers}
                                    value={selected2}
                                    search
                                    placeholder="Select second driver"
                                    onChange={setSelected2}
                                />
                                <h4>2 - {driver2.name}</h4>

                                <div>
                                    {JSON.stringify(selected2,null,2)}
                                    {JSON.stringify(driver2, null, 2)}

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    )


}

export default CompareDrivers;
