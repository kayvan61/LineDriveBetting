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
              opacity: 0.8
            }}
          >
            {this.props.bio}
            <div style={{ position: "relative" }}>
              <p>Github commits: {this.props.stat}</p>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default AboutCard;
