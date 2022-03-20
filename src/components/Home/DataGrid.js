import React from 'react';
import DataTable from 'react-data-table-component'; // https://www.npmjs.com/package/react-data-table-component/v/7.0.0-rc1
import ArrowDownward from '@material-ui/icons/ArrowDownward';

import './Home.scss'

const sortIcon = <ArrowDownward />;


function MyDataGrid(props) {

    return (

        <DataTable
            pagination
            sortIcon={sortIcon}
            pointerOnHover
            highlightOnHover
            {...props}
        />

    )

}

export default MyDataGrid;