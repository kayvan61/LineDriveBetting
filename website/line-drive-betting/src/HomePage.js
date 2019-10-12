import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import GameCard from "./components/GameCard";
import falcon from "./static/images/nfl_team_logos/atlanta-falcons-logo-vector.png";
import Row from "react-bootstrap/Row";


class HomePage extends React.Component {
    render() {
    return (
      <div>
        <GlobalNavbar />
        <Container striped bordered hover variant="dark"
        style={{ paddingTop: "25px"}}>
          <Row>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
            <Col>
              <GameCard
                src={falcon}
                src1={falcon}
                relPath="/game"
                text="WhoWillWin?"
                title="TeamAVsTeamB"
              />{" "}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
