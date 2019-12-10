import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import {
  setRestaurantName,
  setRestaurantDescription
} from "../redux/actions/businessActions";
const options = {
  withCredentials: true
};

const Business = ({ dispatch, name, description }) => {
  //   const [restaurantName, setRestaurantName] = React.useState("");
  //   const [restaurantDescription, setRestaurantDescription] = React.useState("");

  const body = {
    name,
    description
  };

  const createNewRestaurant = () => {
    console.log(body);
    axios.post("/restaurant", body, options).then(res => {});
    const data = {
      type: "updateRestaurant",
      newRestaurant: body
    };
    // let data = {
    //     a : ""};
    window.ws.send(JSON.stringify());
  };

  return (
    <div>
      <h1> Create Business</h1>
      <br />
      <label>
        Restaurant Name:
        <input
          type="text"
          className="form-control"
          onChange={e => {
            dispatch(setRestaurantName(e.target.value));
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
            dispatch(setRestaurantDescription(e.target.value));
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
  );
};

const mapStateToProps = state => ({
    name : state.businessReducer.name,
    description : state.businessReducer.description
})


export default connect(mapStateToProps)(Business);
