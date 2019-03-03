const haversine = require('haversine')

import React from 'react';
import { MapView } from 'expo';
import { Alert, Button, View } from 'react-native';

let start = {
  latitude: 0,
  longitude: 0
};

let end = {
  latitude: 0,
  longitude: 0
};

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
        onUserLocationChange= {(event)=>{
          start.user_latitude = event.nativeEvent.coordinate.latitude;
          start.user_longitude = event.nativeEvent.coordinate.longitude;
        }}
        mapType="standard"
        onLongPress={this.handlePress}
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
          end.marker_longitude = marker.coordinate.longitude;
          end.marker_latitude = marker.coordinate.latitude;
          haversine(start, end, unit: 'meter');
          </MapView.Marker>
        ))}
      </MapView>
    </View>
    );
  }
}