import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import GameCard from "./components/GameCard"

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <GlobalNavbar />
        <h1>HOME PAGE</h1>
        <GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/about" text="sample text" title="title text" />    
      </div>
    );
  }
}

export default HomePage;
