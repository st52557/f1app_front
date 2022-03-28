import React, {useEffect, useState} from 'react';
import './Driver.scss'
import {useAuth} from "../User/AuthContext";
import {Container} from "react-bootstrap";
import MyDataGrid from "../Home/DataGrid";

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Surername',
        selector: row => row.surename,
        sortable: true,
    },
    {
        name: 'Code',
        selector: row => row.code,
        sortable: true,
    },
    {
        name: 'Ref',
        selector: row => row.ref_name,
        sortable: true,
    },
    {
        name: 'Nationality',
        selector: row => row.nationalilty,
        sortable: true,
    },
    {
        name: 'Born',
        selector: row => row.born,
        sortable: true,
    },
];

function Drivers() {

    const {token} = useAuth();
    const [error, setError] = useState("");
    const [drivers, setDrivers] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [editRow, setEditRow] = useState([]);
    const {admin} = useAuth();

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
            .then(json => {
                setDrivers(json)
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
            console.log("Single click: ", row.name);
            clicked = 0;
        }, time_dbclick);


    };

    const handleDoubleClick = (row) => {
        setEditRow(row);
        console.log("Double click: ", row.name);
    };

    return (
        <div id={'drivers'}>
            <h1 style={{paddingTop: '2em'}}>Drivers {admin}</h1>

            <Container>
                <div>
                    <h4>Table of Drivers</h4>
                    <div className="drivers-table">
                        <MyDataGrid
                            columns={columns}
                            data={drivers}
                            onRowClicked={token ? handleClick : undefined}
                            onRowDoubleClicked={admin==='true' ? handleDoubleClick : undefined}
                        />
                    </div>
                </div>
            </Container>
        </div>
    )

}

export default Drivers;