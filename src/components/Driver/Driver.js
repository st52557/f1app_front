import './Driver.scss'
import React, {useEffect} from "react";
import {Container} from "react-bootstrap";

function Driver(props) {



    useEffect(() =>{
    });


    return (
        <div>
            <h1 style={{paddingTop: '2em'}}>Driver detail</h1>

            <Container>
                <div>
                    <h4>{props}</h4>
                    <div>

                    </div>
                </div>
            </Container>
        </div>
    )


}

export default Driver;
