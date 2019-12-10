import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // THIS IS NEW!!
import rootReducer from "./redux/reducers/rootReducer";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { addNewBusiness } from "./redux/actions/businessActions";
const ws = new WebSocket("ws://localhost:4001");
const store = createStore(rootReducer, applyMiddleware(thunk)); // MUST APPLY THUNK MIDDLEWARE!!
ws.onclose = () => {
  console.log("connection has closed");
};

ws.onopen = () => {
  console.log("connection has opened");
};

ws.onmessage = message => {
  const messageObject = JSON.parse(message.data);
  switch (messageObject.type) {
    case "ADD_NEW_BUSINESS":
      store.dispatch(addNewBusiness(messageObject));
      break;
    default:
  }
};
ws.onerror = e => {
  console.log(e);
};

window.ws = ws;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
