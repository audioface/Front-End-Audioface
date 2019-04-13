//node modules
import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import { createSwitchNavigator,createBottomTabNavigator, 
  createAppContainer, createStackNavigator} from 'react-navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

//import screeens
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CameraScreeen from './screens/CameraScreen';
import ProfileScreen from './screens/ProfileScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import LoadingScreen from './screens/LoadingScreen';
import SongScreen from './screens/SongScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SavedProfileScreen from './screens/SavedProfileScreen';
import SpotifyScreen from './screens/SpotifyScreen';
import apiKeys from './apiKeys';
import * as firebase from 'firebase';

const playlistNav = createStackNavigator({
  allPlaylist:{
    screen:PlaylistScreen
  },
  Song:{
    screen:SongScreen
  }
});

const profileNav = createSwitchNavigator({
  editProfile:{
    screen:EditProfileScreen
  },
  savedProfile:{
    screen:SavedProfileScreen
  }
});

const mainPage = createBottomTabNavigator({
  Profile:{
    screen:profileNav,
    navigationOptions:{
      tabBarLabel:  'Profile',
      tabBarIcon: ({tintColor}) =>(
        <FontAwesomeIcon name="user-circle" color={tintColor} size={30} style={{padding:10,}}/>
      ),
      swipeEnabled: true
    }
  },
  Camera:{
    screen: CameraScreeen,
    navigationOptions:{
      tabBarLabel: 'Camera',
      tabBarIcon: ({tintColor}) =>(
        <FontAwesomeIcon name="camera-retro" color={tintColor} size={30} style={{padding:10}}/>
      ),
      swipeEnabled: true
    }
  },
  Playlists:{
    screen: playlistNav,
    navigationOptions:{
      tabBarLabel:  'Playlist',
      tabBarIcon: ({tintColor}) =>(
        <FontAwesomeIcon name="headphones" color={tintColor} size={33} style={{padding:10,}}/>
      ),
      swipeEnabled: true
    }
  }
},{
  initialRouteName:'Camera',
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
  },
});

const accountNav = createSwitchNavigator({
  Spotify:{
    screen: SpotifyScreen
  },
  Home:{
    screen: mainPage
  },
  Login:{
    screen: LoginScreen
  },
  Signup:{
    screen: SignupScreen
  },
  Loading:{
    screen: LoadingScreen
  }
},{
  initialRouteName:'Loading'
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
