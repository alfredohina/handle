import React from "react";
import { Platform, StatusBar, ScrollView, Text, Linking, View, BackHandler } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";

class _Cards extends React.Component{
  constructor() {
    super();
    this.state = {
      locations: []
    };
  }
  
  render() {
    let { navigation } = this.props;
    console.log(this.props)

    return (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <Card>
        <Text>CARDS</Text>
        <Button
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
          />
      </Card>
    </ScrollView>
  </View>
  )}
};


export default (Cards = connect(store => ({ user: store.user }))(_Cards));