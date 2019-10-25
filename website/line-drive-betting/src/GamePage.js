import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LineGraph from "./components/LineGraph.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <GlobalNavbar />
        <Container style={{ paddingTop: "10px" }}>
          <Row style={{ marginBottom: 20 }}>
            <Col />
            <Col style={{ marginRight: 20 }}>
              <h1> {this.props.teamOne} </h1>
              <img src={this.props.logos[this.props.teamOne]} alt="" />
            </Col>
            <Col style={{ marginLeft: 20 }}>
              <h1> {this.props.teamTwo} </h1>
              <img src={this.props.logos[this.props.teamTwo]} alt="" />
            </Col>
            <Col />
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
