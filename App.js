import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
// import Products from "./components/Products";
// import WooCommerce from 'woocommerce';
import { NavBar } from './components/NavBar';
import Profile from './pages/Profile';
import MapContainer from './pages/Map';

class App extends Component {
  
  render() {
    return (
      <div>
          <p>sadsd</p>
        <NavBar/>
        <div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/profile/' component={Profile}/>
            <Route exact path='/map' component={MapContainer}/>

          </Switch>

      </div>
      
        </div>
    );
  }
}
export default App
