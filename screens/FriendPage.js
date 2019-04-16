import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

class User extends React.Component {

  constructor() {
    super();

    this.state = {
      buttonClicked: false
    }
  }

  addFriend() {
    console.log("Friend Button Pressed by: " + this.props.username + " on " + this.props.name + "!");

    this.setState({
      buttonClicked: true
    });
  }

  removeFriend() {
    console.log("Remove Friend Button Pressed by: " + this.props.username + " on " + this.props.name + "!");

    this.setState({
      buttonClicked: false
    });

    fetch("http://192.168.1.245/AudioFace-Backend/AddFriendServlet", {
      method: 'POST',
      body: "friend1Userid=" + this.props.username + "&friend2Userid=" + this.props.name
    })
  }

  render() {

    if(this.state.buttonClicked) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, width: '100%' }}>
          <Text style={{ fontSize: 18 }}>{this.props.name}</Text>
          <Button title="Remove Friend" onPress={() => this.removeFriend()} color='red'></Button>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, width: '100%' }}>
          <Text style={{ fontSize: 18 }}>{this.props.name}</Text>
          <Button title="Friend" onPress={() => this.addFriend()} color='green'></Button>
        </View>
      );
    }
  }
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: "14%", alignItems: "center" }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:'50%', paddingLeft:'2%', fontSize: 18 }}
          placeholder='Find Friends...'
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />

        <ScrollView style={{ marginTop:'5%', width:'100%', fontSize: 18 }}>
          <User username='Emaad' name='Basil' />
          <User username='Emaad' name='Vivian' />
          <User username='Emaad' name='Brandon' />
          <User username='Emaad' name='Stacy' />
          <User username='Emaad' name='John' />
          <User username='Emaad' name='Alex' />
          <User username='Emaad' name='Joey' />
          <User username='Emaad' name='Connor' />
          <User username='Emaad' name='Stacy' />
          <User username='Emaad' name='John' />
          <User username='Emaad' name='Alex' />
          <User username='Emaad' name='Joey' />
          <User username='Emaad' name='Connor' />
          <User username='Emaad' name='Stacy' />
          <User username='Emaad' name='John' />
          <User username='Emaad' name='Alex' />
          <User username='Emaad' name='Joey' />
          <User username='Emaad' name='Connor' />
          <User username='Emaad' name='Stacy' />
          <User username='Emaad' name='John' />
          <User username='Emaad' name='Alex' />
          <User username='Emaad' name='Joey' />
          <User username='Emaad' name='Connor' />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
