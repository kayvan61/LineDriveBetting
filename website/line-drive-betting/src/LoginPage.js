import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignUpModal from "./components/SignUpModal";


class LoginPage extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      modalShow : false,
      loginFail : false
    };

    this.loginUser = this.loginUser.bind(this);
  }

  
  async loginUser() {
    var user = ReactDOM.findDOMNode(this.refs.username).value;
    var pw   = ReactDOM.findDOMNode(this.refs.password).value;
    
    var url = "https://line-drive-betting.appspot.com/Users/Login?userName=" + user;
    url = url + "&password=" + pw;
    
    await fetch(url)
      .then((res) => res.json())
      .then((res)=> {
        if(res["status"] === 400 || res["status"] === 204) {
          this.setState({loginFail: true});
        }
        else {
          //add a cookie called 'sessionToken'          
          //res["token"]
          const { cookies } = this.props;
          cookies.set('sessionToken', res["token"]);
        }
      });
  }
  
  render() {
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
              <Form.Control type="username" placeholder="Enter username" ref="username"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{ color: "white", opacity: "0.8" }}>
                Password
              </Form.Label>
              <Form.Control type="password" placeholder="Password" ref="password"/>
            </Form.Group>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <Container>
                <Row>
                  <Col style={{ textAlign: "right" }}>
                    <Button
                      variant="primary"
                      onClick={() => this.setState({modalShow : true})}
                    >
                      Sign Up
                    </Button>
                  </Col>
                  <Col style={{ textAlign: "left" }}>
                    <Button as={Link} to="/" variant="primary" type="submit" onClick={this.loginUser}>
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
      <SignUpModal show={this.state.modalShow} onHide={() => this.setState({modalShow : false})} />
    </Container>
    );
  }
}

export default withCookies(LoginPage);
