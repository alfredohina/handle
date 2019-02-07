import React from 'react';
import {Login} from './login';
import {Signup} from './signup';
import {connect} from 'react-redux';
import { AuthAPI } from "../lib/auth";
import {  logout  } from '../lib/Redux/actions';



export class _Principal extends React.Component{

  handleLogout(){
    const {dispatch} = this.props;
    AuthAPI.logout()
    .then( user =>{
        dispatch(logout(user))
    })
    .catch( e =>  e);
  }

  handleImgChange = (e) => {
    const name = "a";
    let file = new FormData();
    file.set("name",name)
    file.append("photo", e.target.files[0], name);
    let {dispatch} = this.props;
    dispatch({type:"IMG_UPLOAD", image: file})
    console.log('HOLA')
  }

  handleUpload = (e) => {
    e.preventDefault();
    console.log(this.props.image)
    AuthAPI.upload(this.props.image).then(e => console.log('antonio' + e))
    
  };

  render(){

    const {user} = this.props
    return(

      <div> 
        {user ?
        <div>
        <p>Estas fuera!</p>

          <form>
            <input type="file" onChange={(e) => this.handleImgChange(e)} name="name"/>
            <button onClick={(e) => this.handleUpload(e)}>SUBIR</button>
        </form>

        <button onClick={() => this.handleLogout()}>LOGOUT</button>
        </div>
        :
        <React.Fragment>
        <Signup/>
        <Login/>
        </React.Fragment>
        }

      </div>
    )
  }

}

export const Principal = connect(store => store)(_Principal);

