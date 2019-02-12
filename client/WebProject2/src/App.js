import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Home } from './pages/Home';
import AddCont from './pages/AddCont';
import ShowCont from './pages/ShowCont';
import {Navigation} from './pages/Navigation';




class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/addcont" component={AddCont} />
          <Route exact path="/showcont" component={ShowCont} />
          <Route exact path="/navigation" component={Navigation} />
        </Switch>
      </div>
    );
  }
}

export default App;