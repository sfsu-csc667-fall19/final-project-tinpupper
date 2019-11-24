import React from 'react';
import logo from './logo.svg';
import {Switch, Route, NavLink} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
    	<div id= "navlink-div">
        <NavLink to= "/">Home </NavLink>
        <NavLink to="/writereview">Write a review </NavLink>
        <Navlink to="/settings"> Settings </NavLink>
        <NavLink to="/business"> Business </NavLink>
		<Navlink to="/login"> Login </NavLink>
		<NavLink to="/join"> Sign up </NavLink>
		</div>
		<Switch>

		<Route path="/writereview" />
		<Route path="/settings" />
		<Route path="/business" />
		<Route path="/login" />
		<Route path="/join" />
		<Route path="/" />

		</Switch>

    </div>
  );
}

export default App;
