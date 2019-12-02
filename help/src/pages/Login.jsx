import React from "react";
import { Card, Nav, Button } from "react-bootstrap";
import md5 from "md5";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
import {setUsername, setIsLoggedIn} from "../redux/actions/userActions.js";

const options = {
  withCredentials: true
};

const Login = ({dispatch, username, isLoggedIn}) => {
  // const [username, se] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage] = React.useState(
    "Please enter a valid user name"
  );
  const [error, setError] = React.useState(false);

  const signInUser = () => {
    console.log(username);
    const body = {
      username,
      password: md5(password)
    };

    console.log(body);
    axios.post("/auth/login", body, options).then(response => {
      console.log(response);
      // console.log(response.data.error);
      if (response.data.error === "Bad user information") {
        let value = true;
        setError(value);
        dispatch(setUsername(""));
      }
      if (response.data.message === "Successfully authenticated") {
        console.log("After authentication", username);
        document.cookies = `username = ${username}`;
        document.cookies = `password = ${md5(password)}`
        debugger;
        let value = true;

        dispatch(setIsLoggedIn(value));
      }
    });
  };

  return (
    <div className="display-flex center-align margin-top-2 justify-content-center">
      {isLoggedIn ? (
        <Redirect to="/writereview" />
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
              </b>
            </Card.Title>
            <form action="#">
              <Card.Text>
                Username:{" "}
                <input
                  required
                  onChange={e => {
                    dispatch(setUsername(e.target.value));
                  }}
                  type="text"
                />
              </Card.Text>
              <Card.Text>
                Password:{" "}
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
                  <Card.Subtitle style={{ color: "red" }}>
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
});

export default connect(mapStateToProps)(Login);



