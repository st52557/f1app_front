import React, {useEffect, useState} from 'react';
import './Race.scss'
import {useAuth} from "../User/AuthContext";
import {Container} from "react-bootstrap";
import MyDataGrid from "../Home/DataGrid";

const columns = [
    {
        name: 'Circuit',
        selector: row => row.circuit,
        sortable: true,
    },
    {
        name: 'Round',
        selector: row => row.round,
        sortable: true,
    },
    {
        name: 'Year',
        selector: row => row.year,
        sortable: true,
    },
];

function Races() {

    const {token} = useAuth();
    const [error, setError] = useState("");
    const [races, setRaces] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);

    useEffect(() => {
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
                throw new Error("Unable to get data: " + r.statusText);
            })
            .then(json => {
                setRaces(json)
            })
            .catch((err) => setError(err.message))
    }, [])

    const handleClick = (row) => {
        setSelectedRow(row);
        console.log(row);
    };

    return (
        <div id={'races'}>
            <h1 style={{paddingTop: '2em'}}>Races</h1>

            <Container>
                <div>
                    <h4>Table of Races</h4>
                    <div className="race-table">
                        <MyDataGrid
                            columns={columns}
                            data={races}
                            onRowClicked={handleClick}
                        />
                    </div>
                </div>
            </Container>
        </div>
    )

}

export default Races;