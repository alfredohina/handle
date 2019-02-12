import React, { Component } from "react";
import Input from '../components/Input';
import { AuthAPI } from "../lib/auth";
import { connect } from 'react-redux';
import {  login  } from '../lib/Redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NavBar } from "../components/Nabvar";

library.add(faArrowRight)
 
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
      history.push("/navigation")
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
      <React.Fragment>
      <NavBar/>
        <div style={{height:"700px", backgroundImage: 'url(' + "./images/backHome.jpg" + ')', backgroundRepeat:"no-repeat" }}>
          <div style={{paddingTop:"100px", paddingLeft:"50px", width:"500px"}}>
          
            <p style={{fontWeight:"bold", color:"gray", marginTop:"50px", marginBottom:"-10px"}}>CREATE A NEW ACCOUNT</p>
            <p style={{fontWeight:"bold", color:"#df6769", fontSize:"2.6em", marginBottom:"30px"}}>Madrid Town Hall Data</p>
            <Input text="Username" onChange={(e) => this.handleName(e)} />
            <Input text="Password" type="password" onChange={(e) => this.handlePass(e)}/>
            <button className="button is-rounded" style={{color: "#fff", backgroundColor: "#df6769", fontSize:"1.2em", fontWeight:"bold", border:"0px", boxShadow:"9px 9px 18px -4px rgba(0,0,0,0.75)", marginTop:"20px"}} onClick={() => this.handleSubmit()}>Register Now&nbsp; &nbsp; 
            <FontAwesomeIcon icon="arrow-right" style={{color:"#fff", fontSize:"1.3em"}} />
            </button>

          </div>
        </div>
      </React.Fragment>
    );
  }
}


export const Signup = connect(store => store)(_Signup);

