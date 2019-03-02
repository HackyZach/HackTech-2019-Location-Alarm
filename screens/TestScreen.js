import React, { Component } from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
import Dialog from 'react-native-dialog';

export default class DialogTester extends Component {
  state = {
    dialogOne: true,
  };

  showDialog = () => {
    this.setState({ dialogOne: true });
  };

  handleCancel = () => {
    this.setState({ dialogOne: false });
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogOne: false });
  };

  render() {
    const { dialogOne } = this.state;
    return (
      <View>
        <TouchableOpacity onPress={this.showDialog}>
          <Text>Show Dialog</Text>
        </TouchableOpacity>
        <Dialog.Container visible={dialogOne}>
          <Dialog.Title>Go commit heart stop?</Dialog.Title>
          <Dialog.Description>
            You will die immediately by this action.
          </Dialog.Description>
          <View>
            <Dialog.Input label="Is the color any different" />
            <Text> OK </Text>
            <Dialog.Input label="The answer is no haha" />
          </View>
          <Dialog.Button label="Yesn't" onPress={this.handleCancel} />
          <Dialog.Button label="Yes" onPress={this.handleDelete} />
        </Dialog.Container>
      </View>
    );
  }
}

// TODO Fill out
const styles = StyleSheet.create({
});
