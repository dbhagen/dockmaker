import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./components/static/home.jsx";
import NotFound from "./components/static/NotFound.jsx";
import { withAuthenticator, Authenticator } from "aws-amplify-react";
import Auth from '@aws-amplify/auth'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button';
// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

library.add(fab, faCheckSquare, faCoffee)

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

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(user => console.log({ user }))
    .catch(err => console.log(err))
}

function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

const routing = (
  <Router>
    <Button
onClick={() => Auth.federatedSignIn()}
>Sign In</Button>
<Button
onClick={() => Auth.federatedSignIn()}
>Sign Github</Button>
<Button
onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}
>Sign In with Facebook</Button>

<Button
onClick={() => Auth.federatedSignIn({provider: 'Google'})}
    >Sign In with Google</Button>
    <Button onClick={checkUser}>Check User</Button>
    <Button onClick={signOut}>Sign Out</Button>
    <Authenticator />
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/home/:id" component={Home} />
        <Route path="/privacy" component={Home} />
        <Route path="/tos" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

class App extends React.Component {


  render() {
    return routing;
  }
}

export default App;
// export default withAuthenticator(App, {
//   signUpConfig,
//   usernameAttributes: "email"
// });
