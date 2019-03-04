import React from 'react';
import { Platform, StatusBar, ScrollView, Text, Linking, View, BackHandler } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { ReportAPI } from "../src/lib/report";


class _Cards extends React.Component{
  constructor() {
    super();
    this.state = {
      reported: false,
      button: true,
      data: []
    };
  }

  componentDidMount() {
    let date = Date.now()
    let user = (this.props.user._id);
    console.log(user, date)
    ReportAPI.getData(user, date)
      .then(cont => {
        console.log(cont)
        if (cont.length > 0){
          this.setState(() => {
            return {button: false}
          })
        }
      })
      .catch(e => e);
  }

  timeChange = () => {
    // console.log('end')
    let { navigation } = this.props;
    window.setTimeout(() => {
      navigation.navigate('Mapa')
   }, 3000)
  }

  reportSubmit = () => {
    // let nuevolevel = navigation.state.params.level + 1
    let date = Date.now()
    let { navigation } = this.props;
    let user = this.props.user._id
    ReportAPI.addReport(user, navigation.state.params.marker, navigation.state.params.type, date)
    .then(this.setState(() => {
      return { reported: true}
    }))
    .then(this.timeChange())
    };
  
  render() {
    console.log(this.props)

    let { navigation } = this.props;
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



        {this.state.button ? (
        <Button
        backgroundColor="#03A9F4"
        title="REPORT"
        onPress={() => this.reportSubmit()}
      />
      ) : (<React.Fragment></React.Fragment>)}


        

      {this.state.reported ? (<Text style={{backgroundColor: "green", marginTop:20}}>
        Reported!! Please Wait
      </Text>) : (<React.Fragment></React.Fragment>)}

      </Card>
    </ScrollView>
  </View>
  )}
};


export default (Cards = connect(store => ({ user: store.user }))(_Cards));