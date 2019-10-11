import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card";
import GameCard from "./components/GameCard";




class GamePage extends React.Component {
  render() {
    return (
      <div>
        <GlobalNavbar />
        <h1>GAME PAGE</h1>
        
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>1<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /> </th>
            <th>2<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></th>
            <th>3<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></th>
            <th>4<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
            <td>6<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
            <td>7<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
            <td>8<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
          </tr>
          <tr>
           <td>9<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
            <td>10<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
            <td>11<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
            <td>12<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
          </tr>
          <tr>
            <td>13<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
            <td>14<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
            <td>15<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
            <td>16<GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/game" text="WhoWillWin?" title="TeamAVsTeamB" /></td>
          </tr>
        </tbody>
      </Table>


            </div>
            


    );
    
  }
  
}

export default GamePage;
