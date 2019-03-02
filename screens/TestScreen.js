import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

export default class DialogTester extends Component {
  state = {
    dialogVisible: false
  };

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  render() {
    const { dialogVisible } = this.state;
    return (
      <View>
        <TouchableOpacity onPress={this.showDialog}>
          <Text>Show Dialog</Text>
        </TouchableOpacity>
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Go commit heart stop?</Dialog.Title>
          <Dialog.Description>
            You will die immediately by this action.
          </Dialog.Description>
          <Dialog.Button label="Yesn't" onPress={this.handleCancel} />
          <Dialog.Button label="Yes" onPress={this.handleDelete} />
        </Dialog.Container>
      </View>
    );
  }
}
