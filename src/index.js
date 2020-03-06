import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import Game from './pages/Game';
// import Character from './pages/Character';
// import Avatar from './pages/Avatars';
// import Menu from './pages/Menu';
// import Test from './pages/Test';
// import ActualGame from './pages/GameTestCopy';

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
