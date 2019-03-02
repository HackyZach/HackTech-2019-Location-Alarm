import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { MapView } from 'expo';
import Dialog from 'react-native-dialog';

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Map Screen Test',
  };

  constructor(props) {
    super(props);

    this.state = {
      markers: [],
    };
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          key: e.nativeEvent.coordinate.latitude,
          coordinate: e.nativeEvent.coordinate,
        },
      ],
    });
  }

  render() {
    return (
        <MapView
          style={{ flex: 1 }}
          provider="google"
          showsTraffic
          showsMyLocationButton
          showsUserLocation
          mapType="standard"
          onLongPress={this.handlePress}
        // onMarkerPress={}
          initialRegion={{
            latitude: 40.76727216,
            longitude: -73.99392888,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

          {this.state.markers.map(marker => (
            <MapView.Marker
              {...marker}
              title="Marker #XX"
              description="Tap to Change Info"
              onCalloutPress={this.handleDialogueBox}
            >
            </MapView.Marker>
          ))}
        </MapView>
    );


  }
}
