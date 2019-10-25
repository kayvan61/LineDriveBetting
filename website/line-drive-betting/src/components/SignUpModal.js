import React from "react";
import crypto from "crypto";
import ReactDOM from "react-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {didSignupFail: false};
    this.props = props;
    this.signupUser = this.signupUser.bind(this);
  }

  signupUser() {
    var user = ReactDOM.findDOMNode(this.refs.username).value;
    var pw   = ReactDOM.findDOMNode(this.refs.password).value;
    var salt = new Date().toISOString();
    
    var saltedPW = crypto.createHash('md5').update(pw+salt).digest('hex');
    
    var url = "https://line-drive-betting.appspot.com/Users/Register?userName=" + user;
    url = url + "&saltedPass=" + saltedPW;
    url = url + "&salt=" + salt;
    
    fetch(url)
      .then((res)=> {
	if(res["status"] === 400) {
	  this.setState({didSignupFail: true});
	}
      });
    
    this.props.onHide();
  }

  render() {
  return (
    <Modal {...this.props} size="sm" aria-labelledby="SignUpModal" centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }} id="SignUpModal">
          Create Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "black" }}>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" ref="username"/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "black" }}>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref="password"/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
        <Button onClick={this.signupUser}>Create Account</Button>
      </Modal.Footer>
    </Modal>
  );
  }
}

export default SignUpModal;
