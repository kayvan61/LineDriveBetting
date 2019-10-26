import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LineGraph from "./components/LineGraph.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class GamePage extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      odds: {},
      comments: [],
      currentComment: "",
      userName: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateComments = this.updateComments.bind(this);
  }

  componentDidMount() {
    const {cookies} = this.props;
    this.setState({userName: cookies.get('usernameCook')});
    
    var url = new URL("http://line-drive-betting.appspot.com/Matchup");
    var params = {
      teama: this.props.teamOne,
      teamb: this.props.teamTwo,
      datatype: "homeaway"
    };
    url.search = new URLSearchParams(params).toString();

    fetch(url)
      .then(res => res.json())
      .then(result => {
        var value = result.res[0].Value;
        for (var site in value) {
          for (var datapoint of value[site]) {
            for (var odds in datapoint) {
              if (datapoint[odds] >= 2) {
                datapoint[odds] = Math.floor(
                  this.decimaltoAmericanAbove2(datapoint[odds])
                );
              } else {
                datapoint[odds] = Math.floor(
                  this.decimaltoAmericanBelow2(datapoint[odds])
                );
              }
            }
          }
        }
        this.setState({ odds: value });
      })
      .catch(error => {
        console.log(error);
      });

    this.updateComments();
    this.timer = setInterval(() => this.updateComments(), 5000);
  }

  updateComments() {
    var url = new URL("http://line-drive-betting.appspot.com/Comments");
    var params = {
      teama: this.props.teamOne,
      teamb: this.props.teamTwo
    };
    url.search = new URLSearchParams(params).toString();

    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState({ comments: [...result.res[0].Comments] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  decimaltoAmericanAbove2(decimal) {
    return (decimal - 1) * 100;
  }

  decimaltoAmericanBelow2(decimal) {
    return -100 / (decimal - 1);
  }

  handleClick() {
    var request = require("request");

    var options = {
      uri: "http://line-drive-betting.appspot.com/Comments/add",
      method: "POST",
      json: {
        Teams: [this.props.teamOne, this.props.teamTwo],
        Comment: this.props.username + ": " + this.state.currentComment
      }
    };
    if(this.props.username !== undefined) {
      request(options, function(error, res, b) {
        if (!error && res.statusCode === 200) {
          console.log("added comment to db successfully");
          //this.updateComments();
        }
      });
    }
    else {
      alert("please login to comment");
    }

    this.setState({ currentComment: "" });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <GlobalNavbar username={this.props.username}/>
        <Container style={{ paddingTop: "10px" }}>
          <Row style={{ marginBottom: 20 }}>
            <Col />
            <Col style={{ marginRight: 40, textAlign: "center" }}>
              <h1> {this.props.teamOne} </h1>
              <img src={this.props.logos[this.props.teamOne]} alt="" />
            </Col>
            <Col style={{ marginLeft: 40, textAlign: "center" }}>
              <h1> {this.props.teamTwo} </h1>
              <img src={this.props.logos[this.props.teamTwo]} alt="" />
            </Col>
            <Col />
          </Row>
          <Row>
            <Col>
              <b>Betting Source</b>
            </Col>
            <Col>
              <b>Moneyline</b>
            </Col>
            <Col>
              <b>Moneyline</b>
            </Col>
          </Row>
          {Object.keys(this.state.odds).map(key => {
            return (
              <Row key={key}>
                <Col> {key} </Col>
                <Col> {this.state.odds[key][0][1]} </Col>
                <Col> {this.state.odds[key][0][2]} </Col>
              </Row>
            );
          })}
        </Container>
        <div style={{ textAlign: "center", marginTop: 30, marginBottom: 50 }}>
          <h3>Win Prediction For Home Team Over Time</h3>
          <LineGraph />
          <br />
          <h1 style={{ marginTop: 50 }}>Comments</h1>
          <Container style={{ marginBottom: 50 }}>
            <Row>
              <Col></Col>
              <Col>
                <Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Add a comment</Form.Label>
                    <Form.Control
                      value={this.state.currentComment}
                      name="currentComment"
                      onChange={this.handleChange}
                      as="textarea"
                      rows="3"
                    />
                  </Form.Group>
                  <Button onClick={this.handleClick}>Comment</Button>
                </Form>
              </Col>
              <Col></Col>
            </Row>
          </Container>

          {this.state.comments.map(comment => {
            return (
              <Row>
                <Col></Col>
                <Col>
                  <div
                    style={{
                      textAlign: "center",
                      backgroundColor: "white",
                      color: "black"
                    }}
                  >
                    <p> {comment} </p>
                  </div>
                </Col>
                <Col></Col>
              </Row>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withCookies(GamePage);
