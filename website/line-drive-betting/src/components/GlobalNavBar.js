import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class GlobalNavbar extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  reloadHome = () => {
    const { cookies } = this.props;
    cookies.remove('sessionToken');
    this.props.history.push("/");
  }
  
  render() {
    return (
      <div className="Homepage">
        <>
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/betnow">Bet Now</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Form inline>{
              (this.props.username === undefined || this.props.username === null)  ?
                (<Button as={Link} to="/login" variant="outline-info" >
                   Log-in
                 </Button>)
              : (<Button variant="outline-info" onClick={this.reloadHome}>
                   Hello, {this.props.username}
                 </Button>)
            }       
            </Form>
          </Navbar>
        </>
      </div>
    );
  }
}

export default withCookies(withRouter(GlobalNavbar));
