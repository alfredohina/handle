import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AddCont from './AddCont';
import { AuthAPI } from "../lib/auth";
import { connect } from "react-redux";
import ShowCont from './ShowCont';
import { withRouter, Switch, Route, NavLink, Link } from "react-router-dom";
import { Profile } from './Profile';
import Sections from './Sections';


library.add(faArrowLeft)

export class _Navigation extends React.Component {

render () {
  const { dispatch, user } = this.props;
  const { google } = this.props;
  console.log(google)
  return (
    <div>
      <div className="Navigation" style={{ width: "25%", position:"fixed", zIndex:"2", height:"100%", float: "left" }}>
        <center>
          <img className="avatarImg" src={user.image} alt="avatar" width="60%" />
          <p>{user.username}</p>


          <aside className="menu" style={{ marginTop: "40px" }}>
            <p className="menu-label" style={{ color: "#bfbfbf", fontStyle: "bold" }}>
              Profile
  </p>
            <ul className="menu-list">
            <NavLink exact activeStyle={{color:"white"}} to="/navigation/profile">Edit Profile</NavLink>
            </ul>
            <p className="menu-label" style={{ color: "#bfbfbf", fontStyle: "bold" }}>
              Services
  </p>
            <ul className="menu-list">
              <li>
              <NavLink exact activeStyle={{color:"white"}} to="/navigation">Madrid Data Center</NavLink>
              </li>
              <li>
                <ul>
                  <li>
                  <NavLink exact activeStyle={{color:"white"}} to="/navigation/add">Urban Waste</NavLink>
                  </li>
                  <NavLink exact activeStyle={{color:"white"}} to="/navigation/cont">Public Transport</NavLink>
                  <li><a>Lighting</a></li>
                </ul>
              </li>
              <li>
                <Link
                  className="is-active"
                  style={{ marginTop: "20px", backgroundColor: "#df6769" }}
                  to="/"
                  onClick={() =>
                    AuthAPI.logout().then(e => dispatch({ type: "LOGOUT" }))
                  }> <FontAwesomeIcon icon="arrow-left" /> Logout <i className="fa fa-home" />
                </Link>

              </li>
            </ul>
          </aside>

        </center>
      </div>
      <div style={{ width: "74%", float: "right"}}>
        <Switch>
            <Route exact path="/navigation/" component={Sections} />
            <Route exact path="/navigation/add" component={() => <AddCont google={this.props.google} />} />
            <Route exact path="/navigation/cont" component={() => <ShowCont google={this.props.google} />} />
            <Route exact path="/navigation/profile" component={() => <Profile />} />
          </Switch>

      </div>
      </div>
  );
}}

export const Navigation = withRouter(connect(store => ({ user: store.user }))(_Navigation));
