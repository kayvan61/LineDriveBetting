import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import logo1 from "./static/images/betnow.png";
import logo2 from "./static/images/mybookie.png";
import logo3 from "./static/images/sportsbets.png";
import logo4 from "./static/images/xbets.png";
import logo5 from "./static/images/onlinebet.png";
import logo6 from "./static/images/gamblingsitesorg.png";

import nflImage from "./static/images/nfl_team_logos/NFLcaption.jpg";
import nflImage2 from "./static/images/nfl_team_logos/NFLcaption2.jpg";
import nflImage3 from "./static/images/nfl_team_logos/NFLcaption3.jpg";

class BetNowPage extends React.Component {
  render() {
    return (
      <div>
        <GlobalNavbar />
        <div style={{ textAlign: "center", marginBottom: 20, marginTop: 20 }}>
          <h2>Betting Links</h2>
        </div>

        <Carousel showThumbs={false} class="car">
          <div>
            <img src={nflImage2} style={{ width: 720, height: 360 }} />
          </div>
          <div>
            <img src={nflImage} style={{ width: 720, height: 360 }} />
          </div>
          <div>
            <img src={nflImage3} style={{ width: 720, height: 360 }} />
          </div>
        </Carousel>
        <br></br>
        <br></br>
        {/* <ul>
          <li>
            <a href="https://betnow.eu"> https://betnow.eu </a>
          </li>
          <li>
            <a href="https://www.mybookie.ag/sportsbook/">
              {" "}
              https://www.mybookie.ag/sportsbook/
            </a>
          </li>
          <li>
            <a href="https://www.sportsbetting.ag/">
              {" "}
              https://www.sportsbetting.ag
            </a>{" "}
          </li>
          <li>
            <a href="https://xbet.ag/">https://xbet.ag/</a>
          </li>
          <li>
            <a href="https://www.betonline.ag/">https://www.betonline.ag/</a>
          </li>
        </ul>
        <h2> To learn more about NFL line-betting follow </h2>
        <ul>
          <li>
            <a href="https://www.gamblingsites.org/sports-betting/sites/nfl/">
              {" "}
              GAMBLINGSITES.org
            </a>
          </li>
        </ul> */}

        <div style={{ textAlign: "center" }}>
          <Container>
            <Row
              style={{ marginLeft: 80, marginBottom: 50, textAlign: "center" }}
            >
              <Col>
                <div class="hoverBorder">
                  <a href="https://betnow.eu">
                    <img
                      src={logo1}
                      alt="BetNow logo"
                      width="100%"
                      height="100%"
                    ></img>
                  </a>
                </div>
              </Col>
              <Col>
                <div class="hoverBorder">
                  <a href="https://www.mybookie.ag/sportsbook/">
                    <img
                      src={logo2}
                      alt="BetNow logo"
                      width="100%"
                      height="100%"
                    ></img>
                  </a>
                </div>
              </Col>
              <Col>
                <div class="hoverBorder">
                  <a href="https://www.sportsbetting.ag/">
                    <img
                      src={logo3}
                      alt="BetNow logo"
                      width="100%"
                      height="100%"
                    ></img>
                  </a>
                </div>
              </Col>
            </Row>
            <Row
              style={{ marginLeft: 80, marginBottom: 50, textAlign: "center" }}
            >
              <Col>
                <div class="hoverBorderbottom">
                  <a href="https://xbet.ag/">
                    <img
                      src={logo4}
                      alt="BetNow logo"
                      width="100%"
                      height="100%"
                    ></img>
                  </a>
                </div>
              </Col>
              <Col>
                <div class="hoverBorderbottom">
                  <a href="https://www.betonline.ag/">
                    <img
                      src={logo5}
                      alt="Online Betting logo"
                      width="100%"
                      height="100%"
                    ></img>
                  </a>
                </div>
              </Col>
              <Col>
                <div class="hoverBorderbottom">
                  <a href="https://www.betonline.ag/">
                    <img
                      src={logo6}
                      alt="Gambling sites org"
                      width="100%"
                      height="100%"
                    ></img>
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default BetNowPage;
