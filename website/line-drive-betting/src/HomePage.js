import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import GameCard from "./components/GameCard"

class HomePage extends React.Component {
    render() {
    return (
      <div>
        <GlobalNavbar />
        <h1>HOME PAGE</h1>
      </div>
    );
  }
}

export default HomePage;
