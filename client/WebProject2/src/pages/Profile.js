import React from 'react';
import { Login } from './login';
import { Signup } from './signup';
import { connect } from 'react-redux';
import { AuthAPI } from "../lib/auth";
import Input from "../components/Input";
import { Header } from '../components/Headers';
import { withRouter } from "react-router-dom";



export class _Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      id:"",
      mail:"",
      image: "",
      file: "",
      previmage: "",
      username: "",
      password: "",
      refresh: ""
    }
  }

  componentDidMount() {
    this.setState({ avatar: this.props.user.image })
  }


  handleImgChange = (e) => {
    const name = "a";
    let file = new FormData();
    file.set("name", name)
    file.append("photo", e.target.files[0], name);
    let { dispatch } = this.props;
    dispatch({ type: "IMG_UPLOAD", image: file })
  }
  
  handleUpload = (e) => {
    e.preventDefault();
    AuthAPI.upload(this.props.image).then(() => 
      this.setState({ previmage: this.props.user.image }))
      // window.location.reload())
  };


  handleFormSubmit = (event) => {
    event.preventDefault();
    const { mail, id } = this.state;
    AuthAPI.updateuser(mail, id)
        // .then(data => {
        //     dispatch(login(data))
        // });
        // history.push("/");
    };

  render() {

    const { user, image, mail } = this.props
    const { password } = this.state;

    return (

      <div>
        <Header title={"Profile"} />
        {user ?
          <div>

            <form onSubmit={this.handleFormSubmit} style={{ paddingTop: "150px" }}>
            <p>{user.mail}</p>

              <div className="field is-horizontal" style={{ paddingTop: "40px" }}>
                <div className="field-label is-normal">
                  <label className="label">Email: </label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control" style={{ width: "70%" }}>
                      <input className="input" type="text" onChange={e => this.setState({ mail: e.target.value, id: this.props.user._id })} />
                    </p>
                  </div>
                </div>
              </div>


              <button className="button is-info" style={{color: "#fff", margin: "auto", display:"block", backgroundColor: "#4c71ae"}} type="submit" value="Submit">Edit profile</button>


            </form>
              <img className="avatarImg" src={this.props.user.image} alt="avatar" width="60%" style={{ width: "20%" }} />
              <input type="file" onChange={(e) => this.handleImgChange(e)} name="name" />
              <button onClick={(e) => this.handleUpload(e)}>UPLOAD</button>
          </div>
          :
          <React.Fragment>
            <Signup />
            <Login />
          </React.Fragment>
        }

      </div>
    )
  }

}

export const Profile = connect(store => store)(withRouter(_Profile));