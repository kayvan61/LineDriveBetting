import React from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignUpModal from "./components/SignUpModal";

function LoginPage() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <Form style={{ marginTop: 100 }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{ color: "white", opacity: "0.8" }}>
                Username
              </Form.Label>
              <Form.Control type="username" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ color: "white", opacity: "0.8" }}>
                Password
              </Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <Container>
                <Row>
                  <Col style={{ textAlign: "right" }}>
                    <Button
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      Sign Up
                    </Button>
                  </Col>
                  <Col style={{ textAlign: "left" }}>
                    <Button as={Link} to="/" variant="primary" type="submit">
                      Log In
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Form>
        </Col>
        <Col></Col>
      </Row>

      <SignUpModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}

export default LoginPage;
