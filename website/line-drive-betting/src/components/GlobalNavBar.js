import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class GlobalNavbar extends React.Component {
    render() {
	return (
<div className="Homepage">
<>
  <Navbar bg="dark" variant="dark">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>   
      <Button variant="outline-info">Log-in</Button>
    </Form>
  </Navbar>
</>
</div>);
  }
}

export default GlobalNavbar;
