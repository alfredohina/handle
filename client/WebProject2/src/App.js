import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import {NavBar} from './components/Nabvar';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Home } from './pages/Home';
import AddCont from './pages/AddCont';
import ShowCont from './pages/ShowCont';




class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/addcont" component={AddCont} />
          <Route exact path="/showcont" component={ShowCont} />
        </Switch>
      </div>
    );
  }
}

export default App;