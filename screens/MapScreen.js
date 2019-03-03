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

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Are we there yet?',
  };

  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      start_latitude: 0,
      start_longitude: 0,
      end_latitude: 0,
      end_longitude: 0
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

set_start_coordinates(event) {
  this.state.start_latitude = event.latitude;
  this.state.start_longitude = event.longitude;
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
          this.set_start_coordinates(event);
          // console.log(this.state.start_latitude);
          // console.log(this.state.start_longitude);
          // this.state.start_latitude = event.latitude;
          // this.state.start_longitude = event.longitude;
          // console.log(event.latitude);
          // console.log(event.longitude);
        }}
        mapType="standard"
        onLongPress={this.handlePress}
        
        initialRegion={{
          latitude: this.state.start_latitude, //34.1377
          longitude: this.state.start_longitude, //118.1253
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
          {/* end.marker_longitude = marker.coordinate.longitude;
          end.marker_latitude = marker.coordinate.latitude;
          Alert.alert("Distance: " + haversine(start, end, unit: 'meter') - 250; // Radius is fixed at 250 meters. */}
          </MapView.Marker>
        ))}
      </MapView>
    </View>
    );
  }
}