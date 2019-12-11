import React from "react";
import { Card, Nav, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import md5 from "md5";
import axios from "axios";
import {
	setUsername,
	setIsSignedUp,
	setIsBusiness
} from "../redux/actions/userActions.js";

const options = {
	withCredentials: true
};

const Signup = ({ dispatch, username, isSignedUp, isBusiness }) => {
	const [password, setPassword] = React.useState("");
	const [warningMessage] = React.useState(
		"You cannot change this at a later stage"
	);
	const[isBusinessLocal, setIsBusinessLocal] = React.useState(false);

	const registerUser = () => {
		dispatch(setIsBusiness(false));
		const body = {
			username,
			password: md5(password),
			isBusiness: isBusinessLocal,
		};
		console.log(body);

		axios.post("/register", body, options).then(res => {
			console.log(res);
			debugger;
			if (res.data.message === "Successfully registered user") {
				dispatch(setIsSignedUp(true));
				dispatch(setIsBusiness(isBusinessLocal));
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
										dispatch(setUsername(e.target.value));
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
										setIsBusinessLocal(true);
									}}
								/>{" "}
								Are you a business account?
							</Card.Text>
							<Card.Subtitle className="text-muted size-5-px">
								{warningMessage}
							</Card.Subtitle>
							<br />
							<Button
								onClick={() => registerUser()}
								variant="primary"
							>
								Register
							</Button>
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
	isBusiness: state.userReducer.isBusiness,
	isSignedUp: state.userReducer.isSignedUp,
});

export default connect(mapStateToProps)(Signup);
