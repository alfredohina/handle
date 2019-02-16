import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import './App.css';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Home } from './pages/Home';
import AddCont from './pages/AddCont';
import ShowCont from './pages/ShowCont';
import Demoshow from './pages/Demoshow';
import { Navigation } from './pages/Navigation';
import { GoogleApiWrapper } from 'google-maps-react';


class _App extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        {user ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/showcont" render={() => <ShowCont google={this.props.google} />} />
            <Route exact path="/navigation" render={() => <Navigation google={this.props.google} />}/>
            <Route exact path="/demoshow" component={Demoshow} />

          </Switch>)
          : (
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>)


        }
      </div>
    );
  }
}

const App = withRouter(connect(store => ({ user: store.user }))(_App));

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAU3EUjvc0pieMBfL77Qd0dHvQN5QUPSSg"),
  // LoadingContainer: LoadingContainer
  libraries: ['places', 'visualization']
})(App)