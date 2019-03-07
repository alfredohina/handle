import React from "react";
import { connect } from "react-redux";
import { View, Image } from "react-native";
import { Button, Input, Text, withTheme } from "react-native-elements";
import { AuthAPI } from "../src/lib/auth";
import { login, errorMessageAction, clearMessages } from "../src/lib/redux/actions";


class _SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
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
        .catch(e => console.log(e));
    }
  }

  
  render() {
    let { dispatch, navigation } = this.props;
    let { messages } = this.props;
    return (
      <View style={{ paddingVertical: 90, flex: 1, backgroundColor: "#4c71ae" }}>

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

          {messages.map(m => (
          <Text key={m}>{m}</Text>
        ))}
      </View>
    );
  }
}

export const SignIn = connect(store => ({ messages: store.messages }))(_SignIn);