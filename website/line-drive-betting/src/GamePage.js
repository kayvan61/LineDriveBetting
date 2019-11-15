import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LineGraph from "./components/LineGraph.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class GamePage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      odds: {
        lines: [],
        spreads: [],
        totals: []
      },
      comments: [],
      currentComment: "",
      userName: null,
      fetchedLineArr: false,
      fetchedSpreadArr: false,
      fetchedTotalsArr:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateComments = this.updateComments.bind(this);
  }

  componentDidMount() {
    const { cookies } = this.props;
    this.setState({ userName: cookies.get("usernameCook") });

    var linesurl = new URL("http://localhost:8080/lines");
    var linesparams = {
      teama: this.props.teamOne,
      teamb: this.props.teamTwo
    };
    linesurl.search = new URLSearchParams(linesparams).toString();

    fetch(linesurl)
      .then(res => res.json())
      .then(result => {
        this.setState({ odds: { ...this.state.odds, lines: result.res } });
      })
      .then(() => {this.setState({fetchedLineArr : true }); } )
      .catch(error => {
        console.log(error);
      });

    var spreadsurl = new URL("http://localhost:8080/spreads");
    var spreadsparams = {
      teama: this.props.teamOne,
      teamb: this.props.teamTwo
    };
    spreadsurl.search = new URLSearchParams(spreadsparams).toString();

    fetch(spreadsurl)
      .then(res => res.json())
      .then(result => {
        this.setState({ odds: { ...this.state.odds, spreads: result.res } });
      })
      .then(() => {
        this.setState({fetchedSpreadArr : true});
      })
      .catch(error => {
        console.log(error);
      });

    var totalsurl = new URL("http://localhost:8080/totals");
    var totalsparams = {
      teama: this.props.teamOne,
      teamb: this.props.teamTwo
    };
    totalsurl.search = new URLSearchParams(totalsparams).toString();

    fetch(totalsurl)
      .then(res => res.json())
      .then(result => {
        this.setState({ odds: { ...this.state.odds, totals: result.res } });
        console.log(this.state);
      })
      .then(() => {
        this.setState({fetchedTotalsArr: true});
      })
      .catch(error => {
        console.log(error);
      });

    // this.updateComments();
    // this.timer = setInterval(() => this.updateComments(), 500);
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

  decimaltoAmerican(decimal) {
    if (decimal >= 2) {
      return this.decimaltoAmericanAbove2(decimal);
    } else {
      return this.decimaltoAmericanBelow2(decimal);
    }
  }

  decimaltoAmericanAbove2(decimal) {
    return Math.round((decimal - 1) * 100);
  }

  decimaltoAmericanBelow2(decimal) {
    return Math.round(-100 / (decimal - 1));
  }

  handleClick() {
    var request = require("request");
//this.state.bettingLineGraphData
    var options = {
      uri: "http://line-drive-betting.appspot.com/Comments/add",
      method: "POST",
      json: {
        Teams: [this.props.teamOne, this.props.teamTwo],
        Comment: this.props.username + ": " + this.state.currentComment
      }
    };
    if (this.props.username !== undefined) {
      request(options, function(error, res, b) {
        if (!error && res.statusCode === 200) {
          console.log("added comment to db successfully");
          //this.updateComments();
        }
      });
    } else {
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
        <GlobalNavbar
          username={this.props.username}
          checkToken={this.props.checkToken}
        />
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
        </Container>

        <Container>
          <Row>
            <Col>
              <Paper>
                <Table size="small" aria-label="line table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Betting Source</TableCell>
                      <TableCell align="right">Moneyline</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.odds.lines.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.site}
                        </TableCell>
                        <TableCell align="right">
                          <p>
                            {this.props.teamOne +
                              ": " +
                              this.decimaltoAmerican(
                                row.odds0[row.odds0.length - 1]
                              )}
                          </p>
                          <p>
                            {this.props.teamTwo +
                              ": " +
                              this.decimaltoAmerican(
                                row.odds1[row.odds1.length - 1]
                              )}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Col>
            <Col>
              <Paper>
                <Table size="small" aria-label="spreads table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Betting Source</TableCell>
                      <TableCell align="right">Point Spread</TableCell>
                      <TableCell align="right">Odds</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.odds.spreads.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.site}
                        </TableCell>
                        <TableCell align="right">
                          <p>{row.points0[row.points0.length - 1]}</p>
                          <p>{row.points1[row.points1.length - 1]}</p>
                        </TableCell>
                        <TableCell align="right">
                          <p>
                            {this.props.teamOne +
                              ": " +
                              this.decimaltoAmerican(
                                row.odds0[row.odds0.length - 1]
                              )}
                          </p>
                          <p>
                            {this.props.teamTwo +
                              ": " +
                              this.decimaltoAmerican(
                                row.odds1[row.odds1.length - 1]
                              )}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Col>
            <Col>
              <Paper>
                <Table size="small" aria-label="totals table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Betting Source</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">Odds</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.odds.totals.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.site}
                        </TableCell>
                        <TableCell align="right">
                          {row.points[row.points.length - 1] + " O/U"}
                        </TableCell>
                        <TableCell align="right">
                          <p>
                            {"Odds Over" +
                              ": " +
                              this.decimaltoAmerican(
                                row.oddsOver[row.oddsOver.length - 1]
                              )}
                          </p>
                          <p>
                            {"Odds Under" +
                              ": " +
                              this.decimaltoAmerican(
                                row.oddsUnder[row.oddsUnder.length - 1]
                              )}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Col>
          </Row>
        </Container>

        <div style={{ textAlign: "center", marginTop: 30, marginBottom: 50 }}>
          <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Money Line Over Time</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
                  {this.state.fetchedLineArr ?  <LineGraph name="Lines" teamOne={this.props.teamOne} t1={this.state.odds.lines[0].odds0.map(x => this.decimaltoAmerican(x))} teamTwo={this.props.teamTwo} t2={this.state.odds.lines[0].odds1.map(x => this.decimaltoAmerican(x))}/> : <span />} 
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Point Spread Odds Over Time</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
                  {this.state.fetchedSpreadArr ?  <LineGraph name="Spread" teamOne={this.props.teamOne} t1={this.state.odds.spreads[0].odds0.map(x => this.decimaltoAmerican(x))} teamTwo={this.props.teamTwo} t2={this.state.odds.spreads[0].odds1.map(x => this.decimaltoAmerican(x))}/> : <span />}
        </ExpansionPanelDetails>
      </ExpansionPanel>        
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Over Under Odds Over Time</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
                      {this.state.fetchedTotalsArr ?  <LineGraph name="OverUnder" teamOne="Over" t1={this.state.odds.totals[0].oddsOver.map(x => this.decimaltoAmerican(x))} teamTwo="Under" t2={this.state.odds.totals[0].oddsUnder.map(x => this.decimaltoAmerican(x))}/> : <span />} 
        </ExpansionPanelDetails>
      </ExpansionPanel>                                   
      
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

          {/* {this.state.comments.map(comment => {
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
        })} */}
        </div>
      </div>
    );
  }
}

export default withCookies(GamePage);
