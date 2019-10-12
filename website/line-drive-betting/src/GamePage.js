import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import falcon from "./static/images/nfl_team_logos/atlanta-falcons-logo-vector.png";

class GamePage extends React.Component {
  render() {
    return (
      <div>
        <GlobalNavbar />    
        <Container
        style={{paddingTop: "10px"}}>
          <Row>
            <Col> <h1> Teams: </h1> </Col>
            <Col> <h1> Team A </h1> <img src={falcon} height="64px" width="64px"/> </Col>
            <Col> <h1> Team B </h1> <img src={falcon} height="64px" width="64px"/> </Col>
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
            <Col> Over: -110  </Col>
            <Col> Under: -115  </Col>
          </Row>    
        </Container>    
      </div>
    );
  }
}

export default GamePage;
