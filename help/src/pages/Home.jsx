import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect, Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { setIsLoggedIn, setUsername, setIsBusiness } from "../redux/actions/userActions";
import { setIsRedirect, listBusinesses, setCurrentBusiness } from "../redux/actions/businessActions";

const options = {
	withCredentials: true
};

// Array of businesses
const mockData = [
	{
		name: "Mcdonald's",
		description: "I am mcdonald wow",
	},
	{
		name: "Burger King", 
		description: "Eat our burgers or else"
	},
	{
		name: "Chipotle", 
		description: "Eat our food"
	},
	{
		name: "KFC", 
		description: "Eat my chicken or else"
	}
]

const Home = ({ dispatch, businesses, isBusiness, isLoggedIn, username, isRedirect, currentBusiness }) => {
	React.useEffect(() => {
		axios.post("/auth/cookies", options).then(res => {
			console.log(res);
			if (res.data.message === "Successfully authenticated") {
				dispatch(setIsBusiness(res.data.user.isBusiness));
				dispatch(setUsername(res.data.user.username));
				dispatch(setIsLoggedIn(true));
			}
		});
		dispatch(listBusinesses());
	}, []);

	React.useEffect(() => {
		console.log('setting cookies');
		document.cookie = `username=bob`;
		document.cookie = `password=123`;
		dispatch(listBusinesses());
	  }, []);

	if (isRedirect) {
		console.log(isRedirect)
		dispatch(setIsRedirect(false));
		return (
		<Redirect to="/writereview"/>
		)
	}
	

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
				{isLoggedIn && isBusiness && (
					<h3>Welcome to your business account, {username}</h3>
				)}
			</div>

			{businesses.map((business, i) => (
				<div key={i} className="display-row padding-2-p">
					<Card style={{ width: "18rem" }}>
						<Card.Img src={require("../img/Mcdonalds.jpg")} />{" "}
						{/* will be replaced by business.img if thats doable*/}
						<Card.Body>
							<Card.Title>{business.name}</Card.Title>{" "}
							{/* will be replaced by business.name or something*/}
							<Card.Text>
								{/* will be replaced by business.text */}
								{business.description}
							</Card.Text>
							{!isBusiness ?
							<Button
								variant="primary"
								onClick={() => {
									dispatch(setCurrentBusiness(business.name))
									console.log(businesses)
									dispatch(setIsRedirect(true))
								}
								}
							>
							
								Write a review 

							</Button>
							: (

								<Button
								variant="primary"
								onClick={() => {
									dispatch(setCurrentBusiness(business.name))
									console.log(businesses)
									dispatch(setIsRedirect(true))
								}
								}
							>
							
								Read review 

							</Button>
								)
							}
						</Card.Body>
					</Card>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = state => ({
	businesses: state.businessReducer.businesses,
	isLoggedIn: state.userReducer.isLoggedIn,
	isBusiness: state.userReducer.isBusiness,
	username: state.userReducer.username,
	isRedirect: state.businessReducer.isRedirect,
	currentBusiness: state.businessReducer.currentBusiness
});

export default withRouter(connect(mapStateToProps)(Home));

