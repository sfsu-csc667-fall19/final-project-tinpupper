import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setIsLoggedIn, setUsername } from "../redux/actions/userActions.js";
import Axios from "axios";

const options = {
  withCredentials: true
};

const Home = ({ dispatch, username, isLoggedIn }) => {
  const [names, setNames] = React.useState([
    "Mcdonalds",
    "Hardies jr.",
    "KFC",
    "Chipotle",
    "Panda Express"
  ]);
  //THIS IS TEMPORARY IN ORDER TO DISPLAY SOMETHING
  //will be replaced with below axios call
  //
  // Check cookies
  React.useEffect(() => {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * JOHN:											   *
     * Route: http://167.172.249.188:3004/auth/cookies     *
     * 													   *
     * I added a cookies route in the backend for clarity  *
     * 													   *
     * I'm guessing we should show a 400 Unauthorized page *
     * If they aren't logged in							   *
     * 													   *
     * DELETE THIS COMMENT BOX IF NO LONGER NEEDED         *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    document.cookie = "username=bob"; // This is a real user that exists in my mongoDB
    document.cookie = "password=123";
    Axios.post("/auth/cookies", {}, options).then(res => {
      // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      // JOHN:
      // Logging the information
      // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
      console.log("JOHN COOKIES RESPONSE: ");
      console.log(res.data.message);
      console.log(res.data.user);
      console.log("END JOHN COOKIES RESPONSE: ");

      console.log("Res from auth", res);
      if (res.data.valid === true) {
        let value = true;
        dispatch(setIsLoggedIn(value));

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // JOHN:
        // I've changed this from res.data.user to res.data.user.username
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        dispatch(setUsername(res.data.user.username));
      }
    });
  }, []);

  React.useEffect(() => {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * JOHN:											   *
     * "/list" route doesnt exists in our backend.         * 			   *
     * 													   *
     * DELETE THIS COMMENT BOX IF NO LONGER NEEDED         *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    //     Axios.get("/list")
    //       .then(res => {
    //         setNames(res.data);
    //       })
    //       .catch(console.log);

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * JOHN:											   *
     * Route: http://167.172.249.188:3004/restaurant       *
     *  												   *
     * Here's an API request to get all test restaurants   *
     * if you really want to make an API call  			   *
     * 													   *
     * DELETE THIS COMMENT BOX IF NO LONGER NEEDED         *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    Axios.get("/restaurant", options).then(res => {
      console.log("JOHN RESTAURANT DATA:");
      console.log(res.data);
    });
  }, []);

  console.log(isLoggedIn);
  console.log(username);

  return (
    <div>
      <div>
        <h2>HELP! A yelp like application.</h2>
      </div>
      {isLoggedIn && (
        <h3>
          Hello, {username} <br />
        </h3>
      )}
      {names.map((name, i) => (
        <div key={i} className="display-row padding-2-p">
          <Card style={{ width: "18rem" }}>
            <Card.Img src={require("../img/Mcdonalds.jpg")} />{" "}
            {/* will be replaced by business.img if thats doable*/}
            <Card.Body>
              <Card.Title>{name}</Card.Title>{" "}
              {/* will be replaced by business.name or something*/}
              <Card.Text>
                {" "}
                {/* will be replaced by business.text */}
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */}
              {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */}
              {/* JOHN (WARNING): onClick will fail since <Link to="/writereview" /> is not a javascript statement  */}
              {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */}
              {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */}
              <Button variant="primary" onClick={<Link to="/writereview" />}>
                Write a review
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.userReducer.username,
  isLoggedIn: state.userReducer.isLoggedIn
});

export default connect(mapStateToProps)(Home);
