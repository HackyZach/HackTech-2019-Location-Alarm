import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
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
            <View style={styles.getStartedContainer}>
              <Image
                source={require('../assets/images/icon.png')}
                style={{ resizeMode: 'cover' }}
              />

              <Text style={styles.getStartedTitle}>
            Welcome to our HackTech Location Based Alarm Application
              </Text>

              <Text style={styles.getStartedText}>
              A location-based alarm that triggers when a user enters a specified location.
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
