import React from "react";
import update from "immutability-helper";
import GlobalNavbar from "./components/GlobalNavBar";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import GameCard from "./components/GameCard";
import Row from "react-bootstrap/Row";

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

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/Games")
      .then(res => res.json())
      .then(result => {
        var d = new Date();
        d.setDate(d.getDate() + 7);

        var chunks = [];
        var tempChunk = [];
        var i = 0;
        for (let game of result) {
          var gameD = Date.parse(game["EventStartTime"]);

          if (gameD < d) {
            tempChunk.push(game);
            i++;
            if (i === 4) {
              chunks.push([...tempChunk]);
              i = 0;
              tempChunk = [];
            }
          }
        }
        if (tempChunk !== []) {
          chunks.push([...tempChunk]);
        }

        this.setState({ games: chunks });
      });
  }

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
      <div>
        <GlobalNavbar />

        <Container
          striped
          bordered
          hover
          variant="dark"
          style={{ paddingTop: "25px" }}
        >
          {this.state.games.map((row, index) => {
            return (
              <Row key={index}>
                {row.map(game => {
                  return (
                    <Col>
                      <GameCard
                        key={game._id}
                        src={logos[game.Teams[0]]}
                        src1={logos[game.Teams[1]]}
                        relPath="/game"
                        text="Betting Info"
                        title={game.Teams[0] + " vs. " + game.Teams[1]}
                      />
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default HomePage;
