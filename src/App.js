import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/static/home";
import NotFound from "./components/static/NotFound";
import Amplify from "aws-amplify";
import { withAuthenticator, Authenticator } from "aws-amplify-react";

import awsconfig from "./aws-exports";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

Amplify.configure(awsconfig);
const signUpConfig = {
  // header: "Hello",
  hideAllDefaults: true,
  defaultCountryCode: "1",
  signUpFields: [
    {
      label: "Email Address",
      key: "email",
      required: true,
      displayOrder: 1,
      type: "string"
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "string"
    }
  ]
};

class App extends React.Component {
  routing = (
    <Router>
      <Authenticator usernameAttributes="email" />
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/home/:id" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );

  render() {
    return this.routing;
  }
}

export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes: "email"
});
