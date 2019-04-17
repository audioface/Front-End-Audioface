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
        username:firebase.auth().currentUser.email,
        password:'',
        errorMessage: null,
        userid:firebase.auth().currentUser.uid,
        dob:'Date of Birth',
        description:'All About You',
        isGuest: firebase.auth().currentUser.isAnonymous
    };
    }
  logOut = () => {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
      })
  }
  
  render() {
    const username = this.state.username;
    const isGuest = this.state.isGuest;
        //if registered user
        if(isGuest == false){

            return (
    
            <SafeAreaView style={styles.container}>
                <View style={{marginTop:global.headerHeight}}>
                    <Image source = {require('../image/logo.png')} style={styles.logoImg}></Image>
                    <Text style={styles.logo} > AudioFace </Text>
                </View>
                <View>
                    <Text style={styles.line} > {'WELCOME, '+ username.toUpperCase()} </Text>
                </View>
                <View style={{marginBottom:20}}>
                    <View style={styles.inputSectRegis}>
                        <Kohana
                            style={styles.input}
                            label={username}
                            iconClass={FontAwesomeIcon}
                            iconName={'user'}
                            iconColor={'#D25830'}
                            inputPadding={16}
                            labelStyle={{ backgroundColor: '#D25830' ,color: 'white'}}
                            inputStyle={{ backgroundColor: '#D25830' ,color: 'white' }}
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
                    <View style={styles.inputSectRegis}>
                        <Kohana
                            style={styles.input}
                            label={this.state.dob}
                            iconClass={FontAwesomeIcon}
                            iconName={'circle'}
                            iconColor={'#D25830'}
                            inputPadding={16}
                            labelStyle={{ backgroundColor: '#D25830' ,color: 'white' }}
                            inputStyle={{ backgroundColor: '#D25830' ,color: 'white' }}
                            labelContainerStyle={{ paddingBottom: 0 }}
                            iconContainerStyle={{ padding: 15 }}
                            useNativeDriver
                            onChangeText={(text) => this.setState({dob:text})}
                            value={this.state.dob}
                            // TextInput props
                            autoCapitalize={'none'}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputSectRegis}>
                        <Kohana
                            style={styles.input}
                            label={this.state.description}
                            iconClass={FontAwesomeIcon}
                            iconName={'bolt'}
                            iconColor={'#D25830'}
                            inputPadding={16}
                            labelStyle={{ backgroundColor: '#D25830' ,color: 'white' }}
                            inputStyle={{ backgroundColor: '#D25830' ,color: 'white' }}
                            labelContainerStyle={{ paddingBottom: 0 }}
                            iconContainerStyle={{ padding: 15 }}
                            useNativeDriver
                            onChangeText={(text) => this.setState({description:text})}
                            value={this.state.description}
                            // TextInput props
                            autoCapitalize={'none'}
                            autoCorrect={false}
                        />
                    </View>
                    <View>
                        <Text style={styles.err}>{this.state.errorMessage}</Text>
                    </View>
                </View>
                <View style={styles.buttonSect}>
                    <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('Friend')}}
                        style={styles.loginBut}
                    >
                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}> See Friends </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.logOut}
                        style={styles.loginBut}
                    >
                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}> Sign Out </Text>
                    </TouchableOpacity>
                    <View style={{paddingLeft:20}}>
                        <Text style={{letterSpacing:2, color:global.logoColor, fontSize:15}} > {'Listen to your mood'.toUpperCase()} </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
      }
      else{
        return (
    
            <SafeAreaView style={styles.container}>
                <View style={{marginTop:global.headerHeight}}>
                    <Image source = {require('../image/logo.png')} style={styles.logoImg}></Image>
                    <Text style={styles.logo} > AudioFace </Text>
                </View>
                <View>
                    <Text style={styles.line} > {'WELCOME, Guest'.toUpperCase()} </Text>
                </View>
                <View style={{marginBottom:50}}>
                    <View style={styles.inputSect}>
                        <View style={{paddingLeft:20}}>
                            <Text style={{letterSpacing:2, color:'#E74726', fontSize:20, fontWeight:"bold"}} > {'Sign up'.toUpperCase()} </Text>
                        </View>
                    </View>
                    <View style={styles.inputSect}>
                        <View style={{paddingLeft:20}}>
                            <Text style={{letterSpacing:2, color:global.logoColor, fontSize:15}} > {'to Get More features'.toUpperCase()} </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.err}>{this.state.errorMessage}</Text>
                    </View>
                </View>
                <View style={styles.buttonSect}>
                    <TouchableOpacity
                        onPress={this.logOut}
                        style={styles.loginBut}
                    >
                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}> Unlock All </Text>
                    </TouchableOpacity>
                    <View style={{paddingLeft:20}}>
                        <Text style={{letterSpacing:2, color:global.logoColor, fontSize:15}} > {'Listen to your mood'.toUpperCase()} </Text>
                    </View>
                </View>
            </SafeAreaView>
        );
      }
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
        marginBottom:15
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
        width:400,
        marginTop:30,
    },
    inputSectRegis: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:280,
        marginTop:30,
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
        marginBottom:20,
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
  
