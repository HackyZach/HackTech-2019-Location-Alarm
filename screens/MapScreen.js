import React from 'react';
import { MapView } from 'expo';
import { Alert, Button, View } from 'react-native';

// class alarm_trigger {
//   constructor(user_longitude, user_latitude, marker_longitude, marker_latitude) {
//     this.user_longitude = user_longitude;
//     this.user_latitude = user_latitude;
//     this.marker_longitude = marker_longitude;
//     this.marker_latitude = marker_latitude;
//   }
// }

let alarm_trigger = {
  user_longitude: 0,
  user_latitude: 0,
  marker_longitude: 0,
  marker_latitude: 0
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

  compute_alarm(latitude, longitude) {
    Alert.alert(latitude, longitude);
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
          alarm_trigger.user_latitude = event.nativeEvent.coordinate.latitude;
          alarm_trigger.user_longitude = event.nativeEvent.coordinate.longitude;
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
          alarm_trigger.marker_longitude = marker.coordinate.longitude;
          alarm_trigger.marker_latitude = marker.coordinate.latitude;
          </MapView.Marker>
        ))}
      </MapView>
    </View>
    );
  }
}