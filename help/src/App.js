import React from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Reviews from "./pages/Reviews";
import UserLogin from "./pages/UserLogin";
import axios from "axios";
import "./App.css";
import Business from "./pages/Business"
import { setIsLoggedIn } from "./redux/actions/userActions.js";
import { connect } from "react-redux";

const options = {
  withCredentials: true
};

const App = ({ isLoggedIn, dispatch, isBusiness, isSignedUp }) => {
  const logOutUser = () => {
    document.cookie = "username=";
    document.cookie = "password=";
    // dispatch(setIsLoggedIn(false));
    window.location.href = "/";
  };
  return (
    <div className="App">
      <div
        id="navlink-div"
        className="flex-display-row justify-content-space-evenly padding-2-p border-bottom"
      >
        <NavLink to="/">Home </NavLink>
        {isBusiness && <NavLink to="/business"> Create a new Business </NavLink>}
        {!isLoggedIn && <NavLink to="/login"> Login </NavLink>}
        {!isLoggedIn && <NavLink to="/join"> Signup </NavLink>}
        {isLoggedIn && (
          <button
            className="btn btn-primary"
            onClick={() => {
              logOutUser();
            }}
          >
            Log Out
          </button>
        )}
      </div>
      <Switch>
        <Route path="/writereview" component={Reviews} />
        <Route path="/business" component={Business} />
        <Route path="/login" component={Login} />
        <Route path="/join" component={Signup} />
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  isBusiness: state.userReducer.isBusiness,
  isSignedUp: state.userReducer.isSignedUp
});

export default connect(mapStateToProps)(App);
