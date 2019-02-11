import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AuthAPI } from "../lib/auth";


const _NavBar = ({ user, dispatch }) => {

    return (
      <div className="Nav">
        <nav className="navbar" style={{paddingTop:"10px", paddingLeft:"50px"}} role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src="./images/logo.png" alt="logo" width="162" height="45" />
            </Link>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
          {user ? ( 
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
              ) : 
              <div></div>
              }
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


                  ) : <div><Link to="/signup" style={{backgroundColor: "#df6769"}} className="button is-primary is-rounded">Sign up</Link>
                      </div>}

                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

export const NavBar = connect(store => ({ user: store.user }))(_NavBar);
