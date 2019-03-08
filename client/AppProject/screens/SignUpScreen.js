import React from "react";
import { connect } from "react-redux";
import { View, Picker, Image } from "react-native";
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
      gender: "male",
    };
  }


  componentDidMount(){
   let {dispatch} = this.props;
   dispatch(clearMessages())
  }

  handleSubmit() {
    let { dispatch, navigation } = this.props;
    let { username, password, type, gender } = this.state;

    AuthAPI.signup(username, password, type, gender)
        .then(user => {
          console.log(user)
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
      <View style={{ paddingVertical: 50, flex: 1, backgroundColor: "#4c71ae" }}>

<Image style={{ width: "100%", alignSelf: "center" }} source={require('../public/images/signup.png')} />


        <View style={{ paddingHorizontal: 30 }}>

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

<Picker
  selectedValue={this.state.gender}
  itemStyle={{ color: "white", height: 150, width: 250, alignSelf: "center" }}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({gender: itemValue})
  }>
  <Picker.Item label="Male" value="male" />
  <Picker.Item label="Female" value="female" />
</Picker>

<View>

          <Button
            buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "white" }}
            title="SIGN IN"
            titleStyle={{ color: "tomato", fontWeight: "bold"}}
            onPress={() => this.handleSubmit()}
          />

<Text style={{ marginTop:15, textAlign: "center", color: "white" }}>or</Text>

          <Button
            buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "white" }}
            titleStyle={{ color: "tomato", fontWeight: "bold"}}
            title="LOG IN"
            onPress={() => navigation.navigate("SignIn")}
          />
    
      </View>
      </View>

          {messages.map(m => (
          <Text key={m}>{m}</Text>
        ))}
      </View>
    );
  }
}

export const SignUp = connect(store => ({ messages: store.messages }))(_SignUp);
export default SignUp;