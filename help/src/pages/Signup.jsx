import React from "react";
import { Card, Nav, Button } from "react-bootstrap";
import md5 from "md5";

const options = {
	withCredentials : true
}


const Signup = () => {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("You cannot change this at a later stage");

	const body = {
	username,
	password : md5(password)
	}

	const authenticateUser = () => {
		
	}

	return (
		 <div className="display-flex center-align margin-top-2 justify-content-center">
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
            Username: <input type="text" onChange={e => {setUsername(e.target.value)}}/>
          </Card.Text>
          
          <Card.Text>
            Password: <input type="password" onChange={e => {setPassword(e.target.value)}}/>
          </Card.Text>
          
          <Card.Text>
        	<input type="checkbox" required/> Are you a business account?
        </Card.Text> 
        <Card.Subtitle className="text-muted size-5-px">{errorMessage}</Card.Subtitle>
        <br />
          <Button variant="primary">Register</Button>
         </form>
        </Card.Body>

        
      </Card>
    </div>
	);
};

export default Signup;
