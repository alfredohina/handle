import React from "react";
import { connect } from "react-redux";
import { View, Image } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { AuthAPI } from "../src/lib/auth";
import { login, errorMessageAction, clearMessages } from "../src/lib/redux/actions";


class _SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      msg: ""
    };
  }

  componentDidMount(){
   let {dispatch} = this.props;
   dispatch(clearMessages())
  }

  handleSubmit() {
    let { dispatch, navigation } = this.props;
    let { username, password } = this.state;

    if (username === "" || password === "") {
      // dispatch(errorMessageAction("You have to enter data"));
      alert("You have to enter data");
    } else {
      AuthAPI.login(username, password)
        .then(user => {
          if (user !== undefined || user !==null) {
            dispatch(login(user));
            navigation.navigate("SignedIn");
          } else {
            dispatch(errorMessageAction("User not found"));
          }
        })
        .catch(() => this.alertLogin()
         );
    }
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
    let { navigation } = this.props;
    let { msg } = this.state;
    return (
      <View style={{ paddingVertical: 70, flex: 1, backgroundColor: "#4c71ae" }}>

        <Image style={{ alignSelf: "center" }} source={require('../public/images/world.png')} />
          <View style={{ paddingHorizontal: 30, paddingVertical: 30}}>
            <Input
              placeholderTextColor="grey"
              inputStyle={{ width: "50%" }}
              borderBottomColor='white'
              borderBottomWidth="1"
              placeholderTextColor="white"
              placeholder="Username"
              onChangeText={username => this.setState({ username })}
            />
            <Input
              inputStyle={{ width: "50%" }}
              borderBottomColor='white'
              borderBottomWidth="1"
              placeholderTextColor="white"
              placeholder="Password"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
            />
          </View>


          {/* {msg ? <Text style={{ marginTop:15, textAlign: "center", color: "tomato" }}></Text>
          :
          (<React.Fragment></React.Fragment>)} */}
          

          {msg ? (
      
      <View style={{backgroundColor: "tomato", marginLeft:30, marginRight: 30}}>
      <Text style={{color: "white", textAlign:"center", marginTop: 5, marginBottom:5, fontSize: 16}}>
        Username or password does not exist. Please, retry
      </Text>
      </View>
      
      ) : (<React.Fragment></React.Fragment>)}



          <Button
            buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "white" }}
            title="LOG IN"
            titleStyle={{ color: "tomato", fontWeight: "bold"}}
            onPress={() => this.handleSubmit()}
          />
        <Text style={{ marginTop:15, textAlign: "center", color: "white" }}>or</Text>
        <Button
            buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "white" }}
            titleStyle={{ color: "tomato", fontWeight: "bold"}}
            title="SIGN IN"
            onPress={() => navigation.navigate("SignUp")}
            />

          
      </View>
    );
  }
}

export const SignIn = connect(store => ({ user: store.user }))(_SignIn);