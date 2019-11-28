import React from "react";
import { Card, Nav, Button } from "react-bootstrap";

const Login = () => {
  const [login, setLogin] = React.useState(true);
  console.log(login);
  return (
    <div className="display-flex center-align margin-top-2 justify-content-center">
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
          <Card.Text>
            Username: <input type="text" />
          </Card.Text>
          <Card.Text>
            Password: <input type="password" />
          </Card.Text>
          <Button variant="primary">Submit</Button>
        </Card.Body>

        
      </Card>
    </div>
  );
};

export default Login;
