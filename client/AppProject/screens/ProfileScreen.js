import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Image, Input } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';


import { ImagePicker } from 'expo';


import { connect } from "react-redux";
import { AuthAPI } from "../src/lib/auth";
import { logout } from "../src/lib/redux/actions";

class _Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      id:"",
      mail:"",
      mail2: "",
      image: null,
      file: "",
      previmage: "",
      username: "",
      password: "",
      refresh: "",
      msg: false
    }
  }


  handleChoosePhoto = () => {
    const options = {};
    ImagePicker.launchImageLibraryAsync(options, response => {
      console.log("response", response)
    })
  }


  componentDidMount() {
    this.setState({ id: this.props.user._id, previmage: this.props.user.image, mail2: this.props.user.mail })
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
    let { navigation } = this.props;
    const { mail, id } = this.state;
    AuthAPI.updateuser(mail, id)
    .then(() => {
      this.Input.clear()
      this.setState(() => {
        return { mail2: mail, msg: true}
      })
      window.setTimeout(() => {
        this.setState({ msg: false })
    }, 3000)
    })
    .then(() => {
      navigation.navigate("Profile");
    })
    };



  handleLogOut() {
    let { dispatch, navigation } = this.props;
    AuthAPI.logout()
      // .then(() => {
      //   dispatch({ type: "LOGOUT" })
      // })
      .then(() => {
        navigation.navigate("SignIn");
      });
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }


  render() {

    let { image, msg } = this.state;

    let { user } = this.props
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title={`Welcome ${user.username}`}>
          <Image
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 150,
              height: 150,
              borderRadius: 50,
              alignSelf: "center",
              marginBottom: 20
            }}
            source={{
              uri: user.image
            }}
          />
          <View style={{alignItems:"center", justifyContent: "center" }}>
          <Text>{this.state.mail2}</Text>
          <Text>{user.gender}</Text>
          </View>


        <Button
            buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "#4c71ae" }}
            titleStyle={{ color: "tomato", fontWeight: "bold"}}
            title="Choose an image"
            onPress={() => this._pickImage()}
          />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}


          <Input
            inputStyle={{marginTop: 30}}
            placeholder="Update your Mail"
            onChangeText={mail => this.setState({ mail })}
            ref={input => { this.Input = input }}
          />



          <Button
            buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "#4c71ae" }}
            titleStyle={{ color: "tomato", fontWeight: "bold"}}
            title="UPDATE USER"
            onPress={() => this.handleFormSubmit()}
          />

{msg ? (
          <View style={{backgroundColor: "green", marginTop:10, marginLeft:30, marginRight: 30}}>
            <Text style={{color: "white", textAlign:"center", marginTop: 5, marginBottom:5, fontSize: 20}}>
              User updated
            </Text>
          </View>
      
      ) : (<React.Fragment></React.Fragment>)}


          <Button
            icon={
              <Icon
                name="sign-out"
                size={15}
                color="red"
              />
            }
            buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "white" }}
            titleStyle={{ color: "tomato", fontWeight: "bold"}}
            title=" LOG OUT"
            onPress={() => this.handleLogOut()}
          />


        </Card>

      </View>
    );
  } 
}

export default (Profile = connect(store => ({ user: store.user }))(_Profile));