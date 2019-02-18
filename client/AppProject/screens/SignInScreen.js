import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Card, Button, Input, Text } from "react-native-elements";
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
    let { messages } = this.props;
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <Input
            placeholder="Username"
            onChangeText={username => this.setState({ username })}
          />

          <Input
            secureTextEntry
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
          />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={() => this.handleSubmit()}
          />
        </Card>
        {messages.map(m => (
          <Text key={m}>{m}</Text>
        ))}
      </View>
    );
  }
}

export const SignIn = connect(store => ({ messages: store.messages }))(_SignIn);