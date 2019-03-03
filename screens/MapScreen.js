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
  };

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  updateSearch = (search) => {
    this.setState({ searchNew: search });
  };

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

  handleLocation = (e) => {
    // User coordinates
    // console.log(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
    this.setState({
      lat: e.nativeEvent.coordinate.latitude,
      long: e.nativeEvent.coordinate.longitude,
    });
  };

  handleDialogueBox(e) {
    // Not working
    console.log('Boop!');
  }

  render() {
    const { searchNew: search } = this.state;
    //User Coords
    const { lat: lati } = this.state;
    const { long: longi } = this.state;
    // console.log(lati, longi)

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
            <Text style={styles.calloutView}> Yay! Im a callout! </Text>
          </View>
        </MapView.Callout>


        {this.state.markers.map(marker => (
          // console.log(marker),
          <View key={marker.coordinate.latitude}>
            <MapView.Marker
              {...marker}
              onDrag={this.updateCircle}
              title="Marker #XX"
              description="Tap to Change Info"
              onCalloutPress={this.handleDialogueBox}
            >
            </MapView.Marker>
            <MapView.Circle
              center={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
              }}
              radius={500}
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
