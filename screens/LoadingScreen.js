import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import * as firebase from 'firebase';
import {AsyncStorage} from 'react-native';
import { Permissions, Notifications } from 'expo';


export default class LoadingScreen extends React.Component {
  componentDidMount() {
    //store userid in async storage
    _storeData = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        // Error saving data
      }
    };

    firebase.auth().onAuthStateChanged(user => {
        if(user != null){
          var userId = user.uid;
          var email = user.email;
          var isGuest = firebase.auth().currentUser.isAnonymous;
          console.log("user id: " + userId);
          console.log("user email: " + email);
          
          console.log("guest " + firebase.auth().currentUser.isAnonymous);
          //store the user info into session and back to the servlet
          _storeData('userid',userId);
          if(isGuest == false){
            _storeData('email',email);
            _storeData('guest','false');
          }
          else{
            _storeData('guest','true');
            _storeData('email','null');
          }
        }
        this.props.navigation.navigate(user ? 'Spotify' : 'Login')
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
