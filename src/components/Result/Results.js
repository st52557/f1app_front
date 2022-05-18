import React, {useEffect, useState} from 'react';
import './Result.scss'
import {useAuth} from "../User/AuthContext";
import {Button, Container} from "react-bootstrap";
import MyDataGrid from "../Home/DataGrid";
import {useNavigate} from "react-router-dom";

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
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currPage, setCurrPage] = useState(1);


    useEffect(() => {
        handleFetchResults();

    }, [perPage, currPage])




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
            goToResultDetail(row.id);
        }, time_dbclick);


    };

    const navigate = useNavigate();
    const goToResultDetail = (id) => navigate(`/result/${id}`);
    const goToResultEdit = (id) => navigate(`/result/${id}/edit`);
    const goToResultNew = () => navigate(`/result/new`);


    const handleDoubleClick = (row) => {
        setEditRow(row);
        goToResultEdit(row.id);
    };

    const handleFetchResults = () => {
        setLoading(true);

        fetch(`${process.env.REACT_APP_BASE_URI}/results?page=${currPage}&size=${perPage}`,
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
                setResults(json.content)
                setTotalRows(json.totalElements);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message)
            });

    };

    const onPageChanged = async (page) => {

        setCurrPage(page);

    };

    const onRowsChange = async (newPerPage) => {

        setPerPage(newPerPage);

    };



    return (
        <div id={'results'}>
            <h1 style={{paddingTop: '2em'}}>Results</h1>

            <Container>
                <div>
                    <h4>Table of Results</h4>
                    <div className="results-table">
                        {admin==='true' ? <Button variant="success" onClick={goToResultNew}>New result</Button> : ''}
                        <MyDataGrid
                            columns={columns}
                            data={results}
                            onRowClicked={token ? handleClick : undefined}
                            onRowDoubleClicked={admin==='true' ? handleDoubleClick : undefined}

                            progressPending={loading}
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={onRowsChange}
                            onChangePage={onPageChanged}

                        />
                    </div>
                </div>
            </Container>
        </div>
    )

}

export default Results;