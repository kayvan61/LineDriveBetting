import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import { slide as Menu } from "react-burger-menu";
import logo1 from "./static/images/betnow.png";
import logo2 from "./static/images/mybookie.png";
import logo3 from "./static/images/sportsbets.png";
import logo4 from "./static/images/xbets.png";
import logo5 from "./static/images/onlinebet.png";
class BetNowPage extends React.Component {
  render() {
    return (
      <div>
        <GlobalNavbar />

        {/* <h1 style={{ color: "pink" }}>BET NOW PAGE</h1> */}
        <h2>Betting Links</h2>
        <ul>
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
        </ul>
        <br></br>
        <a href="https://betnow.eu">
          {" "}
          <img src={logo1} alt="BetNow logo" width="100" height="50"></img>
        </a>
        <a href="https://www.mybookie.ag/sportsbook/">
          {" "}
          <img src={logo2} alt="BetNow logo" width="100" height="50"></img>
        </a>
        <a href="https://www.sportsbetting.ag/">
          {" "}
          <img src={logo3} alt="BetNow logo" width="100" height="50"></img>
        </a>
        <a href="https://xbet.ag/">
          {" "}
          <img src={logo4} alt="BetNow logo" width="100" height="50"></img>
        </a>
        <a href="https://www.betonline.ag/">
          {" "}
          <img
            src={logo5}
            alt="Online Betting logo"
            width="100"
            height="50"
          ></img>
        </a>
      </div>
    );
  }
}

export default BetNowPage;
