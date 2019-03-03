import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import SearchBar from "react-native-searchbar";
import RNGooglePlaces from "react-native-google-places";
import ReactNativeTooltipMenu from "react-native-tooltip-menu";

export default class DialogTester extends Component {
  state = {
    counterItem1: 0,
    counterItem2: 0
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          padding: 25
        }}
      >
        <View>
          <Text style={{ textAlign: "center" }}>
            This is example of react-native-tooltip-menu
          </Text>
          <Text style={{ textAlign: "center" }}>
            Clicked item1: {this.state.counterItem1}
          </Text>
          <Text style={{ textAlign: "center" }}>
            Clicked item2: {this.state.counterItem2}
          </Text>
        </View>
        <ReactNativeTooltipMenu
          buttonComponent={
            <View
              style={{
                backgroundColor: "purple",
                padding: 10,
                borderRadius: 25
              }}
            >
              <Text style={{ color: "white", flex: 1 }}>
                Click me to show tooltip!
              </Text>
            </View>
          }
          items={[
            {
              label: "Label #1",
              onPress: () =>
                this.setState({ counterItem1: this.state.counterItem1 + 1 })
            },
            {
              label: "Label #2",
              onPress: () =>
                this.setState({ counterItem2: this.state.counterItem2 + 1 })
            }
          ]}
        />
      </View>
    );
  }
}
