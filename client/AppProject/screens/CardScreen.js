import React from "react";
import { Platform, StatusBar, ScrollView, Text, Linking, View, BackHandler } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { ContsAPI } from "../src/lib/conts";


class _Cards extends React.Component{
  constructor() {
    super();
    this.state = {
      locations: []
    };
  }

  handleFormSubmit = () => {
    const { mail, id } = this.state;
    AuthAPI.updateuser(mail, id)
    };
    
  
  render() {
    let { navigation } = this.props;
    let date = Date.now()
    let user = this.props.user._id
    let nuevolevel = navigation.state.params.level + 1
    return (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <Card>
        <Text>Name: {navigation.state.params.name}</Text>
        <Text>Type: {navigation.state.params.type}</Text>
        <Text>Level: {navigation.state.params.level}</Text>
        <Text>New level: {nuevolevel}</Text>
        <Text>Id: {navigation.state.params.marker}</Text>

        <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() => ContsAPI.updateLevel(navigation.state.params.marker, nuevolevel, user, date)}
          />



        {/* <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="PROPS"
            onPress={() => console.log("user: " + this.props.user._id + " cont: " + this.props.navigation.state.params.marker)}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="BACK"
            onPress={() => navigation.navigate('Mapa')}
          /> */}
      </Card>
    </ScrollView>
  </View>
  )}
};


export default (Cards = connect(store => ({ user: store.user }))(_Cards));