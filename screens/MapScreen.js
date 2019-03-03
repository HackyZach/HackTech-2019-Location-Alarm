const haversine = require('haversine')
import Dialog from 'react-native-dialog';
import React from 'react';
import { MapView } from 'expo';
import { StyleSheet, Text, Alert, View} from 'react-native';
//import haversine from 'haversine';

let start = {
  latitude:   34.1377,
  longitude: -118.1253
};

let end = {
  latitude: 0,
  longitude: 0
};

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Are We There Yet?',
    title: 'Navigation'
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

    this.state = {
      markers: [],
      start_latitude: 34.1377,
      start_longitude: -118.1253,
      end_latitude: 0,
      end_longitude: 0
    };
    this.handlePress = this.handlePress.bind(this);
  }

// closeDiag= () => {
//   this.setState({ close: false });
//   };
// } 

markerName(e) {
  return `Map Marker #${e.key}`;
}

isClose(e, mark) {
  if (e <= 250) {
    console.log(`YAY! CLOSE TO MAP MARKER ${mark.key}`);
    this.setState({ close: true });
    return true;
  }
  return false;
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

handleLocation = (e) => {
  const userLat = e.nativeEvent.coordinate.latitude;
  const tempLat = this.tempValues.lat;
  if (tempLat === userLat) {
    return;
  }
  console.log('[Debug] Location Change Detected');
  // User coordinates
  this.tempValues.lat = userLat;
  this.tempValues.long = e.nativeEvent.coordinate.longitude;
  this.tempValues.p_lat = tempLat;
};

calculateDist(e) {
  const tempLat = this.tempValues.lat;
  const tempLong = this.tempValues.long;
  if (tempLat === this.tempValues.p_lat) {
    return;
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

  const value = haversine(start, end, { unit: 'meter' });
  console.log(`Lat: ${tempLat} Long: ${tempLong} Dist: ${value}`);
  return value;
}

render() {
  // Possible broken map markers - considering it a feature for now,
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{ flex: 1 }}
        provider="google"
        showsTraffic
        showsMyLocationButton
        showsUserLocation
        mapType="standard"
        onLongPress={this.handlePress}

        onUserLocationChange={(event) => { 
          let s_coordinate = event.nativeEvent.coordinate;
          let alarm_went_off = false;
          
          if (this.state.markers.length > 0 && !alarm_went_off ) {
            let i = 0;
            while(i < this.state.markers.length && !alarm_went_off) {
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

              if(meter <= 250) {
                alarm_went_off = true;
                Alert.alert("You have arrived at your destination!")
                
              }
              ++i;
            }
          }
          if(alarm_went_off) {
            entry = false;
          }
        }}
        mapType="standard"
        onLongPress={this.handlePress}
        
        initialRegion={{
          latitude: this.state.start_latitude,
          longitude: this.state.start_longitude, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

{/* <MapView.Callout>
        <View>
          <Text style={styles.calloutView}> Yay! Im a callout! </Text>

          <Dialog.Container visible={this.state.close}>
            <Dialog.Title>Hey! Listen!</Dialog.Title>
            <Dialog.Description>
              You are really close to your destination!
            </Dialog.Description>
            <Dialog.Button label="Nice!" onPress={this.closeDiag} />
          </Dialog.Container>
        </View>
      </MapView.Callout>

      {this.state.markers.map(marker => (
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
          </MapView.Circle> }*/
        //{
          this.state.markers.map(marker => (
          <MapView.Marker
            {...marker}
            title="Marker #XX"
            active="true"
            description="Tap to Change Info"
            onCalloutPress={this.handleDialogueBox}
          >
          </MapView.Marker>
        ))}
      </MapView>
    </View>
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