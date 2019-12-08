import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Redirect, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {
    setIsLoggedIn,
    setUsername,
    setIsBusiness
} from "../redux/actions/userActions";
import { setCurrentBusiness } from "../redux/actions/businessActions";
import { setIsLoggedIn, setUsername } from "../redux/actions/userActions";
// import { setCurrentBusiness } from "../redux/actions/businessActions";

const options = {
    withCredentials: true
};

const Reviews = ({
    dispatch,
    isBusiness,
    isLoggedIn,
    username,
    currentBusiness
}) => {
    React.useEffect(() => {
        axios.post("/auth/cookies", options).then(res => {
            console.log(res);
            if (res.data.message === "Successfully authenticated") {
                dispatch(setIsBusiness(res.data.user.isBusiness));
                dispatch(setUsername(res.data.user.username));
                dispatch(setIsLoggedIn(true));
            }
        });
        axios.post("/restaurant", options).then(res => {
            console.log(res);
        })
    }, []);


    return (
        <div>
            <div>
                <h2>HELP! A yelp like application.</h2>
            </div>
            <div>
                {isLoggedIn ?
                (<div>
        {!isBusiness ? (
                <div>
                    <h3>
                        Hello, {username} <br />
                    </h3>
                ):
                 (
                    <h3>Welcome to your business account, {username}</h3>
                )
                 </div>
                }
                ) :(

                    <h3><Link to="/login"> Please Login to write a review </Link></h3>
                    )

                </div>
             }
            </div>
            <div>
                {currentBusiness ? (
                    <div>You are currently reviewing <b>{currentBusiness}</b></div>
                ) : (
                    <div>You are not currently reviewing any business</div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    businesses: state.businessReducer.businesses,
    isLoggedIn: state.userReducer.isLoggedIn,
    isBusiness: state.userReducer.isBusiness,
    currentBusiness: state.businessReducer.currentBusiness,
    username : state.userReducer.username,
});

export default withRouter(connect(mapStateToProps)(Reviews));
