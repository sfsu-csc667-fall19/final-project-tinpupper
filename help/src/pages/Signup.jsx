import React from "react";
import { Card, Nav, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import md5 from "md5";
import axios from "axios";

const options = {
  withCredentials: true
};

const Signup = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isBusiness, setIsBusiness] = React.useState(false);
  const [warningMessage] = React.useState(
    "You cannot change this at a later stage"
  );
  const [isSignedUp, setIsSignedUp] = React.useState(false);

  const registerUser = () => {
    const body = {
      username,
      password: md5(password),
      isBusiness
    };

    axios.post("/register", body, options).then(res => {
      console.log(res);
      console.log(res.message);
      if (res.data.message === "Successfully registered user") {
        setIsSignedUp(true);
      }
    });
  };
  return (
    <div className="display-flex center-align margin-top-2 justify-content-center">
      {isSignedUp ? (
        <div>
          Please wait while you're redirected.
          <Redirect to="/login" />
        </div>
      ) : (
        <Card className="justify-content-center">
          <Card.Header>
            <Nav variant="pills" defaultActiveKey="#signup">
              <Nav.Item>
                <Nav.Link href="#signup">Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body>
            <Card.Title>
              <b>
                <h2>Sign Up</h2>
              </b>
            </Card.Title>
            <form>
              <Card.Text>
                Username:{" "}
                <input
                  type="text"
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </Card.Text>

              <Card.Text>
                Password:{" "}
                <input
                  type="password"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </Card.Text>

              <Card.Text>
                <input
                  type="checkbox"
                  value={isBusiness}
                  onChange={() => {
                    setIsBusiness(true);
                  }}
                />{" "}
                Are you a business account?
              </Card.Text>
              <Card.Subtitle className="text-muted size-5-px">
                {warningMessage}
              </Card.Subtitle>
              <br />
              <Button onClick={() => registerUser()} variant="primary">
                Register
              </Button>
            </form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Signup;
