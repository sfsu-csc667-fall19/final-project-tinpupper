import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const options = {
  withCredentials: true,
};

const Business = () => {
  const [restaurantName, setRestaurantName] = React.useState('');
  const [restaurantDescription, setRestaurantDescription] = React.useState('');

  const body = {
    name: restaurantName,
    description: restaurantDescription,
  };

  const createNewRestaurant = () => {
    console.log(body);
    axios.post('/restaurant', body, options).then(res => {});
    const data = {
      newRestaurant: body,
    };

    /****************
     * JOHN (12/10/2019): Removed
     ****************/
    // window.ws.send(JSON.stringify(data));
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
  );
};



export default Business;
