import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setIsLoggedIn, setUsername } from '../redux/actions/userActions';
// import { setCurrentBusiness } from "../redux/actions/businessActions";

/*********************************************************
 * JOHN (12/10/2019):
 * Lots of addition in Reviews
 *********************************************************/

const options = {
  withCredentials: true,
};

const styleTextArea = {
  marginTop: '20px',
  width: '50%',
};

const styleSubmit = {
  width: '50%',
};

const styleReviewForm = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const Reviews = ({ dispatch, isBusiness, isLoggedIn, username, currentBusiness }) => {
  const [reviewText, setReviewText] = React.useState('');

  const onSubmitReview = () => {
    const restaurantId = currentBusiness._id;
    console.log(restaurantId);

    const reviewBody = {
      restaurantId,
      text: reviewText,
    };

    // Send review
    axios
      .post('/review', reviewBody)
      .then(res => {
        // Trigger an alert
        alert('Review has been sent!');
        console.log('Review sent...');
        console.log(res);
      })
      .catch(e => {
        alert('Failed to send review');
        console.log(e);
      });
  };

  const onReviewChange = e => {
    setReviewText(e.target.value);
  };

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
        {isLoggedIn && isBusiness && <h3>Welcome to your business account, {username}</h3>}
      </div>
      <div>
        {currentBusiness ? (
          <div>You are currently reviewing {currentBusiness.name}</div>
        ) : (
          <div>You are not reviewing any business</div>
        )}
      </div>
      <div style={styleReviewForm}>
        <textarea
          onChange={onReviewChange}
          style={styleTextArea}
          rows="4"
          cols="30"
          placeholder="Enter your review"
          value={reviewText}
        ></textarea>
        <button className="btn btn-outline-dark" onClick={onSubmitReview}>Submit</button>
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
