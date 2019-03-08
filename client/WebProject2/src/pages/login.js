import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import Input from '../components/Input';
import {  login  } from '../lib/Redux/actions';
import { AuthAPI } from "../lib/auth";
import { connect } from 'react-redux';
import { errorMessageAction } from "../lib/Redux/actions";


export class _Login extends Component {

  constructor(){
    super();
    this.state = {
        username:"",
        password:"",
        msg: ""
    }
}

handleLogin(){
    const {username, password} = this.state;
    const {dispatch, history} = this.props;
    console.log('a')
    AuthAPI.login(username, password)
    .then( user =>{
      if (user !== undefined || user !==null) {
        dispatch(login(user));
        history.push("/")
      } else {
        dispatch(errorMessageAction("User not found"));
      }
    })
    .catch(() => this.alertLogin()
         );
    }

  alertLogin = () => {
    this.setState(() => {
      return { msg: true}
  })
    window.setTimeout(() => {
      this.setState({ msg: false })
  }, 3000)
  }
  
  render() {
    const { msg } = this.state;
    return (
      <div style={{width:"30%", display:"block", margin:"auto", textAlign:"center", marginTop:"30px"}}>
        <Input text="Nombre" onChange={e => this.setState({password:e.target.value})} />
        <Input text="Password" onChange={e => this.setState({username:e.target.value})} />
        <button className="button is-warning" style={{marginTop:"20px"}} onClick={() => this.handleLogin()}>Login</button>
      
      
      
        {msg ? (
      
      <div style={{backgroundColor: "tomato", marginLeft:30, marginRight: 30}}>
      <p style={{color: "white", textAlign:"center", marginTop: 5, marginBottom:5, fontSize: 16}}>
        Username or password does not exist. Please, retry
      </p>
      </div>
      
      ) : (<React.Fragment></React.Fragment>)}
      
      </div>
    );
  }
}

export const Login = connect(store => store)(withRouter(_Login));