import React from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  ViewList
} from 'react-native';
import styles from './style/Home';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };

    render() {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <ScrollView>
            <Image
              source={require('../assets/images/bus.png')}
              style={styles.image}
            />
            </ScrollView>
            <View style={styles.getStartedContainer}>

              <Text style={styles.getStartedTitle}>
                {'\n'}
                Welcome to wonderful app of "Are we there yet?" 
                {'\n'}
              </Text>

              <Text style={styles.getStartedText}>
              {'\n'}
              This is a location-based alarm app that triggers when a user enters a specified location.
              This idea was derived from taking the train and bus to CSUF where passengers
              are often seen sleeping or panic about missing their stop.
              Bicyclists can use it to pedal hard knowing their alarm will go off at the
               place theyre meeting their bicyclists friends.
              It can also serve as a reminder to drivers want to pick up something from a store.

              </Text>
            </View>
          </ScrollView>
        </View>
      );
    }
}
