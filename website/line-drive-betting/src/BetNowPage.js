import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import { slide as Menu } from "react-burger-menu";
class BetNowPage extends React.Component {
  render() {
    return (
      <div>
        <GlobalNavbar />
        <body style={{}}>
          <h1 style={{ color: "pink" }}>BET NOW PAGE</h1>
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
        </body>
      </div>
    );
  }
}

export default BetNowPage;
