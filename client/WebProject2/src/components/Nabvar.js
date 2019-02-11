import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AuthAPI } from "../lib/auth";


const _NavBar = ({ user, dispatch }) => {

    return (
      <div className="Nav">
        <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src="./images/logo.png" alt="logo" width="112" height="28" />
            </a>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>

              <a className="navbar-item">
              {user ? ('User') : ('No User')}
      </a>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Containers
        </a>

                <div className="navbar-dropdown">
          
          <Link to="/showcont" className="navbar-item">Show All</Link>
          <Link to="/addcont" className="navbar-item">Add New</Link>


                  <hr className="navbar-divider" />
                  <a className="navbar-item">
                    Report an issue
          </a>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {user ? (
                    <Link
                      to="/"
                      className="button is-danger"
                      onClick={() =>
                        AuthAPI.logout().then(e => dispatch({ type: "LOGOUT" }))
                      }> Logout <i className="fa fa-home" />
                    </Link>


                  ) : <div><Link to="/signup" className="button is-primary">Sign up</Link>
                      <Link to="/login" className="button is-light">Login</Link></div>}

                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

export const NavBar = connect(store => ({ user: store.user }))(_NavBar);
