import React from "react";
import { withRouter } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      <Card
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: "#696969"
        }}
        onClick={this.handleSubmit}
      >
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
      </Card>
    );
  }
}

export default withRouter(GameCard);
