import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from "expo";

export default class App extends React.Component {

  static navigationOptions = {
    title: 'Map Screen Test',
  };

  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
        }
      ]
    })
  }


  render() {
    return (

      <MapView
    style={{ flex: 1 }}
    provider="google"
    showsTraffic={true}
    showsMyLocationButton={true}
    showsUserLocation={true}
    mapType="standard"
    onPress={this.handlePress}
    initialRegion={{
      latitude: 40.76727216,
      longitude: -73.99392888,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
>
{this.state.markers.map((marker) => {
        return (
          <MapView.Marker {...marker} >
          </MapView.Marker>
        )
      })}
</MapView>
    );
  }
}
