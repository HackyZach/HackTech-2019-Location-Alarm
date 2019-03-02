import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from "expo";

export default class App extends React.Component {

  static navigationOptions = {
    title: 'Map Screen Test',
  };

  
  render() {
    return (

      <MapView
    style={{ flex: 1 }}
    provider="google"
    showsTraffic={true}
    showsMyLocationButton={true}
    showsUserLocation={true}
    mapType="standard"

    region={{
      latitude: 40.76727216,
      longitude: -73.99392888,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
>
</MapView>
    );
  }
}
