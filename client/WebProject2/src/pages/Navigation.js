import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AddCont from './AddCont';
import { AuthAPI } from "../lib/auth";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


library.add(faArrowLeft)

const _Navigation = ({ user, dispatch }) => {
  const { username } = user;
  return (
    <React.Fragment>
      <div style={{ width: "20%", height: "700px", float: "left", backgroundColor: "#4c71ae", color: "white" }}>
        <center>
          <img src="./images/avatar.png" alt="avatar" style={{ borderRadius: "50%", paddingTop: "50px" }} width="60%" />
          <p>{user.username}</p>


          <aside class="menu" style={{ marginTop: "40px" }}>
            <p class="menu-label" style={{ color: "#bfbfbf", fontStyle: "bold" }}>
              Profile
  </p>
            <ul class="menu-list">
              <li><a>Edit</a></li>
            </ul>
            <p class="menu-label" style={{ color: "#bfbfbf", fontStyle: "bold" }}>
              Services
  </p>
            <ul class="menu-list">
              <li><a>Madrid Data Center</a></li>
              <li>
                <ul>
                  <li><a>Urban Waste</a></li>
                  <li><a>Public Transport</a></li>
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
      <div style={{ width: "79%", height: "700px", float: "rigth" }}>
        <AddCont />
      </div>
    </React.Fragment>
  );
}
// }

export const Navigation = connect(store => ({ user: store.user }))(_Navigation);
