import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Default Dev Load Screen',
    };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedTitle}>Welcome to our HackTech Location Based Alarm Application</Text>

            <Text style={styles.getStartedText}>
              A location-based alarm that triggers when a user enters a specified location. This idea was derived from taking the train and bus to CSUF where passengers are often seen sleeping or panic about missing their stop. Bicyclists can use it to pedal hard knowing their alarm will go off at the place theyre meeting their bicyclists friends. It can also serve as a reminder to drivers want to pick up something from a store.

              </Text>
          </View>

        <Text style={styles.getStartedTitle}>{"\n"}Developer Test Text</Text>

        <Text style={styles.getStartedText}>
            Note: Add app padding/Learn how to use Tab breaks in React
            {"\n"}
        </Text>

        <Text style={styles.getStartedStuff}>

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie erat at risus facilisis porttitor. Quisque et nibh arcu. Ut auctor finibus feugiat. Nam porttitor eu metus sit amet luctus. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse rutrum neque dui, id dictum nunc varius quis. Etiam turpis magna, laoreet gravida quam vitae, sodales volutpat metus.
        {"\n"}
        Ut ut enim ante. Praesent id justo augue. Quisque eget lorem suscipit, tincidunt augue eu, maximus augue. Vestibulum rhoncus eget erat vel tristique. Mauris cursus augue massa, blandit euismod nunc dignissim ut. Donec viverra eros id massa laoreet auctor nec id nunc. Integer dignissim malesuada diam, ac egestas nibh tempus vitae. Sed et accumsan ante, nec blandit ante. Sed eget laoreet elit, eget sagittis orci.
        {"\n"}
        Phasellus convallis tristique purus, id porttitor urna interdum quis. Curabitur elementum elementum diam et ullamcorper. Curabitur ornare justo eget semper congue. Nulla tincidunt scelerisque dolor, nec porta leo fermentum a. In at dui nec tellus vulputate aliquam quis consectetur dolor. Fusce sed nibh at ante consectetur ornare in id justo. Fusce ut ullamcorper ex. Nunc ut sem rutrum, fringilla tellus at, blandit est. Nulla facilisi. Phasellus cursus sollicitudin neque, vitae varius massa lobortis ut. Morbi blandit sit amet lectus non fermentum. Vestibulum rutrum luctus consectetur. Ut congue, dolor ut tincidunt tincidunt, lorem erat condimentum est, euismod finibus lorem velit ac magna.
        {"\n"}
        Maecenas malesuada, arcu nec dictum scelerisque, justo leo malesuada ligula, eu suscipit massa lectus a ligula. Nam vel sapien egestas, accumsan nisl dignissim, interdum enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris id lectus id urna ullamcorper cursus id at erat. Nam est sapien, suscipit vel augue eu, pharetra tempor felis. Donec eget sem a nibh viverra iaculis. Proin vel augue commodo, porttitor massa sit amet, pretium ipsum. Ut id mi et dolor luctus faucibus. Donec porta, nisi sed scelerisque maximus, urna nunc elementum massa, vel bibendum felis nunc a lacus. Ut molestie porta diam eget volutpat.
        {"\n"}
        Vestibulum cursus ex eu ipsum laoreet sagittis. Integer eget feugiat sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas placerat turpis et urna maximus, quis porttitor enim pharetra. Integer mollis sapien sit amet velit bibendum, sed faucibus massa rutrum. Pellentesque malesuada dui id tortor pharetra, ut hendrerit massa auctor. Nam ultrices, est vel venenatis iaculis, lectus sapien volutpat dui, a condimentum est quam vel ante. Nam pretium aliquam nibh et interdum. Mauris neque ante, auctor vitae dictum nec, blandit eu orci. Quisque luctus turpis et risus tincidunt eleifend. Nam non nibh id ipsum aliquet finibus in sit amet sem. Etiam varius quis ipsum a aliquam. Nam ac nisi venenatis, imperdiet neque vel, dapibus nisi. Donec aliquet, felis quis dapibus dapibus, dui erat vulputate augue, ac convallis libero purus vitae nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla faucibus, sem nec eleifend viverra, tellus velit dignissim ipsum, at ultricies risus tellus nec ex.
        </Text>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedTitle: {
      fontSize: 20,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  getStartedStuff: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
