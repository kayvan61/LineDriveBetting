import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

import AboutPage from "./AboutPage";
import BetNowPage from "./BetNowPage";
import GamePage from "./GamePage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

import niners from "./static/images/nfl_team_logos/49ers-vector.jpg";
import cardinals from "./static/images/nfl_team_logos/arizona-cardinals-logo-vector.png";
import falcons from "./static/images/nfl_team_logos/atlanta-falcons-logo-vector.png";
import ravens from "./static/images/nfl_team_logos/baltimore-ravens-logo-vector-01.png";
import bills from "./static/images/nfl_team_logos/buffalo-bills-logo-vector-01.png";
import panthers from "./static/images/nfl_team_logos/carolina-panthers-logo-vector.png";
import bears from "./static/images/nfl_team_logos/chicago-bears-logo-vector.png";
import bengals from "./static/images/nfl_team_logos/cincinnati-bengals-logo-vector-01.png";
import browns from "./static/images/nfl_team_logos/cleveland-browns-vector-logo.png";
import cowboys from "./static/images/nfl_team_logos/dallas-cowboys-logo-vector.png";
import broncos from "./static/images/nfl_team_logos/denver-broncos-logo-vector.png";
import lions from "./static/images/nfl_team_logos/detroit-lions-logo-vector-01.png";
import packers from "./static/images/nfl_team_logos/green-bay-packers-logo-vector.png";
import texans from "./static/images/nfl_team_logos/houston-texans-logo-vector.png";
import colts from "./static/images/nfl_team_logos/indianapolis-colts-vector-logo.png";
import jaguars from "./static/images/nfl_team_logos/jacksonville-jaguars-vector-logo.png";
import chiefs from "./static/images/nfl_team_logos/kansas-city-chiefs-vector-logo.png";
import dolphins from "./static/images/nfl_team_logos/miami-dolphins-vector-logo.png";
import vikings from "./static/images/nfl_team_logos/minnesota-vikings-logo-vector.png";
import patriots from "./static/images/nfl_team_logos/new-england-patriots-logo-preview.png";
import saints from "./static/images/nfl_team_logos/new-orleans-saints-logo-vector.png";
import giants from "./static/images/nfl_team_logos/new-york-giants-logo-vector.png";
import jets from "./static/images/nfl_team_logos/new-york-jets-logo-vector-01.png";
import raiders from "./static/images/nfl_team_logos/oakland-raiders-logo-vector.png";
import eagles from "./static/images/nfl_team_logos/philadelphia-eagles-logo-vector.png";
import steelers from "./static/images/nfl_team_logos/pittsburgh-steelers-logo-vector-01.png";
import chargers from "./static/images/nfl_team_logos/san-diego-chargers-logo-vector.png";
import seahawks from "./static/images/nfl_team_logos/seattle-seahawks-logo-vector.png";
import rams from "./static/images/nfl_team_logos/st-louis-rams-vector-logo.png";
import buccaneers from "./static/images/nfl_team_logos/tampa-bay-buccaneers-logo-vector.png";
import titans from "./static/images/nfl_team_logos/tennessee-titans-vector-logo.png";
import redskins from "./static/images/nfl_team_logos/washington-redskins-logo-vector.png";

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class App extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor() {
    super();
    this.state = {
      teamOne: "",
      teamTwo: "",
      username: null
    };
    this.setTeamOne = this.setTeamOne.bind(this);
    this.setTeamTwo = this.setTeamTwo.bind(this);
  }

  componentDidMount() {    
    const {cookies} = this.props;
    const sessionToken = cookies.get('sessionToken');
    
    if(sessionToken !== undefined){
      fetch("https://line-drive-betting.appspot.com/Users/find?token=" + sessionToken).then(res => res.json())
        .then(res => {
          this.setState({username : res["userName"]})
        });
    }
    else {
      this.setState({username : undefined});
    }
  }

  setTeamOne = team => {
    this.setState({ teamOne: team });
  };

  setTeamTwo = team => {
    this.setState({ teamTwo: team });
  };

  render() {
    const logos = {
      "49ers": niners,
      Cardinals: cardinals,
      Falcons: falcons,
      Ravens: ravens,
      Bills: bills,
      Panthers: panthers,
      Bears: bears,
      Bengals: bengals,
      Browns: browns,
      Cowboys: cowboys,
      Broncos: broncos,
      Lions: lions,
      Packers: packers,
      Texans: texans,
      Colts: colts,
      Jaguars: jaguars,
      Chiefs: chiefs,
      Dolphins: dolphins,
      Vikings: vikings,
      Patriots: patriots,
      Saints: saints,
      Giants: giants,
      Jets: jets,
      Raiders: raiders,
      Eagles: eagles,
      Steelers: steelers,
      Chargers: chargers,
      Seahawks: seahawks,
      Rams: rams,
      Buccaneers: buccaneers,
      Titans: titans,
      Redskins: redskins
    };

    return (
      
      <Router>
        <CookiesProvider>
        <div>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route
              path="/game"
              render={props => (
                <GamePage
                  {...props}
                  logos={logos}
                  teamOne={this.state.teamOne}
                  teamTwo={this.state.teamTwo}
                  username={this.state.username}
                />
              )}
            />
            <Route path="/betnow">
              <BetNowPage
                username={this.state.username}
              />
            </Route>
            <Route path="/about">
              <AboutPage
                username={this.state.username}
              />
            </Route>
            <Route
              path="/"
              render={props => (
                <HomePage
                  {...props}
                  logos={logos}
                  setTeamOne={this.setTeamOne}
                  setTeamTwo={this.setTeamTwo}
                  username={this.state.username}
                />
              )}
            />
          </Switch>
        </div>
        </CookiesProvider>
      </Router>
    );
  }
}

export default withCookies(App);
