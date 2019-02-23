import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import './App.css';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Home } from './pages/Home';
import { Navigation } from './pages/Navigation';
import { GoogleApiWrapper } from 'google-maps-react';
import Error404 from './pages/404';


class _App extends Component {
  render() {
    const { user } = this.props;
    console.log(this.props.google)
    return (
      <div>
        {user ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/navigation" render={() => <Navigation google={this.props.google} />}/>
            <Route component={Error404} />
          </Switch>)
          : (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route component={Error404} />
            </Switch>)

        }
      </div>
    );
  }
}

const App = withRouter(connect(store => ({ user: store.user }))(_App));

export default GoogleApiWrapper({
  apiKey: (process.env.MAPS_API_KEY),
  // LoadingContainer: LoadingContainer
  libraries: ['places', 'visualization']
})(App)