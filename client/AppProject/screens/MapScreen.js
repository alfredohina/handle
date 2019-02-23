import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { MapView } from 'expo';
import { ContsAPI } from "../src/lib/conts";


class _Mapa extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: []
    };
  }


  componentDidMount() {
    ContsAPI.getCont()
      .then(cont => {
        const a = cont.map(e => ({ latitude: e.lat, longitude: e.lng }))
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
          initialRegion={{
            latitude: 40.365774408723254,
            longitude: -3.662289775146519,
            latitudeDelta: 0.004,
            longitudeDelta: 0.005,
          }}>

          {this.state.locations.map(marker => (
            <MapView.Marker
              key={marker.latitude}
              coordinate={marker}
              title={"marker.latitude"}
              description={'a'}
              onPress={() => navigation.navigate("Profile", {
                marker: marker.latitude,
              })}
              image={require('../public/images/trash.png')}
            />
          ))}

        </MapView>
      </View>
    )
  }
};

export default (Mapa = connect(store => ({ user: store.user }))(_Mapa));