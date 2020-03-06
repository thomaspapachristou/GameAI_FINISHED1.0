import React from 'react';
import Menu from './pages/Menu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Avatar from './pages/Avatar';
import Character from './pages/Character'
import './menu.css'
import Music from './components/Music'
import TransiLaunch from './components/TransiLaunch'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      essay: 1
    };
  }

  render() {

    return (
      <Router>
        <div className="App" >
          <Switch>
            <Route name="home" path="/" exact component={Menu} />
            <Route name="game" path="/game" component={Game} />
            <Route name="avatar" path="/avatar" component={Avatar} />
            <Route name="character" path="/character" component={Character} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
