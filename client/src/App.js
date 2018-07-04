import React, { Component } from 'react';
import './App.css';
import SimpleCard from './Components/loginform';
import { connect } from 'react-redux';
import * as actions from './actions';
import { BrowserRouter ,Route, Switch} from 'react-router-dom';
import Dashboard from './Components/dashboard';

class App extends Component { 
  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <div> 
            <Route exact path = '/' component = {SimpleCard} />
            <Route exact path = '/dashboard' component = {Dashboard} />
            </div>
        </ BrowserRouter>
            
      </div>
    );
  }
}

export default connect(null, actions)(App);
