import React from 'react';
import {useAuth} from "../User/AuthContext";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import './Home.scss'

function MyNavbar() {

    const {user} = useAuth();

    return (
        <Navbar className={'my-navbar'} collapseOnSelect expand="lg">
            <Navbar.Brand as={Link} to="/">SEM-F1</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                    <Nav.Link href="/races">Races</Nav.Link>
                    <Nav.Link href="#drivers">Drivers</Nav.Link>
                    <Nav.Link style={{paddingRight: '30px'}} href="#results">Results</Nav.Link>

                    {user ?
                        <NavDropdown drop={'start'} title={user.sub} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#changepass">Change password</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                        :
                        <>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signup">Register</Nav.Link>
                        </>

                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default MyNavbar;