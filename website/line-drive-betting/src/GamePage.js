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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const styles = {
  input: {
    color: "black",
    borderRadius: 4,
    position: "relative",
    backgroundColor: "white",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px"
  }
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

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
      fetchedTotalsArr: false,
      tabPanelLine: 0,
      tabPanelSpreads: 0,
      tabPanelTotals: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.handleTabLine = this.handleTabLine.bind(this);
    this.handleTabSpreads = this.handleTabSpreads.bind(this);
    this.handleTabTotals = this.handleTabTotals.bind(this);
  }

  componentDidMount() {
    const { cookies } = this.props;
    this.setState({ userName: cookies.get("usernameCook") });

    var linesurl = new URL("http://line-drive-server.appspot.com/lines");
    var linesparams = {
      teama: this.props.teamOne,
      teamb: this.props.teamTwo,
      gameTime: this.props.gameTime
    };
    linesurl.search = new URLSearchParams(linesparams).toString();

    fetch(linesurl)
      .then(resultJson => resultJson.json())
      .then(result => {
        this.setState({
          odds: { ...this.state.odds, lines: result.resultJson }
        });
      })
      .then(() => {
        if (this.state.odds.lines.length !== 0) {
          this.setState({ fetchedLineArr: true });
        }
      })
      .catch(error => {
        console.log(error);
      });

    var spreadsurl = new URL("http://line-drive-server.appspot.com/spreads");
    var spreadsparams = {
      teama: this.props.teamOne,
      teamb: this.props.teamTwo,
      gameTime: this.props.gameTime
    };
    spreadsurl.search = new URLSearchParams(spreadsparams).toString();

    fetch(spreadsurl)
      .then(resultJson => resultJson.json())
      .then(result => {
        this.setState({
          odds: { ...this.state.odds, spreads: result.resultJson }
        });
      })
      .then(() => {
        if (this.state.odds.spreads.length !== 0) {
          this.setState({ fetchedSpreadArr: true });
        }
      })
      .catch(error => {
        console.log(error);
      });

    var totalsurl = new URL("http://line-drive-server.appspot.com/totals");
    var totalsparams = {
      teama: this.props.teamOne,
      teamb: this.props.teamTwo,
      gameTime: this.props.gameTime
    };
    totalsurl.search = new URLSearchParams(totalsparams).toString();

    fetch(totalsurl)
      .then(resultJson => resultJson.json())
      .then(result => {
        this.setState({
          odds: { ...this.state.odds, totals: result.resultJson }
        });
      })
      .then(() => {
        if (this.state.odds.totals.length !== 0) {
          this.setState({ fetchedTotalsArr: true });
        }
      })
      .catch(error => {
        console.log(error);
      });

    this.updateComments();
  }

  updateComments() {
    var url = new URL("http://line-drive-server.appspot.com/Comments");
    var params = {
      teama: this.props.teamOne,
      teamb: this.props.teamTwo,
      gameTime: this.props.gameTime
    };
    url.search = new URLSearchParams(params).toString();

    fetch(url)
      .then(resultJson => resultJson.json())
      .then(result => {
        this.setState({ comments: result.resultJson[0].Comments.reverse() });
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

  handleClick(updateFunc) {
    var request = require("request");

    var options = {
      uri: "http://line-drive-server.appspot.com/Comments/add",
      method: "POST",
      json: {
        Teams: [this.props.teamOne, this.props.teamTwo],
        Comment: this.props.username + ": " + this.state.currentComment,
        gameTime: this.props.gameTime
      }
    };
    if (this.props.username !== undefined) {
      request(options, function(error, resultJson, b) {
        if (!error && resultJson.statusCode === 200) {
          updateFunc();
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

  handleTabLine = (event, newValue) => {
    this.setState({ tabPanelLine: newValue });
  };

  handleTabSpreads = (event, newValue) => {
    this.setState({ tabPanelSpreads: newValue });
  };

  handleTabTotals = (event, newValue) => {
    this.setState({ tabPanelTotals: newValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GlobalNavbar
          username={this.props.username}
          checkToken={this.props.checkToken}
        />
        <Container style={{ paddingTop: "10px", marginBottom: 25 }}>
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
                    {this.state.fetchedLineArr ? (
                      this.state.odds.lines.map(row => (
                        <TableRow key={row.site + row.teamTag}>
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
                      ))
                    ) : (
                      <span>No odds info available</span>
                    )}
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
                    {this.state.fetchedSpreadArr ? (
                      this.state.odds.spreads.map(row => (
                        <TableRow key={row.site + row.teamsTag}>
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
                      ))
                    ) : (
                      <span>No odds info available</span>
                    )}
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
                    {this.state.fetchedTotalsArr ? (
                      this.state.odds.totals.map(row => (
                        <TableRow key={row.site + row.teamsTag}>
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
                      ))
                    ) : (
                      <span>No odds info available</span>
                    )}
                  </TableBody>
                </Table>
              </Paper>
            </Col>
          </Row>
        </Container>

        <div
          style={{
            textAlign: "center",
            marginTop: 30,
            marginBottom: 50
          }}
        >
          <ExpansionPanel
            style={{
              backgroundColor: "#9e9d98",
              marginLeft: 140,
              marginRight: 140,
              minWidth: 1400
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Money Line Over Time</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {this.state.fetchedLineArr ? (
                <div>
                  <AppBar position="static">
                    <Tabs
                      id="tabPanelLine"
                      value={this.state.tabPanelLine}
                      onChange={this.handleTabLine}
                      aria-label="tabPanelLine"
                    >
                      {this.state.odds.lines.map((item, idx) => {
                        return (
                          <Tab
                            key={idx}
                            label={item.site}
                            {...a11yProps(idx)}
                          />
                        );
                      })}
                    </Tabs>
                  </AppBar>
                  {this.state.odds.lines.map((item, idx) => {
                    return (
                      <TabPanel
                        key={idx}
                        value={this.state.tabPanelLine}
                        index={idx}
                      >
                        <LineGraph
                          name={"Lines" + idx}
                          teamOne={this.props.teamOne}
                          t1={item.odds0.map(x => this.decimaltoAmerican(x))}
                          teamTwo={this.props.teamTwo}
                          t2={item.odds1.map(x => this.decimaltoAmerican(x))}
                          createdAt={item.createdAt}
                        />
                      </TabPanel>
                    );
                  })}
                </div>
              ) : (
                <span>No data available</span>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            style={{
              backgroundColor: "#9e9d98",
              marginLeft: 140,
              marginRight: 140,
              minWidth: 1400
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Point Spread Odds Over Time</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {this.state.fetchedSpreadArr ? (
                <div>
                  <AppBar position="static">
                    <Tabs
                      id="tabPanelSpreads"
                      value={this.state.tabPanelSpreads}
                      onChange={this.handleTabSpreads}
                      aria-label="tabPanelSpreads"
                    >
                      {this.state.odds.spreads.map((item, idx) => {
                        return (
                          <Tab
                            key={idx}
                            label={item.site}
                            {...a11yProps(idx)}
                          />
                        );
                      })}
                    </Tabs>
                  </AppBar>
                  {this.state.odds.spreads.map((item, idx) => {
                    return (
                      <TabPanel
                        key={idx}
                        value={this.state.tabPanelSpreads}
                        index={idx}
                      >
                        <LineGraph
                          name={"Spreads" + idx}
                          teamOne={this.props.teamOne}
                          t1={item.odds0.map(x => this.decimaltoAmerican(x))}
                          teamTwo={this.props.teamTwo}
                          t2={item.odds1.map(x => this.decimaltoAmerican(x))}
                          createdAt={item.createdAt}
                        />
                      </TabPanel>
                    );
                  })}
                </div>
              ) : (
                <span>No data available</span>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            style={{
              backgroundColor: "#9e9d98",
              marginLeft: 140,
              marginRight: 140,
              minWidth: 1400
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Over Under Odds Over Time</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {this.state.fetchedTotalsArr ? (
                <div>
                  <AppBar position="static">
                    <Tabs
                      id="tabPanelTotals"
                      value={this.state.tabPanelTotals}
                      onChange={this.handleTabTotals}
                      aria-label="tabPanelTotals"
                    >
                      {this.state.odds.totals.map((item, idx) => {
                        return (
                          <Tab
                            key={idx}
                            label={item.site}
                            {...a11yProps(idx)}
                          />
                        );
                      })}
                    </Tabs>
                  </AppBar>
                  {this.state.odds.totals.map((item, idx) => {
                    return (
                      <TabPanel
                        key={idx}
                        value={this.state.tabPanelTotals}
                        index={idx}
                      >
                        <LineGraph
                          name={"Totals" + idx}
                          teamOne={"Over"}
                          t1={item.oddsOver.map(x => this.decimaltoAmerican(x))}
                          teamTwo={"Under"}
                          t2={item.oddsUnder.map(x =>
                            this.decimaltoAmerican(x)
                          )}
                          createdAt={item.createdAt}
                        />
                      </TabPanel>
                    );
                  })}
                </div>
              ) : (
                <span>No data available</span>
              )}
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
                  <Button onClick={() => this.handleClick(this.updateComments)}>
                    Comment
                  </Button>
                </Form>
              </Col>
              <Col></Col>
            </Row>
          </Container>

          {this.state.comments.map((comment, idx) => {
            return (
              <Row key={idx} style={{ marginTop: 10, marginBottom: 10 }}>
                <Col></Col>
                <Col xs={5}>
                  <TextField
                    multiline
                    fullWidth
                    value={comment}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      className: classes.input
                    }}
                  />
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

export default withCookies(withStyles(styles)(GamePage));
