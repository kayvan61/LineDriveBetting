import React from "react";
import { withRouter } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class GameCard extends React.Component {
  handleSubmit = () => {
    this.props.setTeamOne(this.props.teamOne);
    this.props.setTeamTwo(this.props.teamTwo);
    this.props.setGameTime(this.props.gameTime);
    this.props.history.push("/game");
  };

  timeConverter(timestamp) {
    var a = new Date(timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var time = month + " " + date + " " + hour + ":" + min;
    return time;
  }

  render() {
    return (
      <>
        <style type="text/css">
          {`
          .btn-card {
            background-color: #696969;
            height: 100%
          }

          .btn-card:hover {
            background-color: #4e5561;
          }
          `}
        </style>

        <Card
          style={{ marginTop: 10, marginBottom: 10 }}
          onClick={this.handleSubmit}
        >
          <Button variant="card">
            <Container style={{ paddingTop: "5px" }}>
              <Row>
                <Col>
                  <Card.Img src={this.props.src} />
                </Col>
                <Col>
                  <Card.Img src={this.props.src1} />
                </Col>
              </Row>
            </Container>

            <Card.Body
              style={{
                textAlign: "center",
                color: "white",
                opacity: "0.8"
              }}
            >
              <Card.Title>
                {this.props.teamOne + " vs. " + this.props.teamTwo}
              </Card.Title>
              <Card.Text>{this.timeConverter(this.props.gameTime)}</Card.Text>
            </Card.Body>
          </Button>
        </Card>
      </>
    );
  }
}

export default withRouter(GameCard);
