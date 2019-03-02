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

  handleLocation(e) {
      //User coordinates
    //console.log(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
  }

  handleDialogueBox(e) {
      //Not working
      console.log(e);
  }

  render() {
    const { search } = this.state.searchNew;
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
          <MapView.Marker
            {...marker}
            title="Marker #XX"
            description="Tap to Change Info"
            onCalloutPress={this.handleDialogueBox}
          >
          </MapView.Marker>
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
