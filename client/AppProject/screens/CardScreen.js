import React from 'react';
import { Platform, StatusBar, ScrollView, Text, Linking, View, BackHandler } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { ReportAPI } from "../src/lib/report";
import { MapView } from 'expo';


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
    let cont = (this.props.navigation.state.params.marker)
    ReportAPI.getData(user, date, cont)
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
    let { marker, type, lat, lng, name } = this.props.navigation.state.params;
    let user = this.props.user._id
    let gender = this.props.user.gender
    ReportAPI.addReport(user, marker, type, date, name, lat, lng, gender)
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


      <MapView
          style={{ flex: 1 }}
          initialRegion={{
            // latitude: this.state.latitude,
            // longitude: this.state.longitude,
            //CANILLEJAS
            latitude: navigation.state.params.lat,
            longitude: navigation.state.params.lng,
            //MERCAM
            // latitude: 40.365796,
            // longitude: -3.663387,
            latitudeDelta: 0.001,
            longitudeDelta: 0.005,
          }}
          >

            <MapView.Marker
            key={navigation.state.params.latitude}
            coordinate={{
              latitude: navigation.state.params.lat,
              longitude: navigation.state.params.lng
            }}
            title={navigation.state.params.name}
            />

        </MapView>


    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>

    <Text style={{ alignSelf:"center", fontSize: 20 }}>Reporting an incidence</Text>

      <Card containerStyle={{ backgroundColor: '#4c71ae' }}>

        <Text style={{ color:"white", fontSize: 16 }}>Container name: {navigation.state.params.name}</Text>
        <Text style={{ color:"white", fontSize: 16 }}>Type of waste: {navigation.state.params.type}</Text>
        <Text style={{ color:"white", fontSize: 16 }}>Level: {navigation.state.params.level}</Text>


          <Button
            buttonStyle={{ borderRadius: 100, marginTop: 20, width: "50%", alignSelf:"center", backgroundColor: "white" }}
            title="REPORT NOW"
            disabled={!this.state.button}
            titleStyle={{ color: "tomato", fontWeight: "bold"}}
            onPress={() => this.reportSubmit()}
          />
        

      {this.state.reported ? (<Text style={{backgroundColor: "green", marginTop:20}}>
        Reported!! Please Wait
      </Text>) : (<React.Fragment></React.Fragment>)}

      </Card>
    </ScrollView>
  </View>
  )}
};


export default (Cards = connect(store => ({ user: store.user }))(_Cards));