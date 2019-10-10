import React from 'react'
import Homepage from './Homepage'

class App extends React.Component {
    render() {
	document.title = "Line Drive Betting"
	return (<Homepage />);
    }
}

export default App;
