import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, Button,TouchableOpacity } from 'react-native';
import '../global';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Kohana } from 'react-native-textinput-effects';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username:'',
        password:'',
        errorMessage: null
    };
  }
  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(function(){
        this.props.navigation.navigate('Spotify')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  loginAccount = () =>{
    if(this.state.password.length < 6){
        this.setState({errorMessage:"Password has to be at least 6 chars"});
      }
      else{
          this.handleLogin();
      }
  }

  loginGuest = () =>{
    firebase.auth().signInAnonymously();
  }
  
  render() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop:global.headerHeight}}>
                <Image source = {require('../image/logo.png')} style={styles.logoImg}></Image>
                <Text style={styles.logo} > AudioFace </Text>
            </View>
            <View>
                <Text style={styles.line} > {'Welcome'.toUpperCase()} </Text>
            </View>
            <View style={{marginBottom:80}}>
                <View style={styles.inputSect}>
                     <Kohana
                        style={styles.input}
                        label={'Username'}
                        iconClass={FontAwesomeIcon}
                        iconName={'user'}
                        iconColor={global.themeColor}
                        inputPadding={16}
                        labelStyle={{ color: '#D25830' }}
                        inputStyle={{ color: '#D25830' }}
                        labelContainerStyle={{ padding: 0 }}
                        iconContainerStyle={{ padding: 15 }}
                        useNativeDriver
                        onChangeText={(text) => this.setState({username:text})}
                        value={this.state.username}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.inputSect}>
                    <Kohana
                        style={styles.input}
                        label={'Password'}
                        iconClass={FontAwesomeIcon}
                        iconName={'lock'}
                        iconColor={global.themeColor}
                        inputPadding={16}
                        labelStyle={{ color: '#D25830' }}
                        inputStyle={{ color: '#D25830' }}
                        labelContainerStyle={{ paddingBottom: 0 }}
                        iconContainerStyle={{ padding: 15 }}
                        useNativeDriver
                        onChangeText={(text) => this.setState({password:text})}
                        value={this.state.password}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>
                <View>
                    <Text style={styles.err}>{this.state.errorMessage}</Text>
                </View>
            </View>
            <View style={styles.buttonSect}>
                <TouchableOpacity
                    onPress={this.loginAccount}
                    style={styles.loginBut}
                >
                    <Text style={{color:'white', fontWeight:'bold', fontSize:20}}> Login Now </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate('Signup')}}
                    style={styles.regisBut}
                >
                    <Text style={{color:'black', fontWeight:'bold', fontSize:20}}> Create Account </Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity
                            onPress={this.loginGuest}
                            style={styles.line}
                        >
                            <Text style={{
                                color:global.placeholder, 
                                fontSize:20,
                                alignItems: 'center',
                                paddingLeft:18
                            }}> 
                                Continue As Guest 
                            </Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingLeft:20}}>
                    <Text style={{letterSpacing:2, color:global.logoColor, fontSize:15}} > {'Listen to your mood'.toUpperCase()} </Text>
                </View>
            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: global.background,
        alignItems: 'center'
    },
    logo:{
        fontSize: 30,
        color: global.logoColor,
        marginBottom: 25,
        letterSpacing:2.5,
    },
    line:{
        letterSpacing:4,
        marginBottom:30
    },
    logoImg:{
        width: 200,
        height: 50,
    },
    inputSect: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:280,
        marginTop:30,
        backgroundColor:'white'
    },
    icon:{
        fontSize:25,
        marginTop: 30,
        padding:10,
        color:global.themeColor
    },
    loginBut:{
        backgroundColor:global.themeColor,
        alignItems: 'center',
        width:200,
        padding:15,
        marginBottom:30,
        borderRadius:10
    },
    regisBut:{
        backgroundColor: '#fff',
        alignItems: 'center',
        width:200,
        padding:15,
        marginBottom:25,
        borderRadius:10,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'grey',
        shadowOpacity: 0.2,
        shadowRadius:2
    },
    buttonSect:{
        alignItems: 'center',
        justifyContent: 'center',
    }
  });
  
