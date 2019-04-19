import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';

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
    
    fetch(`http://172.20.10.2:8080/AudioFace-Backend/AddFriendServlet?friend1Userid=${ this.props.username }&friend2Userid=${ this.props.name }`, {
      method: 'POST'
    });
  }

  removeFriend() {
    console.log("Remove Friend Button Pressed by: " + this.props.username + " on " + this.props.name + "!");

    this.setState({
      buttonClicked: false
    });

    fetch(`http://172.20.10.2:8080/AudioFace-Backend/RemoveFriendServlet?friend1Userid=${ this.props.username }&friend2Userid=${ this.props.name }`, {
      method: 'POST'
    });
  }

  render() {

    if(this.state.buttonClicked) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, width: '100%' }}>
          <Text style={{ fontSize: 18, color:global.themeColor }}>{this.props.name}</Text>
          <Button title="Remove" onPress={() => this.removeFriend()} color='red'></Button>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, width: '100%' }}>
          <Text style={{ fontSize: 18, color:global.themeColor }}>{this.props.name}</Text>
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
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, marginTop: "14%", alignItems: "center",width:450 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:320, paddingLeft:'2%', fontSize: 18 }}
            placeholder='Find Friends...'
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />

          <ScrollView style={{ marginTop:'5%', width:'100%', fontSize: 18 }}>
            <User username='sapalo@usc.edu' name='bchatha@usc.edu' />
            <User username='sapalo@usc.edu' name='tongyu@usc.edu' />
            <User username='sapalo@usc.edu' name='stacypha@usc.edu' />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: global.background,
  },
});
