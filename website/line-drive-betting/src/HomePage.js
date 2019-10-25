import React from "react";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


import GlobalNavbar from "./components/GlobalNavBar";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import GameCard from "./components/GameCard";
import Row from "react-bootstrap/Row";

class HomePage extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      games: [],
      userName: null,
      fetchedName: false
    };
  }

  async componentDidMount() {
    const {cookies} = this.props;
    const sessionToken = cookies.get('sessionToken');
    
    if(sessionToken !== undefined){
      fetch("https://line-drive-betting.appspot.com/Users/find?token=" + sessionToken).then(res => res.json())
        .then(res => {
          this.setState({userName : res["userName"]})
          this.setState({fetchedName: true});
        });
    } else {      
      this.setState({fetchedName: true});
    }
    
    fetch("https://line-drive-betting.appspot.com/Games")
      .then(res => res.json())
      .then(result => {
        var d = new Date();
        d.setDate(d.getDate() + 7);

        var chunks = [];
        var tempChunk = [];
        var i = 0;
        for (let game of result) {
          var gameD = Date.parse(game["EventStartTime"]);

          if (gameD < d) {
            tempChunk.push(game);
            i++;
            if (i === 4) {
              chunks.push([...tempChunk]);
              i = 0;
              tempChunk = [];
            }
          }
        }
        if (tempChunk !== []) {
          chunks.push([...tempChunk]);
        }

        this.setState({ games: chunks });
      });
  }

  render() {
    return this.state.fetchedName ? (
      <div>
        <GlobalNavbar username={this.state.userName}/>
        <Container
          striped="true"
          bordered="true"
          hover="true"
          variant="dark"
          style={{ paddingTop: "25px" }}
        >
          {this.state.games.map((row, index) => {
            return (
              <Row key={index}>
                {row.map(game => {
                  return (
                    <Col key={game._id}>
                      <GameCard
                        src={this.props.logos[game.Teams[0]]}
                        src1={this.props.logos[game.Teams[1]]}
                        relPath="/game"
                        text="Betting Info"
                        teamOne={game.Teams[0]}
                        teamTwo={game.Teams[1]}
                        setTeamOne={this.props.setTeamOne}
                        setTeamTwo={this.props.setTeamTwo}
                      />
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </Container>
      </div>
    ) : (<span> Loading.... </span>);
  }
}

export default withCookies(HomePage);
