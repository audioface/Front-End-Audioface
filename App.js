//node modules
import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import { createSwitchNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

//import screeens
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CameraScreeen from './screens/CameraScreen';
import ProfileScreen from './screens/ProfileScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import apiKeys from './apiKeys';
import * as firebase from 'firebase';


const mainPage = createBottomTabNavigator({
  Camera:{
    screen: CameraScreeen,
    navigationOptions:{
      tabBarLabel:  <View/>,
      tabBarIcon: ({tintColor}) =>(
        <FontAwesomeIcon name="camera-retro" color={tintColor} size={30} style={{paddingTop:10}}/>
      ),
      swipeEnabled: true
    }
  },
  Profile:{
    screen:ProfileScreen,
    navigationOptions:{
      tabBarLabel:  <View/>,
      tabBarIcon: ({tintColor}) =>(
        <FontAwesomeIcon name="user-circle" color={tintColor} size={30} style={{paddingTop:10}}/>
      ),
      swipeEnabled: true
    }
  },
  Playlist:{
    screen:PlaylistScreen,
    navigationOptions:{
      tabBarLabel:  <View/>,
      tabBarIcon: ({tintColor}) =>(
        <FontAwesomeIcon name="headphones" color={tintColor} size={33} style={{paddingTop:10}}/>
      ),
      swipeEnabled: true
    }
  }
},{
  tabBarOptions: {
    activeTintColor: global.themeColor,
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: global.background,
      borderTopWidth: 0,
      shadowOffset: { width: 5, height: 3 },
      shadowColor: 'black',
      shadowOpacity: 0.5,
      elevation: 5
    }
  }
});

const accountNav = createSwitchNavigator({
  Home:{
    screen: mainPage
  },
  Login:{
    screen: LoginScreen
  },
  Signup:{
    screen: SignupScreen
  },
  // Home:{
  //   screen: mainPage
  // }
});
export default class AudioFace extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    //initialize firebase
    if(!firebase.apps.length){
      firebase.initializeApp(apiKeys.firebaseConfig);
    }
  }
  render() {
    return (<MainContainer />);
  }
};
const MainContainer = createAppContainer(accountNav);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
