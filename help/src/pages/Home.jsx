import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setIsLoggedIn, setUsername } from "../redux/actions/userActions.js";
import Axios from "axios";

const options = {
	withCredentials : true
}

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
		Axios.get("/auth").then(res => {
			console.log("Res from auth",res);
			if (res.data.valid === true) {
				let value = true;
				dispatch(setIsLoggedIn(value));
				dispatch(setUsername(res.data.user));
			}
		});
	}, []);

	React.useEffect(() => {
		Axios.get("/list")
			.then(res => {
				setNames(res.data);
			})
			.catch(console.log);
	}, []);
	console.log(isLoggedIn);

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
								Some quick example text to build on the card
								title and make up the bulk of the card's
								content.
							</Card.Text>
							<Button
								variant="primary"
								onClick={<Link to="/writereview" />}
							>
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
