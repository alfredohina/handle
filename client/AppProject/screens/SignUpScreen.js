import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Card, Button, Input, Text } from "react-native-elements";
import { AuthAPI } from "../src/lib/auth";
import { login, errorMessageAction, clearMessages } from "../src/lib/redux/actions";


class _SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      type: "citizen",
    };
  }

  componentDidMount(){
   let {dispatch} = this.props;
   dispatch(clearMessages())
  }

  handleSubmit() {
    let { dispatch, navigation } = this.props;
    let { username, password, type } = this.state;

    AuthAPI.signup(username, password, type)
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

  
  render() {
    let { dispatch, navigation } = this.props;
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
            title="LOG IN"
            onPress={() => this.handleSubmit()}
          />
        <Text style={{ marginTop:15, textAlign: "center" }}>or</Text>
        <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={() => navigation.navigate("SignUp")}
            />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="MAP"
            onPress={() => navigation.navigate("Mapa")}
            />
        </Card>
          {messages.map(m => (
          <Text key={m}>{m}</Text>
        ))}
      </View>
    );
  }
}

export const SignUp = connect(store => ({ messages: store.messages }))(_SignUp);
export default SignUp;