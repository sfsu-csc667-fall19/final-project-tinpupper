import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import UserLogin from "./pages/UserLogin";
import "./App.css";

const App = () => {
	return (
		<div className="App">
			<div id="navlink-div" className = "flex-display-row justify-content-space-evenly padding-2-p border-bottom">
				<NavLink to="/">Home </NavLink>
				<NavLink to="/writereview">Write a review </NavLink>
				<NavLink to="/settings"> Settings </NavLink>
				<NavLink to="/business"> Business </NavLink>
				<NavLink to="/login"> Login </NavLink>
				<NavLink to="/join"> Join </NavLink>
				<NavLink to="/signout"> Signout </NavLink>
				<NavLink to="/adfasdf">dajakdnfajkdnf</NavLink>
			</div>
			<Switch>
				<Route path="/writereview" />
				<Route path="/settings" />
				<Route path="/business" />
				<Route path="/adfasdf" component={UserLogin} />
				<Route path="/login" component={Login} />
				<Route path="/join" component = {Signup}/>
 				<Route exact path="/" component={Home} />
			</Switch>
		</div>
	);
};

export default App;
