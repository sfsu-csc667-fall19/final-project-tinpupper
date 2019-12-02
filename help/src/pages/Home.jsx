import React from "react";
import { Redirect, Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<pre className = "jumbotron">

				HELP! A yelp like application. 
				CSC 867/CSC 667 Project. A yelp
				like clone to write reviews.
			</pre>

			<Link to="/writereview">
				<u> Write a review / Read Reviews. </u>
			</Link>
		</div>
	);
};

export default Home;
