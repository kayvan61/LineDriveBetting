import React from "react";

import Card from "react-bootstrap/Card";

class AboutCard extends React.Component {
  render() {
    return (
      <Card style={{ height: "100%", backgroundColor: "#696969" }}>
        <Card.Img
          style={{ width: "100%", height: "20vw", objectFit: "cover" }}
          variant="top"
          src={this.props.src}
        />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>
            {this.props.name}
          </Card.Title>
          <Card.Text
            style={{
              fontSize: 16,
              opacity: 0.8,
              height: "100%"
            }}
          >
            {this.props.bio}
            <br />
            Github commits: {this.props.stat}
            <br />
            Responsibilities: {this.props.responsibilities}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default AboutCard;
