import React, { Component } from "react";
import Input from '../components/Input';
import {  login  } from '../lib/Redux/actions';
import { AuthAPI } from "../lib/auth";
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NavBar } from "../components/Nabvar";

library.add(faArrowRight)


export class _Home extends Component {

  constructor(){
    super();
    this.state = {
        username:"",
        password:"",
        msg: "",
    }
}

handleLogin(){
    const {username, password} = this.state;
    const {dispatch, history} = this.props;
    AuthAPI.login(username, password)
    .then( user =>{
      dispatch(login(user))
      history.push("/navigation")
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
      <React.Fragment>
        <NavBar/>
        <div style={{height:"700px", backgroundImage: 'url(' + "./images/backHome.jpg" + ')', backgroundRepeat:"no-repeat" }}>
          <div style={{paddingTop:"100px", paddingLeft:"50px", width:"500px"}}>
          
          <p style={{fontWeight:"bold", color:"gray", marginTop:"50px", marginBottom:"-10px"}}>ACCESS WITH USERNAME AND PASSWORD</p>
          <p style={{fontWeight:"bold", color:"#4c71ae", fontSize:"2.6em", marginBottom:"50px"}}>Madrid Town Hall Data</p>
          
          <Input text="Username" onChange={e => this.setState({password:e.target.value})} />
        <Input text="Password" type="password" onChange={e => this.setState({username:e.target.value})}/>
        <button className="button is-rounded" style={{color: "#fff", backgroundColor: "#4c71ae", fontSize:"1.2em", fontWeight:"bold", border:"0px", boxShadow:"9px 9px 18px -4px rgba(0,0,0,0.75)", marginTop:"20px"}} onClick={() => this.handleLogin()}>Login Now&nbsp; &nbsp; 
        <FontAwesomeIcon icon="arrow-right" style={{color:"#fff", fontSize:"1.3em"}} />
        </button>

          </div>

          {msg ? (
      
      <div style={{backgroundColor: "#df6769",  width:340, marginLeft:60, marginTop: 20}}>
      <p style={{color: "white", textAlign:"center", marginTop: 5, marginBottom:5, fontSize: 16}}>
        Username or password does not exist. <br></br> Please, try again
      </p>
      </div>
      
      ) : (<React.Fragment></React.Fragment>)}


        </div>
      </React.Fragment>   
    );
  }
}

export const Home = connect(store => store)(_Home);