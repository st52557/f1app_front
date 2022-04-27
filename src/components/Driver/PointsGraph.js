import React, {useEffect} from 'react';
import {AgChartsReact} from 'ag-charts-react';


function PointsGraph(props) {

    const data = props.data;
    const driver = props.driver;

    useEffect(() => {

    }, [props])


    const state = {
        options: {
            autoSize: true,
            title: {
                text: driver.name +" "+driver.surename,
            },
            subtitle: {
                text: 'Cumulative points gained',
            },
            data: data,
            series: [
                {
                    xKey: 'time',
                    yKey: 'cumPoints',
                    yName: 'Points'
                },
            ],
        },
    }

    return (
        <div>
            {data ?
                <div>

                    <AgChartsReact options={state.options}/>

                </div>
                : null}
        </div>

    )

}

export default PointsGraph;