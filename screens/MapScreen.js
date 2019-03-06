import React from 'react';
import { MapView } from 'expo';
import {
  View,
} from 'react-native';
import haversine from 'haversine';
import Dialog from 'react-native-dialog';


export default class App extends React.Component {
  static navigationOptions = {
    title: 'Navigation',
  };

  tempValues = {
    lat: 0,
    long: 0,
    p_lat: -1,
  };

  state = {
    markers: [],
    count: 1,
    close: false,
  };

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  closeDiag= () => {
    this.setState({ close: false });
  };

  markerName(e) {
    return `Map Marker #${e.key}`;
  }

  isClose(e, mark) {
    if (e === false) {
      return false;
    }
    if (e <= 250) {
      console.log(`YAY! CLOSE TO MAP MARKER ${mark.key}`);
      this.setState({ close: true });
      mark.active = false;
      return true;
    }
    return false;
  }

  handlePress(e) {
    const { markers: mark } = this.state;
    const { count: num } = this.state;
    this.setState({
      markers: [
        mark,
        {
          key: num,
          coordinate: e.nativeEvent.coordinate,
          active: true,
        },
      ],
    });
  }

handleLocation = (e) => {
  const userLat = e.nativeEvent.coordinate.latitude;
  const tempLat = this.tempValues.lat;
  // console.log(userLat);
  // console.log(tempLat);
  if (tempLat === userLat) {
    return;
  }
  console.log('[Debug] Location Change Detected');
  // User coordinates
  // console.log(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
  this.setState();
  this.tempValues.lat = userLat;
  this.tempValues.long = e.nativeEvent.coordinate.longitude;
  this.tempValues.p_lat = tempLat;
};

calculateDist(e) {
  const tempLat = this.tempValues.lat;
  const tempLong = this.tempValues.long;
  if (tempLat === this.tempValues.p_lat) {
    return false;
  }
  const start = {
    latitude: tempLat,
    longitude: tempLong,
  };
  this.tempValues.p_lat = tempLat;
  const end = {
    latitude: e.coordinate.latitude,
    longitude: e.coordinate.longitude,
  };
  // console.log(haversine(start, end));
  const value = haversine(start, end, { unit: 'meter' });
  console.log(`Lat: ${tempLat} Long: ${tempLong} Dist: ${value}`);
  return value;
}


render() {
  // Possible broken map markers - considering it a feature for now, dialogue box shows only once
  const { close: show } = this.state;
  const { markers: mark } = this.state;
  return (
    <MapView
      style={{ flex: 1 }}
      provider="google"
      showsTraffic
      showsMyLocationButton
      showsUserLocation
      mapType="standard"
      onLongPress={this.handlePress}
      onUserLocationChange={this.handleLocation}
        // onMarkerPress={}
      initialRegion={{
        latitude: 34.1401239,
        longitude: -118.1250156,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <MapView.Callout>
        <View>
          <Dialog.Container visible={show}>
            <Dialog.Title>Hey! Listen!</Dialog.Title>
            <Dialog.Description>
              You are really close to your destination!
            </Dialog.Description>
            <Dialog.Button label="Nice!" onPress={this.closeDiag} />
          </Dialog.Container>
        </View>
      </MapView.Callout>

      {mark.map(marker => (
        // console.log(marker),
        <View key={marker.coordinate.latitude}>
          <MapView.Marker
            {...marker}
            onDrag={this.updateCircle}
            title={this.markerName(marker)}
            description="Tap to Change Info"
          >
            {this.isClose(this.calculateDist(marker), marker)}
          </MapView.Marker>
          <MapView.Circle
            center={{
              latitude: marker.coordinate.latitude,
              longitude: marker.coordinate.longitude,
            }}
            radius={250}
          >
          </MapView.Circle>
        </View>
      ))}
    </MapView>
  );
}
}
