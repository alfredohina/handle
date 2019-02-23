import React from 'react';
import {Login} from './login';
import {Signup} from './signup';
import {connect} from 'react-redux';
import { AuthAPI } from "../lib/auth";
import Input from "../components/Input";
import { Header } from '../components/Headers';



export class _Profile extends React.Component{
  constructor() {
    super()
    this.state = {
      image: ""
    }
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
    console.log(this.props)
    AuthAPI.upload(this.props.image).then(e => console.log('antonio' + e))
  };

  render(){

    const {user} = this.props
    return(

      <div> 
        <Header title={"Profile"} />
        {user ?
        <div>

          <form style={{ paddingTop: "200px" }}>
            <input type="file" onChange={(e) => this.handleImgChange(e)} name="name"/>
            <button onClick={(e) => this.handleUpload(e)}>SUBIR</button>
          </form>


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

export const Profile = connect(store => store)(_Profile);