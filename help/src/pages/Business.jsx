import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {
  setIsLoggedIn,
  setIsBusiness,
  setUsername
} from "../redux/actions/userActions";
const options = {
  withCredentials: true
};

const Business = ({ dispatch, username, isLoggedIn, isBusiness }) => {
  const [restaurantName, setRestaurantName] = React.useState("");
  const [restaurantDescription, setRestaurantDescription] = React.useState("");

  React.useEffect(() => {
    axios.post("/auth/cookies", options).then(res => {
      if (res.data.message === "Successfully authenticated") {
        dispatch(setUsername(res.data.user.username));
        dispatch(setIsLoggedIn(true));
        dispatch(setIsBusiness(res.data.user.isBusiness));
      }
    });
  }, []);

  const body = {
    name: restaurantName,
    description: restaurantDescription
  };

  const createNewRestaurant = () => {
    console.log(body);
    axios.post("/restaurant", body, options).then(res => {});
    const data = {
      newRestaurant: body
    };

    /****************
     * JOHN (12/10/2019): Removed
     ****************/
    // window.ws.send(JSON.stringify(data));
  };

  return (
    <div>
      {isLoggedIn && isBusiness ? (
        <div>
          <h1> Create Business</h1>
          <br></br>
          <label>
            Restaurant Name:
            <input
              type="text"
              className="form-control"
              onChange={e => {
                setRestaurantName(e.target.value);
              }}
              placeholder="Desired restaurant(s)"
            />
          </label>
          <br />

          <label>
            Restaurant Description:
            <input
              type="text"
              className="form-control"
              onChange={e => {
                setRestaurantDescription(e.target.value);
              }}
              placeholder="Description of restaurant(s)"
            />
          </label>
          <br />

          <button
            onClick={() => {
              createNewRestaurant();
            }}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <br />

          <h3>
            <Link to="/login" style={{ color: "red" }}>
              You cannot access this site. Please login or Signup
            </Link>
          </h3>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.userReducer.username,
  isLoggedIn: state.userReducer.isLoggedIn,
  isBusiness: state.userReducer.isBusiness
});

export default connect(mapStateToProps)(Business);
