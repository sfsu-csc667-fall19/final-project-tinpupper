import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { setIsLoggedIn, setIsBusiness, setUsername } from '../redux/actions/userActions';
import {
  setIsRedirect,
  setCurrentBusiness,
  setBusinesses,
  getUpdatedBusinessesAsync,
  setBusinessesId,
  setOwnedBusinesses
} from "../redux/actions/businessActions";

const options = {
  withCredentials: true,
};

const Business = ({ dispatch, username, isLoggedIn, isBusiness, isRedirect }) => {
  const [restaurantName, setRestaurantName] = React.useState('');
  const [restaurantDescription, setRestaurantDescription] = React.useState('');
  const [ownedRestaurants, setOwnedRestaurants] = React.useState([]);

  React.useEffect(() => {
    axios.post('/auth/cookies', options).then(res => {
      if (res.data.message === 'Successfully authenticated') {
        console.log('authenticated');
        dispatch(setUsername(res.data.user.username));
        dispatch(setIsLoggedIn(true));
        dispatch(setIsBusiness(res.data.user.isBusiness));
      }
    });
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn) return;

    console.log('check is logged in');
    console.log(isLoggedIn);

    // Get logged in user information
    axios.post('/auth/cookies', options).then(async res => {
      console.log('logged in so check');
      console.log(res.data.user.restaurantIds);

      const ids = res.data.user.restaurantIds;
      const restaurants = []; // Temporarly store restaurant objects here

      const promises = [];

      // Now we need to get the restaurant Ids for that user and use that to
      // make an axios get request for each restaurant
      ids.map(id => {
        promises.push(
          axios.get(`/restaurant/${id}`).then(res => {
            console.log('add');
            console.log(res.data);
            restaurants.push(res.data);
            console.log(restaurants);
          }),
        );
      });

      await Promise.all(promises);

      console.log('setting owned restaursnts');
      console.log(restaurants);
      console.log(restaurants.length);
      console.log(ownedRestaurants);
      setOwnedRestaurants(oldArray => [...oldArray, ...restaurants]);
    });
  }, [isLoggedIn]);

  const body = {
    name: restaurantName,
    description: restaurantDescription,
  };

  const createNewRestaurant = async () => {
    console.log(body);
    await axios.post('/restaurant', body, options).then(res => {});
    const data = {
      newRestaurant: body,
    };
    window.location.href= "/business";
      // <Redirect to ="/business"></Redirect>
  };

   if (isRedirect) {
     console.log(isRedirect);
     dispatch(setIsRedirect(false));
     return <Redirect to="/writereview" />;
   }

  const renderOwnedRestaurants = () => {
    if (!ownedRestaurants || !ownedRestaurants.length || ownedRestaurants.length <= 0) return;
    console.log('trying to render owned restaurants');
    console.log(ownedRestaurants);
    return ownedRestaurants.map(restaurant => {
      console.log('test');
      return (
        // <div
        //   key={`${restaurant.name} & ${restaurant.ownerId}`}
        //   style={{ marginTop: '30px', marginBottom: '30px', backgroundColor: 'grey' }}
        // >
        //   <h1>Name: {restaurant.name}</h1>
        //   <p>Description: {restaurant.description}</p>
        //   <p>OwnerId: {restaurant.ownerId}</p>
        //   <p>ReviewIds: {restaurant.reviewIds}</p>
        // </div>
        <div
          key={`${restaurant.name} & ${restaurant.ownerId}`}
          className="display-row padding-2-p"
        >
          <Card style={{ width: "18rem" }}>
            <Card.Img src={require("../img/Mcdonalds.jpg")} />{" "}
            {/* will be replaced by business.img if thats doable*/}
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>{" "}
              {/* will be replaced by business.name or something*/}
              <Card.Text>
                {/* will be replaced by business.text */}
                {restaurant.description}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  dispatch(setCurrentBusiness(restaurant.name));
                  dispatch(setIsRedirect(true));
                }}
              >
                Read reviews
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    });
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
          <h3>Business that you own:</h3>
          <div>{renderOwnedRestaurants()}</div>
        </div>
      ) : (
        <div>
          <br />
          <h3>
            <Link to="/login" style={{ color: 'red' }}>
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
  isBusiness: state.userReducer.isBusiness,
  isRedirect: state.businessReducer.isRedirect,
});

export default connect(mapStateToProps)(Business);
