import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setIsLoggedIn, setUsername } from "../redux/actions/userActions";
// import { setCurrentBusiness } from "../redux/actions/businessActions";

const options = {
    withCredentials: true
};


const Reviews = ({ dispatch, isBusiness, isLoggedIn, username, currentBusiness }) => {

    return (
        <div>
            <div>
                <h2>HELP! A yelp like application.</h2>
            </div>
            <div>
                {isLoggedIn && !isBusiness && (
                    <h3>
                        Hello, {username} <br />
                    </h3>
                )}
                {isLoggedIn && isBusiness && (
                    <h3>Welcome to your business account, {username}</h3>
                )}
            </div>
            <div>
                {currentBusiness ? (
                    <div>You are currently reviewing {currentBusiness}</div>)
                 : (<div>You are not currently reviewing any business</div>)}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    businesses: state.businessReducer.businesses,
    isLoggedIn: state.userReducer.isLoggedIn,
    isBusiness: state.userReducer.isBusiness,
    currentBusiness: state.businessReducer.currentBusiness,
});

export default withRouter(connect(mapStateToProps)(Reviews));
