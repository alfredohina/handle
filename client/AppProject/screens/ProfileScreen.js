import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Image, Input } from "react-native-elements";

import { connect } from "react-redux";
import { AuthAPI } from "../src/lib/auth";
import { logout } from "../src/lib/redux/actions";

class _Profile extends React.Component {
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
    this.setState({ id: this.props.user._id, previmage: this.props.user.image })
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
    AuthAPI.upload(this.props.image).then(e => this.componentWillReceiveProps())
  };

  handleFormSubmit = () => {
    const { mail, id } = this.state;
    AuthAPI.updateuser(mail, id)
    };



  handleLogOut() {
    let { dispatch, navigation } = this.props;
    AuthAPI.logout()
      .then(() => {
        dispatch(logout());
      })
      .then(() => {
        navigation.navigate("SignedOut");
      });
  }


  render() {
    let { user } = this.props
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title={user.username}>
          <Image
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              height: 150,
              borderRadius: "50%",
              alignSelf: "center",
              marginBottom: 20
            }}
            source={{
              uri: user.image
            }}
          />
          <View style={{alignItems:"center", justifyContent: "center" }}><Text>{user.mail}</Text></View>
          

          <Input
            secureTextEntry
            placeholder="Mail"
            onChangeText={mail => this.setState({ mail })}
          />

<Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="UPDATE USER"
            onPress={() => this.handleFormSubmit()}
          />


          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() => this.handleLogOut()}
          />
        </Card>

      </View>
    );
  }
}

export default (Profile = connect(store => ({ user: store.user }))(_Profile));