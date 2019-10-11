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
            <th><GameCard src="https://www.w3schools.com/images/w3schools_green.jpg" relPath="/about" text="sample text" title="title text" /> </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>


            </div>
            


    );
    
  }
  
}

export default GamePage;
