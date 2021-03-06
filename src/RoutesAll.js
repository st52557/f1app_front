import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignUp from "./components/User/Singup";
import LoginForm from "./components/User/LoginForm";
import Home from "./components/Home/Home";
import Logout from "./components/User/Logout";
import Races from "./components/Race/Races";
import Drivers from "./components/Driver/Drivers";
import Results from "./components/Result/Results";
import Race from "./components/Race/Race";
import Driver from "./components/Driver/Driver";
import CompareDrivers from "./components/Driver/CompareDrivers";
import RaceForm from "./components/Race/RaceForm";
import Result from "./components/Result/Result";
import ResultForm from "./components/Result/ResultForm";
import DriverForm from "./components/Driver/DriverForm";

const RoutesAll = () => (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/races" element={<Races/>}/>
        <Route path="/drivers" element={<Drivers/>}/>
        <Route path="/results" element={<Results/>}/>

        <Route exact path='/compare' element={<CompareDrivers/>}/>

        <Route exact path='/race/:id' element={<Race/>}/>
        <Route exact path='/driver/:id' element={<Driver/>}/>
        <Route exact path='/result/:id' element={<Result/>}/>

        <Route exact path='/race/:id/edit' element={<RaceForm/>}/>
        <Route exact path='/race/new' element={<RaceForm/>}/>

        <Route exact path='/driver/:id/edit' element={<DriverForm/>}/>
        <Route exact path='/driver/new' element={<DriverForm/>}/>

        <Route exact path='/result/:id/edit' element={<ResultForm/>}/>
        <Route exact path='/result/new' element={<ResultForm/>}/>


        {/*<Route exact path='/result/:id' element={<Race/>}/>*/}
    </Routes>
);

export default RoutesAll;