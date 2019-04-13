import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import * as firebase from 'firebase';
import {AsyncStorage} from 'react-native';
import { Permissions, Notifications } from 'expo';

const PUSH_ENDPOINT = 'https://10.26.14.188:8080/NotificationHandler';

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    async function registerForPushNotificationsAsync() {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
    
      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
    
      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
        return;
      }
    
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
    
      // POST the token to your backend server from where you can retrieve it to send push notifications.
      return fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: {
            value: token,
          },
          user: {
            username: 'Brent',
          },
        }),
      });
    }
    // registerForPushNotificationsAsync()
    // .then(()=>{
    //   console.log("get logging in");
    // });
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
