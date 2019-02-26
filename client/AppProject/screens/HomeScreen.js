import React from "react";
import { Platform, StatusBar, ScrollView, Text, Linking, View, BackHandler } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";

class _Home extends React.Component{
  constructor() {
    super();
    this.state = {
      locations: []
    };
  }
  
  render() {
    let { navigation } = this.props;

    return (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <Card>
        <Text>Hola a</Text>
        <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="PROPS"
            onPress={() => console.log(this.props.user._id)}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="BACK"
            onPress={() => navigation.navigate('Card')}
          />
      </Card>
    </ScrollView>
  </View>
  )}
};


export default (Home = connect(store => ({ user: store.user }))(_Home));