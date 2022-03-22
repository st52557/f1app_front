import React, {useEffect, useState} from 'react';
import {useAuth} from "../User/AuthContext";
import {Container} from "react-bootstrap";
import MyDataGrid from "../Home/DataGrid";
import {useNavigate} from "react-router-dom";
import './Race.scss'

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
    const [editRow, setEditRow] = useState([]);
    const {admin} = useAuth();

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

    var pendingClick;
    var clicked = 0;
    var time_dbclick = 300

    const handleClick = (row) => {
        clicked++;
        if(clicked >= 2){
            clearTimeout(pendingClick)
            clicked = 0;
            return;
        }
        clearTimeout(pendingClick)
        pendingClick = setTimeout(() => {
            setSelectedRow(row);
            console.log("Single click: ", row.circuit);
            clicked = 0;
            goToRaceDetail(row.id);
        }, time_dbclick);
    };

    const navigate = useNavigate();
    const goToRaceDetail = (id) => navigate(`/race/${id}`);

    const handleDoubleClick = (row) => {
        setEditRow(row);
        console.log("Double click: ", row.circuit);
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
                            onRowClicked={token ? handleClick : undefined}
                            onRowDoubleClicked={admin ? handleDoubleClick : undefined}
                        />
                    </div>
                </div>
            </Container>
        </div>
    )

}

export default Races;