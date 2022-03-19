import React from 'react';
import {Route, Routes } from 'react-router-dom';
import SignUp from "./components/User/Singup";
import LoginForm from "./components/User/LoginForm";
import Home from "./components/Home/Home";
import Logout from "./components/User/Logout";
import Races from "./components/Race/Races";

const RoutesAll = () => (
    <Routes >
        <Route exact path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/races" element={<Races/>} />

    </Routes >
);

export default RoutesAll;