import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import falcon from "./static/images/nfl_team_logos/atlanta-falcons-logo-vector.png";
import LineGraph from "./components/LineGraph.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class GamePage extends React.Component {
  render() {
    return (
      <div>
        <GlobalNavbar />
        <Container style={{ paddingTop: "10px" }}>
          <Row>
            <Col>
              {" "}
              <h1> Teams: </h1>{" "}
            </Col>
            <Col>
              {" "}
              <h1> Team A </h1>{" "}
              <img src={falcon} alt="" height="64px" width="64px" />{" "}
            </Col>
            <Col>
              {" "}
              <h1> Team B </h1>{" "}
              <img src={falcon} alt="" height="64px" width="64px" />{" "}
            </Col>
          </Row>
          <Row>
            <Col> Money Line: </Col>
            <Col> +850 </Col>
            <Col> -850 </Col>
          </Row>
          <Row>
            <Col> Point spread: </Col>
            <Col> +7 </Col>
            <Col> -7 </Col>
          </Row>
          <Row>
            <Col> Total (Over/Under): 42 Points </Col>
            <Col> Over: -110 </Col>
            <Col> Under: -115 </Col>
          </Row>
        </Container>
        <div style={{ textAlign: "center", marginTop: 30, marginBottom: 50 }}>
          <h3>Win Prediction For Home Team Over Time</h3>
          <LineGraph />
          <br />
          <h1 style={{ marginTop: 50 }}>Comments</h1>
          <Container>
            <Row>
              <Col></Col>
              <Col>
                <Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Add a comment</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                  </Form.Group>
                  <Button>Comment</Button>
                </Form>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default GamePage;
