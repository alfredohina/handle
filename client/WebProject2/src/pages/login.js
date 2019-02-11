import React, { Component } from "react";
import Input from '../components/Input';
import {  login  } from '../lib/Redux/actions';
import { AuthAPI } from "../lib/auth";
import { connect } from 'react-redux';

export class _Login extends Component {

  constructor(){
    super();
    this.state = {
        username:"",
        password:""
    }
}

handleLogin(){
    const {username, password} = this.state;
    const {dispatch, history} = this.props;
    AuthAPI.login(username, password)
    .then( user =>{
      dispatch(login(user))
      history.push("/")
    })
    .catch( e =>  e);
}
  
  render() {
    return (
      <div style={{width:"30%", display:"block", margin:"auto", textAlign:"center", marginTop:"30px"}}>
        <Input text="Nombre" onChange={e => this.setState({password:e.target.value})} />
        <Input text="Password" onChange={e => this.setState({username:e.target.value})}/>
        <button className="button is-warning" style={{marginTop:"20px"}} onClick={() => this.handleLogin()}>Login</button>
      </div>
    );
  }
}

export const Login = connect(store => store)(_Login);