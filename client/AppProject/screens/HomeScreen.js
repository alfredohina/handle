import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
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
// console.log(this.props.navigation.state.params)
    return (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <Card>
        <Text>Hola a</Text>
        <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="PROPS"
            onPress={() => console.log(this.props.navigation.state.params.marker)}
          />
      </Card>
    </ScrollView>
  </View>
  )}
};


export default (Home = connect(store => ({ user: store.user }))(_Home));