import React, {Component, Props, ReactDOM} from 'react';
import {Route, Switch} from 'react-router';
// this snippet has it all attached to window since its in browser
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
  
  class World extends React.Component {
    constructor(props) {
      super(props);
      console.dir(props);      
      this.state = {
        fromIdeas: props.match.params.WORLD || 'unknown'
      }
    }
    render() {
      const { match, location} = this.props;
      return (
        <React.Fragment>
          <h2>{this.state.fromIdeas}</h2>
          <span>thing: 
            {location.query 
              && location.query.thing}
          </span><br/>
          <span>another1: 
          {location.query 
            && location.query.another1 
            || 'none for 2 or 3'}
          </span>
        </React.Fragment>
      );
    }
  }
  
  class Ideas extends React.Component {
    constructor(props) {
      super(props);
      console.dir(props);
      this.state = {
        fromAppItem: props.location.item,
        fromAppId: props.location.id,
        nextPage: 'world1',
        showWorld2: false
      }
    }
    render() {
      return (
        <React.Fragment>
            <li>item: {this.state.fromAppItem.okay}</li>
            <li>id: {this.state.fromAppId}</li>
            <li>
              <Link 
                to={{
                  pathname: `/hello/${this.state.nextPage}`, 
                  query:{thing: 'asdf', another1: 'stuff'}
                }}>
                Home 1
              </Link>
            </li>
            <li>
              <button 
                onClick={() => this.setState({
                nextPage: 'world2',
                showWorld2: true})}>
                switch  2
              </button>
            </li>
            {this.state.showWorld2 
             && 
             <li>
                <Link 
                  to={{
                    pathname: `/hello/${this.state.nextPage}`, 
                    query:{thing: 'fdsa'}}} >
                  Home 2
                </Link>
              </li> 
            }
          <NavLink to="/hello">Home 3</NavLink>
        </React.Fragment>
      );
    }
  }
  
  
  class App extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Link to={{
            pathname:'/ideas/:id', 
            id: 222, 
            item: {
                okay: 123
            }}}>Ideas</Link>
          <Switch>
            <Route exact path='/ideas/:id/' component={Ideas}/>
            <Route path='/hello/:WORLD?/:thing?' component={World}/>
          </Switch>
        </React.Fragment>
      );
    }
  }
  
