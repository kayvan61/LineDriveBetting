import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class GameCard extends React.Component {
  render() {
    return (
      <Card
        style={{ width: "90%", height: "90%", backgroundColor: "#696969" }}
        as={Link}
        to={this.props.relPath}
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
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{this.props.text}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default GameCard;
