import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { createStackNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation';

const accountNav = createStackNavigator({
  Login:{
    screen: LoginScreen
  },
  Signup:{
    screen: SignupScreen
  }
});

// const appBottomTab = createBottomTabNavigator({
  
// });

export default createAppContainer(accountNav);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
