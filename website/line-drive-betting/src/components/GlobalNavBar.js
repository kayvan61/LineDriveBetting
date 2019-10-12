import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class GlobalNavbar extends React.Component {
  render() {
    return (
      <div className="Homepage">
        <>
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/betnow">Bet Now</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Form inline>
              <Button as={Link} to="/login" variant="outline-info">
                Log-in
              </Button>
            </Form>
          </Navbar>
        </>
      </div>
    );
  }
}

export default GlobalNavbar;
