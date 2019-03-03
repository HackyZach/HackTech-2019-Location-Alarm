import React from "react";
import { MapView } from "expo";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";
import { SearchBar } from "react-native-elements";
import TimerMixin from "react-timer-mixin";
import haversine from "haversine";
import Dialog from "react-native-dialog";

export default class App extends React.Component {
  static navigationOptions = {
    title: "Dev-MapTest"
  };

  state = {
    searchNew: "",
    markers: [],
    count: 1,
    lat: 0,
    long: 0,
    p_lat: -1,
    close: false,
    map: -1,
    dist: -1
  };

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  updateSearch = search => {
    this.setState({ searchNew: search });
  };

  handleLocation = e => {
    if (this.state.lat === e.nativeEvent.coordinate.latitude) {
      return;
    }
    // User coordinates
    // console.log(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
    this.setState({
      lat: e.nativeEvent.coordinate.latitude,
      long: e.nativeEvent.coordinate.longitude,
      p_lat: this.state.lat
    });
  };

  handlePress(e) {
    this.setState({ count: this.state.count + 1 });
    this.setState({
      markers: [
        ...this.state.markers,
        {
          key: this.state.count,
          coordinate: e.nativeEvent.coordinate
        }
      ]
    });
  }

  isClose(e, mark) {
    if (e <= 250) {
      console.log(`YAY! CLOSE TO MAP MARKER ${mark.key}`);
      this.setState({ close: true });
      this.setState({ map: mark.key });
      return true;
    }
    return false;
  }

  markerName(e) {
    return `Map Marker #${e.key}`;
  }

  handleDialogueBox(e) {
    // Not working
    // console.log(e);
  }

  calculateDist(e) {
    if (this.state.lat === this.state.p_lat) {
      return;
    }
    const start = {
      latitude: this.state.lat,
      longitude: this.state.long
    };
    this.setState({
      p_lat: this.state.lat
    });
    const end = {
      latitude: e.coordinate.latitude,
      longitude: e.coordinate.longitude
    };
    // console.log(haversine(start, end));
    const value = haversine(start, end, { unit: "meter" });
    console.log(
      `Lat: ${this.state.lat} Long: ${this.state.long} Dist: ${value}`
    );
    this.setState({ dist: value });
    return value;
  }

  close = () => {
    this.setState({ close: false });
  };

  render() {
    const { searchNew: search } = this.state;
    // User Coords
    const { lat: lati } = this.state;
    const { long: longi } = this.state;
    // console.log(lati, longi)
    const { i: v } = this.state;
    const { map: marker } = this.state;
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
          longitudeDelta: 0.0421
        }}
      >
        <MapView.Callout>
          <View>
            <Text style={styles.calloutView}> Yay! Im a callout! </Text>

            <Dialog.Container visible={this.state.close}>
              <Dialog.Title>Hey! Listen!</Dialog.Title>
              <Dialog.Description>
                You are really close to your destination!
              </Dialog.Description>
              <Dialog.Button label="Nice!" onPress={this.close} />
            </Dialog.Container>
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
              distance={this.calculateDist(marker)}
              close={this.isClose(this.calculateDist(marker), marker)}
              onCalloutPress={this.handleDialogueBox(marker)}
            />
            <MapView.Circle
              center={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude
              }}
              radius={250}
            />
          </View>
        ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: 20
  }
});
