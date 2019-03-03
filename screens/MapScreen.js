import React from 'react';
import { MapView } from 'expo';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Dev-MapTest',
  };

  state = {
    searchNew: '',
    markers: [],
    count: 1,
  };

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  updateSearch = (search) => {
    this.setState({ searchNew: search });
  };

  handleLocation = (e) => {
    // User coordinates
    // console.log(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
    this.setState({
      lat: e.nativeEvent.coordinate.latitude,
      long: e.nativeEvent.coordinate.longitude,
    });
  };

  handlePress(e) {
    this.setState({ count: this.state.count + 1 });
    this.setState({
      markers: [
        ...this.state.markers,
        {
          key: this.state.count,
          coordinate: e.nativeEvent.coordinate,
        },
      ],
    });
  }

  markerName(e) {
    return `Map Marker #${e.key}`;
  }

  handleDialogueBox(e) {
    // Not working
    console.log(e);
  }

  render() {
    const { searchNew: search } = this.state;
    // User Coords
    const { lat: lati } = this.state;
    const { long: longi } = this.state;
    // console.log(lati, longi)
    const { i: v } = this.state;

    console.log(search);

    return (
      <MapView
        style={{ flex: 1 }}
        provider="google"
        showsTraffic
        showsMyLocationButton
        showsUserLocation
        mapType="standard"
        onLongPress={this.handlePress}
        // onUserLocationChange={this.handleLocation}
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
            <Text style={styles.calloutView}> Yay! Im a callout! </Text>
          </View>
        </MapView.Callout>

        {this.state.markers.map(marker => (
          // console.log(marker),
          <View key={marker.coordinate.latitude}>
            <MapView.Marker
              {...marker}
              onDrag={this.updateCircle}
              title={this.markerName(marker)}
              description="Tap to Change Info"
              onCalloutPress={this.handleDialogueBox(marker)}
            >
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

const styles = StyleSheet.create({
  calloutView: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    width: '40%',
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: 20,
  },
});
