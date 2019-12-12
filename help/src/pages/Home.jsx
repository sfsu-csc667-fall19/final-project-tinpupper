import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsLoggedIn, setUsername, setIsBusiness } from '../redux/actions/userActions';
import {
  setIsRedirect,
  setCurrentBusiness,
  setBusinesses,
  getUpdatedBusinessesAsync,
  setBusinessesId,
  setOwnedBusinesses,
} from '../redux/actions/businessActions';

const ws = new WebSocket('ws://167.172.249.188:3004/websocket');

const options = {
  withCredentials: true,
};

const Home = ({
  dispatch,
  businesses,
  isBusiness,
  isLoggedIn,
  username,
  isRedirect,
  businessesId,
  ownedBusinesses,
}) => {
  // *********************************************************************************
  // JOHN:
  // We will use isBusinessLoaded to determine whether businesses contains data or not.
  //
  // The reason why businesses.map is NULL (or .map is undefined), is because axios.get is still trying to get the businesses, so your
  // showing data that doesn't exist yet.
  // *********************************************************************************
  const [isBusinessLoaded, setIsBusinessLoaded] = React.useState(false); // JOHN: False means hasn't loaded business yet

  React.useEffect(() => {
    // const ownedBusinessListings = async () => {
    axios.post('/auth/cookies', options).then(res => {
      console.log('AC', res);
      if (res.data.message === 'Successfully authenticated') {
        // debugger;
        dispatch(setUsername(res.data.user.username));
        dispatch(setIsBusiness(res.data.user.isBusiness));
        dispatch(setIsLoggedIn(true));
        console.log('The is business', isBusiness);
        // if (res.data.user.restaurantIds && res.data.user.isBusiness) {
        //   dispatch(setBusinessesId(res.data.user.restaurantIds));
        // }
        // console.log("asdffffffffffffffff", businessesId);
      }
    });
  }, []);

  // React.useEffect(() => {
  //   const showBusinesses = async () => {
  //     console.log("IN show business");
  //     console.log("bid in sb", businessesId);
  //     let ownedBusinessesLocal = [];
  //     businessesId.map(bid => {
  //       axios.get(`/restaurant/${bid}`, options).then(res => {
  //         // console.log(res.data.name);
  //         ownedBusinessesLocal.push({
  //           name: res.data.name,
  //           description: res.data.description
  //         });
  //       });
  //     });
  //     console.log("adfadfadf", ownedBusinessesLocal);
  //     // await dispatch(setBusinesses(ownedBusinessesLocal));
  //     // console.log(businesses);
  //   };
  //   showBusinesses();
  // }, [businessesId]);

  React.useEffect(() => {
    axios.get('/restaurant', options).then(res => {
      console.log('The res from /restaurant ', res);
      console.log('working?');

      if (res.data.message === 'Restaurants found') {
        dispatch(setBusinesses(res.data.restaurants));
      }
    });

    ws.onmessage = message => {
      console.log(`This is the message: `, message.data);
      switch (message.data) {
        // A restaurant was created, so refresh restaurant list
        case 'updateRestaurant':
          console.log('This is called when a POST request is made to the restaurant');
          dispatch(getUpdatedBusinessesAsync());
          break;
        default:
          break;
      }
    };
  }, []);

  React.useEffect(() => {
    // *********************************************************************************
    // JOHN:
    // If the length is greater than > 0 then it means it has data (not empty)
    // We also check if businesses.restaurants is not NULL because that can also be NULL
    // *********************************************************************************
    if (businesses && businesses.length > 1) {
      console.log('set to true');
      setIsBusinessLoaded(true);
    } else {
      console.log('LESS');
      setIsBusinessLoaded(false);
    }
  }, [businesses]);

  if (isRedirect) {
    console.log(isRedirect);
    dispatch(setIsRedirect(false));
    return <Redirect to="/writereview" />;
  }
  return (
    <div>
      <div>
        <h2>HELP! A yelp like application.</h2>
      </div>
      <div>
        {isLoggedIn && !isBusiness && (
          <h3>
            Hello, <b>{username} </b>
            <br></br>
            Write a review for these restaurants!
          </h3>
        )}
        {isLoggedIn && isBusiness && (
          <div>
            <h3>
              Welcome to your business account, <b>{username}</b>:
              <br />
            </h3>
            <Link to="/business">
              <u>
                <k style={{ size: '0.5rem' }}>Click here to view your business or Create a new one!</k>
              </u>
            </Link>
          </div>
        )}
        <br />
      </div>
      {/* ********************************************************************************* */}
      {/* JOHN: */}
      {/* Here I added a check for whether the isBusinessLoaded is true or not  */}
      {/* If it's true, then display the data, if not, then don't run .map else it will give .map undefined error */}
      {/*  																					*/}
      {/* Note that I changed businesses.map to businesses.restaurants.map */}
      {/* ********************************************************************************* */}
      {/* {!isBusiness && ( */}
      <div>
        {businesses.map((business, i) => (
          <div key={i} className="display-row padding-2-p">
            <Card style={{ width: '18rem' }}>
              <Card.Img src={require('../img/Mcdonalds.jpg')} /> {/* will be replaced by business.img if thats doable*/}
              <Card.Body>
                <Card.Title>{business.name}</Card.Title> {/* will be replaced by business.name or something*/}
                <Card.Text>
                  {/* will be replaced by business.text */}
                  {business.description}
                </Card.Text>
                {!isBusiness ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      console.log(business);
                      /*********************************************************
                       * JOHN (12/10/2019):
                       * CHANGES HERE
                       *********************************************************/
                      dispatch(setCurrentBusiness(business));
                      console.log(businesses);
                      dispatch(setIsRedirect(true));
                    }}
                  >
                    Write a review
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => {
                      dispatch(setCurrentBusiness(business));
                      console.log(businesses);
                      dispatch(setIsRedirect(true));
                    }}
                  >
                    Read review
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  businesses: state.businessReducer.businesses,
  isLoggedIn: state.userReducer.isLoggedIn,
  isBusiness: state.userReducer.isBusiness,
  username: state.userReducer.username,
  isRedirect: state.businessReducer.isRedirect,
  businessesId: state.businessReducer.businessesId,
  ownedBusinesses: state.businessReducer.ownedBusinesses,
});

export default connect(mapStateToProps)(Home);
