import React, { Component } from "react";
import Input from '../components/Input';
import { AuthAPI } from "../lib/auth";
import { connect } from 'react-redux';
import {  login  } from '../lib/Redux/actions';

 
export class _Signup extends Component {

  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      type: "admin"
    }
  }

  handleSubmit(){
    const {username, password, type} = this.state;
    console.log(username, password, type)
    const {dispatch, history} = this.props;
    AuthAPI.signup(username, password, type)
    .then(user =>{
      dispatch(login(user))
      history.push("/")
    })
    .catch(e => console.log('catch de handlesubmit'+ e))
  }

  handleName(e){
    this.setState({username: e.target.value})
  }
  handlePass(e){
    this.setState({password: e.target.value})
  }
  

  render() {

    return (
      <div>

        <Input text="Nombre" onChange={(e) => this.handleName(e)} />
        <Input text="Password" onChange={(e) => this.handlePass(e)}/>
        <button onClick={() => this.handleSubmit()}>Registrate</button>
        
      </div>
    );
  }
}


export const Signup = connect(store => store)(_Signup);

