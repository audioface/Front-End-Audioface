import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import * as firebase from 'firebase';
import {AsyncStorage} from 'react-native';

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    //store userid in async storage
    _storeData = async (userid) => {
      try {
        await AsyncStorage.setItem('userid', userid);
      } catch (error) {
        // Error saving data
      }
    };

    firebase.auth().onAuthStateChanged(user => {
        if(user != null){
          var userId = user.uid;
          console.log("user id: " + userId);
          //store the user info into session and back to the servlet
          _storeData(userId);
        }
        this.props.navigation.navigate(user ? 'Home' : 'Login')
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:global.logoColor, fontSize:20, fontWeight:'bold'}}>Accessing Your Mood</Text>
        <ActivityIndicator size="large" color={global.themeColor} style={{paddingTop:20}} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
