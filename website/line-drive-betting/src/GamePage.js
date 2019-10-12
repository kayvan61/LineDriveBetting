import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import falcon from "./static/images/nfl_team_logos/atlanta-falcons-logo-vector.png";
import * as d3 from "d3";
import LineGraph from "./components/LineGraph.js"

let data = {
  points: [
    [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 },
      { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ]
    ,
    [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 },
      { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
    ,
    [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 },
      { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
    ],
  xValues: [0,1,2,3,4,5,6],
  yMin: 0,
  yMax: 30
};

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
        <LineGraph />
      </div>
    );
  }
}

export default GamePage;
