import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, Button,TouchableOpacity } from 'react-native';
import '../global';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username:"",
        password:""
    };
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
            <View style={{marginBottom:150}}>
                <View style={styles.inputSect}>
                    <Icon name = "ios-person" style={styles.icon}></Icon>
                    <TextInput
                        style = {styles.input}
                        placeholder="Username"
                        placeholderTextColor = {global.placeholder}
                        onChangeText={(text) => this.setState({username:text})}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputSect}>
                    <Icon name = "ios-lock" style={styles.icon}></Icon>
                    <TextInput
                        style = {styles.input}
                        placeholder="Password"
                        placeholderTextColor = {global.placeholder}
                        onChangeText={(text) => this.setState({password:text})}
                        value={this.state.password}
                    />
                </View>
            </View>
            <View>
                <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate('Signup')}}
                    style={styles.loginBut}
                >
                    <Text> Login Now </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate('Signup')}}
                    style={styles.loginBut}
                >
                    <Text> Login Now </Text>
                </TouchableOpacity>
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
        marginBottom:20
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
    },
    input:{
        flex:1,
        marginTop: 30,
        padding:20,
        height: 40,
        borderColor: 'black',
        borderWidth: 0.6,
        borderRadius: 20,
        backgroundColor:"#fff",
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
        width:150,
        padding:15,
        marginBottom:30,
        borderRadius:10
    }
  });
  
