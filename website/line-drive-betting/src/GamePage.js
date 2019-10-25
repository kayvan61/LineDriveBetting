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
    this.state = {
      odds: {}
    };
  }

  componentDidMount() {
    var url = new URL("http://line-drive-betting.appspot.com/Matchup");
    var params = {
      teama: this.props.teamOne,
      teamb: this.props.teamTwo,
      datatype: "homeaway"
    };
    url.search = new URLSearchParams(params).toString();

    fetch(url)
      .then(res => res.json())
      .then(result => {
        var value = result.res[0].Value;
        for (var site in value) {
          for (var datapoint of value[site]) {
            for (var odds in datapoint) {
              if (datapoint[odds] >= 2) {
                datapoint[odds] = Math.floor(
                  this.decimaltoAmericanAbove2(datapoint[odds])
                );
              } else {
                datapoint[odds] = Math.floor(
                  this.decimaltoAmericanBelow2(datapoint[odds])
                );
              }
            }
          }
        }
        this.setState({ odds: value });
      })
      .catch(error => {
        console.log(error);
      });
  }

  decimaltoAmericanAbove2(decimal) {
    return (decimal - 1) * 100;
  }

  decimaltoAmericanBelow2(decimal) {
    return -100 / (decimal - 1);
  }

  render() {
    return (
      <div>
        <GlobalNavbar />
        <Container style={{ paddingTop: "10px" }}>
          <Row style={{ marginBottom: 20 }}>
            <Col />
            <Col style={{ marginRight: 40, textAlign: "center" }}>
              <h1> {this.props.teamOne} </h1>
              <img src={this.props.logos[this.props.teamOne]} alt="" />
            </Col>
            <Col style={{ marginLeft: 40, textAlign: "center" }}>
              <h1> {this.props.teamTwo} </h1>
              <img src={this.props.logos[this.props.teamTwo]} alt="" />
            </Col>
            <Col />
          </Row>
          <Row>
            <Col>
              <b>Betting Source</b>
            </Col>
            <Col>
              <b>Moneyline</b>
            </Col>
            <Col>
              <b>Moneyline</b>
            </Col>
          </Row>
          {Object.keys(this.state.odds).map(key => {
            return (
              <Row key={key}>
                <Col> {key} </Col>
                <Col> {this.state.odds[key][0][1]} </Col>
                <Col> {this.state.odds[key][0][2]} </Col>
              </Row>
            );
          })}
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
