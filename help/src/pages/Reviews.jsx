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
  const [loadedReviews, setLoadedReviews] = React.useState(false);
  const [reviews, dispatchReviews] = React.useReducer((reviews, { type, value }) => {
    switch (type) {
      case 'add':
        return [...reviews, ...value];
      case 'clear':
        return [];
      default:
        return reviews;
    }
  }, []);

  React.useEffect(() => {
    /*********************************************************
     * JOHN (12/10/2019):
     * Scroll down to find function
     *********************************************************/
    console.log('business changed');
    console.log(currentBusiness);
    if (currentBusiness) {
      fetchReviews();
    }
  }, [currentBusiness]);

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

  /*********************************************************
   * JOHN (12/10/2019):
   * Fetch all reviews for current restaurant
   *********************************************************/
  const fetchReviews = async () => {
    console.log('inside fetch reviews');
    console.log(currentBusiness);
    if (!currentBusiness.reviewIds) return;
    console.log('lol');

    const reviews = [];

    // Get all reviews for current restaurants
    for (let i = 0; i < currentBusiness.reviewIds.length; i++) {
      const review = {
        userId: '',
        username: '',
        text: '',
      };

      console.log('logging');
      try {
        await axios.get(`/review/${currentBusiness.reviewIds[i]}`).then(res => {
          console.log(res.data);
          review.userId = res.data.userId;
          review.text = res.data.text;
          // dispatchReviews({ type: 'add', value: res.data });
        });
        await axios.get(`/user/${review.userId}`).then(res => {
          console.log(res.data.users.username);
          review.username = res.data.users.username;
        });

        reviews.push(review);
      } catch (e) {
        alert('Failed to get reviews');
        console.log(e);
      }
    }

    dispatchReviews({ type: 'add', value: reviews });
    setLoadedReviews(true);
  };

  /*********************************************************
   * JOHN (12/10/2019):
   * Displays review onto page
   *********************************************************/
  const renderReviews = () => {
    console.log(reviews);
    if (!reviews || !reviews.length || reviews.length <= 0) return;

    console.log('accessed');
    console.log(reviews);
    return reviews.map(review => {
      console.log(review.text);
      console.log(review.userId);
      return (
        <div
          key={`${review.text} AND ${review.userId}`}
          style={{
            marginTop: '30px',
            marginBottom: '30px',
            backgroundColor: 'orange',
            width: '50%',
            padding: '30px',
            margin: '30px auto',
          }}
        >
          <h3>{review.username}</h3>
          <p>{review.text}</p>
          <p>{review.userId}</p>
        </div>
      );
    });
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
      {currentBusiness && !loadedReviews && <h1 style={{ marginTop: '30px' }}>Loading...</h1>}

      <div>{renderReviews()}</div>

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
