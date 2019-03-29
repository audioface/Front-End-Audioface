import React, {Component} from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useScreens } from 'react-native-screens';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
  }
});


export default class SavedProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // make api call
      name: '',
      pw: '',
      dob: '',
      des: '',
    }
  }

  render() {
    return (
        <View style = {styles.container}>
          <Text> Your Name </Text>
          <Text> Description </Text>
          <Text> Playlist count and friend count </Text>
          <Text> Your Name </Text>
          <Text> Password </Text>
          <Text> Birthdate </Text>
          <Text> Description </Text>
        </View>
    );
  }
}

