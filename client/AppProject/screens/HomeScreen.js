import React from "react";
import { Platform, StatusBar, ScrollView, Text, Linking, View, BackHandler, Image } from "react-native";
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
     
    <Text style={{ alignSelf:"center", fontSize: 20 }}>Sections</Text>

      <Card containerStyle={{ backgroundColor: '#4c71ae' }} >
     
      <Image style={{ width: "100%", alignSelf: "center" }} source={require('../public/images/service1.jpg')} />
        <Button
            buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "white" }}
            title="URBAN WASTE"
            titleStyle={{ color: "tomato", fontWeight: "bold"}}
            onPress={() => navigation.navigate('Mapa')}
          />
      </Card>

      <Card containerStyle={{ backgroundColor: '#4c71ae' }} >
     
     <Image style={{ width: "100%", alignSelf: "center" }} source={require('../public/images/service2.jpg')} />
       <Button
           buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "white" }}
           title="TRANSPORT"
           titleStyle={{ color: "tomato", fontWeight: "bold"}}
           onPress={() => navigation.navigate('Mapa')}
         />
     </Card>

     <Card containerStyle={{ backgroundColor: '#4c71ae' }} >
     
     <Image style={{ width: "100%", alignSelf: "center" }} source={require('../public/images/service3.jpg')} />
       <Button
           buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "white" }}
           title="LIGHTING"
           titleStyle={{ color: "tomato", fontWeight: "bold"}}
           onPress={() => navigation.navigate('Mapa')}
         />
     </Card>
    </ScrollView>
  </View>
  )}
};


export default (Home = connect(store => ({ user: store.user }))(_Home));