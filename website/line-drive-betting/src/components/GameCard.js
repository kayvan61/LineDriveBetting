import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";


class GameCard extends React.Component {
  render() {
      return (
          <Card style={{ width: "90%", height: "90%" }} as={Link} to={this.props.relPath}>
            <Card.Img variant="top" src={this.props.src} />
            <Card.Body>
              <Card.Title>{this.props.title}</Card.Title>
              <Card.Text>
                {this.props.text}
              </Card.Text>              
            </Card.Body>
          </Card>            
      );
  }
}

export default GameCard;
