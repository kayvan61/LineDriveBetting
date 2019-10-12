import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import GameCard from "./components/GameCard";
import Row from "react-bootstrap/Row";

import falcon from "./static/images/nfl_team_logos/atlanta-falcons-logo-vector.png";
import cowboys from "./static/images/nfl_team_logos/dallas-cowboys-logo-vector.png";
import giants from "./static/images/nfl_team_logos/new-york-giants-logo-vector.png";
import chiefs from "./static/images/nfl_team_logos/kansas-city-chiefs-vector-logo.png";
import eagles from "./static/images/nfl_team_logos/philadelphia-eagles-logo-vector.png";
import patriots from "./static/images/nfl_team_logos/new-england-patriots-logo-preview.png";
import steelers from "./static/images/nfl_team_logos/pittsburgh-steelers-logo-vector-01.png";

class HomePage extends React.Component {
  render() {
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
          <Row>
            <Col>
              <GameCard
                src={falcon}
                src1={cowboys}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={cowboys}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={cowboys}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={cowboys}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <GameCard
                src={giants}
                src1={chiefs}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={giants}
                src1={chiefs}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={giants}
                src1={chiefs}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={giants}
                src1={chiefs}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <GameCard
                src={eagles}
                src1={patriots}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={eagles}
                src1={patriots}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={eagles}
                src1={patriots}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={eagles}
                src1={patriots}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <GameCard
                src={falcon}
                src1={steelers}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={steelers}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={steelers}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={steelers}
                relPath="/game"
                text="Betting Info"
                title="Team A Vs Team B"
              />{" "}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
