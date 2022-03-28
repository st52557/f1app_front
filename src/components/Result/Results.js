import React, {useEffect, useState} from 'react';
import './Result.scss'
import {useAuth} from "../User/AuthContext";
import {Container} from "react-bootstrap";
import MyDataGrid from "../Home/DataGrid";

const columns = [
    {
        name: 'Year',
        selector: row => row.race.year,
        sortable: true,
    },
    {
        name: 'Race',
        selector: row => row.race.circuit,
        sortable: true,
    },
    {
        name: 'Driver',
        selector: row => row.driver.name + " " + row.driver.surename,
        sortable: true,
    },
    {
        name: 'Start position',
        selector: row => row.positionStart,
        sortable: true,
    },
    {
        name: 'Final position',
        selector: row => row.positionFinal,
        sortable: true,
    },
    {
        name: 'Points',
        selector: row => row.points,
        sortable: true,
    },

];

function Results() {

    const {token} = useAuth();
    const [error, setError] = useState("");
    const [results, setResults] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [editRow, setEditRow] = useState([]);
    const {admin} = useAuth();

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URI}/results`,
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
                setResults(json)
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
            clicked = 0;
        }, time_dbclick);


    };

    const handleDoubleClick = (row) => {
        setEditRow(row);
    };

    return (
        <div id={'results'}>
            <h1 style={{paddingTop: '2em'}}>Results</h1>

            <Container>
                <div>
                    <h4>Table of Results</h4>
                    <div className="results-table">
                        <MyDataGrid
                            columns={columns}
                            data={results}
                            onRowClicked={token ? handleClick : undefined}
                            onRowDoubleClicked={admin==='true' ? handleDoubleClick : undefined}
                        />
                    </div>
                </div>
            </Container>
        </div>
    )

}

export default Results;