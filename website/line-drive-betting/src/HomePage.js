import React from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import GlobalNavbar from "./components/GlobalNavBar";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import GameCard from "./components/GameCard";
import Row from "react-bootstrap/Row";

import WebsiteLogo from "./static/images/nfl_team_logos/WebsiteLogo.jpg";

class HomePage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      games: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/nflgames")
      .then(res => res.json())
      .then(result => {
        result = result.sort((a, b) => (a.gameTime >= b.gameTime ? 1 : -1));
        var chunks = [];
        var tempChunk = [];
        var i = 0;
        for (let game of result) {
          tempChunk.push(game);
          i++;
          if (i === 4) {
            chunks.push([...tempChunk]);
            i = 0;
            tempChunk = [];
          }
        }
        if (tempChunk !== []) {
          chunks.push([...tempChunk]);
        }

        this.setState({ games: chunks });
      });

    this.props.checkToken();
  }

  render() {
    return (
      <div>
        <GlobalNavbar
          username={this.props.username}
          checkToken={this.props.checkToken}
        />
        <Container
          striped="true"
          bordered="true"
          hover="true"
          variant="dark"
          style={{ paddingTop: "25px" }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={WebsiteLogo}
              alt="k"
              style={{ width: 600, height: 460 }}
            />
          </div>

          {this.state.games.map((row, index) => {
            return (
              <Row key={index}>
                {row.map(game => {
                  return (
                    <Col key={game._id}>
                      <GameCard
                        src={this.props.logos[game.teams[0]]}
                        src1={this.props.logos[game.teams[1]]}
                        relPath="/game"
                        gameTime={game.gameTime}
                        teamOne={game.teams[0]}
                        teamTwo={game.teams[1]}
                        setTeamOne={this.props.setTeamOne}
                        setTeamTwo={this.props.setTeamTwo}
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

export default withCookies(HomePage);
