import React from 'react';
import { Card, Nav, Button } from 'react-bootstrap';
import md5 from 'md5';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUsername, setIsLoggedIn, setIsSignedUp, setIsBusiness } from '../redux/actions/userActions.js';

const options = {
  withCredentials: true,
};

const Login = ({ dispatch, username, isLoggedIn, isSignedUp }) => {
  // const [username, se] = React.useState("");
  // dispatch(setUsername(""));
  const [password, setPassword] = React.useState('');
  const [errorMessage] = React.useState('Please enter a valid user name');
  const [error, setError] = React.useState(false);

  const signInUser = () => {
    console.log('The username', username);

    const body = {
      username,
      password: md5(password),
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // JOHN:
    // This is a test user that exists in my mock database.
    // Feel free to put this in as the body to test it!
    // Make sure the proxy in package.json is set to:
    // "proxy": "http://167.172.249.188:3004"
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    axios.post('/auth/login', body, options).then(response => {
      console.log(response);
      // console.log(response.data.error);
      if (response.data.error === 'Bad user information') {
        let value = true;
        setError(value);
        // dispatch(setUsername(""));
      }
      if (response.data.message === 'Successfully authenticated') {
        document.cookie = `username=${username}`;
        document.cookie = `password=${md5(password)}`;
        console.log('Response after authentication' + response);
        let value = true;
        console.log(response.data.user.isBusiness);
        dispatch(setIsBusiness(response.data.user.isBusiness));
        dispatch(setIsLoggedIn(value));
      }
    });
  };

  return (
    <div className="display-flex center-align margin-top-2 justify-content-center">
      {isLoggedIn ? (
        <Redirect to="/home" />
      ) : (
        <Card className="justify-content-center">
          <Card.Header>
            <Nav variant="pills" defaultActiveKey="#login">
              <Nav.Item>
                <Nav.Link href="#login">Login</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body href="#login">
            <Card.Title>
              <b>
                <h2>Login</h2>
                {isSignedUp && <h4> Please login with the credentials you created! </h4>}
              </b>
            </Card.Title>
            <form action="#">
              <Card.Text>
                Username:{' '}
                <input
                  required
                  onChange={e => {
                    dispatch(setUsername(e.target.value));
                  }}
                  type="text"
                />
              </Card.Text>
              <Card.Text>
                Password:{' '}
                <input
                  required
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                />
              </Card.Text>
              <Button onClick={signInUser} variant="primary">
                Submit
              </Button>
              <hr />
              <Card.Subtitle>
                {error ? (
                  <Card.Subtitle style={{ color: 'red' }}>
                    The user id and password do not match. Please try again.
                  </Card.Subtitle>
                ) : (
                  <Card.Subtitle></Card.Subtitle>
                )}
              </Card.Subtitle>
            </form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.userReducer.username,
  isLoggedIn: state.userReducer.isLoggedIn,
  isSignedUp: state.userReducer.isSignedUp,
});

export default connect(mapStateToProps)(Login);
