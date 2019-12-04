import React from "react";
import { Tab } from "semantic-ui-react";

const panes = [
  {
    menuItem: "Login",
    render: () => (
      <Tab.Pane>
        <h2>Login</h2>
        <div className="flex-display flex-column">
          Username : <input type="text" />
          <br />
          Password : <input type="password" />
          <br />
          <br />
          <button className="btn btn-primary">Sign In</button>
        </div>
      </Tab.Pane>
    )
  },
  {
    menuItem: "Signup",
    render: () => (
      <Tab.Pane>
        <h2>Signup</h2>
        <div className>
          Username : <input type="text" />
          <br />
          Password : <input type="password" />
          <br />
          <br />
          <button className="btn btn-primary">Register</button>
        </div>
      </Tab.Pane>
    )
  }
];

const UserLogin = () => {
  return (
    <div className="flex-display margin-top-5 flex-display-row justify-content-center">
      <Tab panes={panes} />
    </div>
  );
};

export default UserLogin;
