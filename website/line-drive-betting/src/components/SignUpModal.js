import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SignUpModal(props) {
  return (
    <Modal {...props} size="sm" aria-labelledby="SignUpModal" centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }} id="SignUpModal">
          Create Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "black" }}>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "black" }}>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onHide}>Create Account</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpModal;
