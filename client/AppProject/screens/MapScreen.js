import React, { Component } from 'react';
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Constants, MapView, Location, Permissions } from 'expo';
import { ContsAPI } from "../src/lib/conts";


class _Mapa extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      latitude: 40.342323,
      longitude: -3.23451423,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    ContsAPI.getCont()
      .then(cont => {
        const a = cont.map(e => ({ latitude: e.lat, longitude: e.lng, id:e._id, type:e.type, name: e.name, level: e.level }))
        this.setState({
          locations: a
        })
      })
      .catch(e => e);
  }
  

  render() {
    let { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          zoom={20}
          region={{
            // latitude: this.state.latitude,
            // longitude: this.state.longitude,
            latitude: 40.360420,
            longitude: -3.665145,
            latitudeDelta: 0.004,
            longitudeDelta: 0.005,
          }}
          >

          {this.state.locations.map(marker => (
            <MapView.Marker
              key={marker.latitude}
              coordinate={marker}
              title={"marker.latitude"}
              description={'a'}
              onPress={() => navigation.navigate("Cards", {
                marker: marker.id, type: marker.type, name: marker.name, level: marker.level
              })}
            />
          ))}

        </MapView>
      </View>
    )
  }
};

export default (Mapa = connect(store => ({ user: store.user }))(_Mapa));