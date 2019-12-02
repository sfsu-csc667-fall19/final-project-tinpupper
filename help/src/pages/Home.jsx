import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Redirect} from 'react-router-dom'
import Axios from 'axios';

const Home = () => {
	const [names, setNames] = React.useState(['Mcdonalds', 'Hardies jr.', 'KFC', 'Chipotle', 'Panda Express']);
	//THIS IS TEMPORARY IN ORDER TO DISPLAY SOMETHING
	//will be replaced with below axios call

	React.useEffect(() => {
		Axios.get('/list')
		  .then((res => {
			setNames(res.data);
	
		  }))
		  .catch(console.log)
	  }, []); 
	  
	return (
		<div>
			<div>
				HELP! A yelp like application.
		</div>
			{names.map((name, i) => (
				<div key={i} className = "flex-display-row padding-2-p">
					<Card style={{ width: '18rem' }}>
						<Card.Img src={require('../img/Mcdonalds.jpg')} /> {/* will be replaced by business.img if thats doable*/}
						<Card.Body>
							<Card.Title>{name}</Card.Title> {/* will be replaced by business.name or something*/}
							<Card.Text> {/* will be replaced by business.text */}
								Some quick example text to build on the card title and make up the bulk of
								the card's content.
    					</Card.Text>
							<Button variant="primary" onClick={
								<Redirect to="/writereview"/>
							
							}>Write a review</Button>
						</Card.Body>
					</Card>
				 </div>
			))}
		</div>

	)
}

export default Home;