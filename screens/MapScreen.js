const haversine = require('haversine')

import React from 'react';
import { MapView } from 'expo';
import { Alert, Button, View, Text} from 'react-native';

let start = {
  latitude:   37.78825,
  longitude: -118.1253
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
      start_latitude: 37.78825,
      start_longitude: -118.1253,
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

getInitialState() {
  return {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0432,
    },
  };
}

onRegionChange(region) {
  this.setState({region});
}

render() {
  return (
    <MapView
      region={this.state.region}
      onRegionChange={this.onRegionChange}
    />
  );
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
        onUserLocationChange={(event) => { 
          let s_coordinate = event.nativeEvent.coordinate;

          if (this.state.markers.length > 0) {
            for(let i = 0; i < this.state.markers.length; ++i) {
              let e_coordinate = this.state.markers[i].coordinate;
              let start = {
                latitude: s_coordinate.latitude,
                longitude: s_coordinate.longitude
              }
              let end = {
                latitude: e_coordinate.latitude,
                longitude: e_coordinate.longitude
              }
              let meter = haversine(start, end, {unit:'meter'}) - 250;
              console.log(meter);
            }
          }
        }}
        mapType="standard"
        onLongPress={this.handlePress}
        
        initialRegion={{
          latitude: this.state.start_latitude, //34.1377
          longitude: this.state.start_longitude, //118.1253
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}

        // region={this.state.region}
        // onRegionChange={this.onRegionChange}
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
    </View>
    );
    console.log(this.state.start_latitude);
  }
}