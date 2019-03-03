const haversine = require('haversine')

import React from 'react';
import { MapView } from 'expo';
import { Alert, Button, View } from 'react-native';

let start = {
  latitude:  40.689247,
  longitude: -74.044502
};

let end = {
  latitude: 0,
  longitude: 0
};

  function set_coordinates(event) {
    start.latitude = event.latitude;
    start.longitude = event.longitude;
  }

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
    <View style={{flex: 1}}>
      <MapView
        style={{ flex: 1 }}
        provider="google"
        showsTraffic
        showsMyLocationButton
        showsUserLocation = {true}
        showsCompass = {true}
        onUserLocationChange= {(event)=>{
          set_coordinates(event);
        }}
        mapType="standard"
        onLongPress={this.handlePress}

        initialRegion={{
          latitude: start.latitude, //34.1377
          longitude: start.longitude, //118.1253
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
          end.marker_longitude = marker.coordinate.longitude;
          end.marker_latitude = marker.coordinate.latitude;
          Alert.alert("Distance: " + haversine(start, end, unit: 'meter') - 250; // Radius is fixed at 250 meters.
          </MapView.Marker>
        ))}
      </MapView>
    </View>
    );
  }
}