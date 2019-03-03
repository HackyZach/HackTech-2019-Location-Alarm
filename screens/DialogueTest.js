import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Dialog from "react-native-dialog";

export default class DialogTester extends Component {
  state = {
    visibleBox: true,
    dialogOne: true,
    dialogTwo: false
  };

  showDialog = () => {
    this.setState({ dialogOne: true, dialogTwo: false, visibleBox: true });
  };

  showDialogTwo = () => {
    this.setState({ dialogTwo: true, dialogOne: false, visibleBox: true });
  };

  //TODO
  handleCancel = () => {
    this.setState({ visibleBox: false });
  };

  //TODO
  handleDelete = () => {
    this.setState({ visibleBox: false });
  };

  render() {
    const { dialogOne: dialogBox } = this.state;
    const { dialogTwo: dialogBoxTwo } = this.state;
    const { visibleBox: visible } = this.state;
    console.log(dialogBox);
    console.log(this.state.dialogOne);

    console.log(dialogBox, visible);
    return (
      <View>
        <TouchableOpacity onPress={this.showDialog}>
          <Text>Show Dialog One</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showDialogTwo}>
          <Text>Show Dialog Two</Text>
        </TouchableOpacity>

        <Dialog.Container visible={dialogBox && visible}>
          <Dialog.Title>[Dev] Messagebox Title</Dialog.Title>
          <Dialog.Description>Messagebox Description</Dialog.Description>
          <View>
            <Dialog.Input label="Input Label" />
            <Text> Inline text in messagebox </Text>
            <Dialog.Input label="Input Label Two" />
          </View>
          <Dialog.Button label="No" onPress={this.handleCancel} />
          <Dialog.Button label="Yes" onPress={this.handleDelete} />
        </Dialog.Container>

        <Dialog.Container visible={dialogBoxTwo && visible}>
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
const styles = StyleSheet.create({});
