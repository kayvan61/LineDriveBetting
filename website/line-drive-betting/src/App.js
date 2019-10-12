import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AboutPage from "./AboutPage";
import BetNowPage from "./BetNowPage";
import GamePage from "./GamePage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/game">
              <GamePage />
            </Route>
            <Route path="/betnow">
              <BetNowPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
