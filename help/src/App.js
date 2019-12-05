import React from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import UserLogin from "./pages/UserLogin";
import axios from "axios";
import "./App.css";
import { setIsLoggedIn } from "./redux/actions/userActions.js";
import { connect } from "react-redux";

const options = {
  withCredentials: true
};

const App = ({ isLoggedIn, dispatch, isBusiness, isSignedUp }) => {
  const logOutUser = () => {
    document.clearCookie("username");
    document.clearCookie("password");
    // dispatch(setIsLoggedIn(false));
    // window.location.href= "//";
  };
  return (
    <div className="App">
      <div
        id="navlink-div"
        className="flex-display-row justify-content-space-evenly padding-2-p border-bottom"
      >
        <NavLink to="/">Home </NavLink>
        {!isBusiness &&(<NavLink to="/writereview">Write a review </NavLink>)}
        <NavLink to="/settings"> Settings </NavLink>
        {isBusiness &&<NavLink to="/business"> Business </NavLink>}
        {!isLoggedIn && <NavLink to="/login"> Login </NavLink>}
        {!isLoggedIn && <NavLink to="/join"> Join </NavLink>}

        <button
          className="btn btn-primary"
          onClick={() => {
            logOutUser();
          }}
        >
          Log Out
        </button>
      </div>
      <Switch>
        <Route path="/writereview" />
        <Route path="/settings" />
        <Route path="/business"/>
        <Route path="/login" component={Login} />
        <Route path="/join" component={Signup} />

        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  isBusiness: state.userReducer.isBusiness,
  isSignedUp: state.userReducer.isSignedUp,
});

export default connect(mapStateToProps)(App);
