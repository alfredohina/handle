import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import { Principal } from './components/principal';
import NavBar from './components/Nabvar';
import { Login } from './components/login';
import { Signup } from './components/signup';
import Home from './components/Home';



class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        {/* <Principal/> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </div>
    );
  }
}

export default App;
