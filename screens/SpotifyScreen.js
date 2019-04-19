import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import axios from 'axios';
import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';
// import { spotifyCredentials } from 'secrets';


export default class SpotifyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessTokenAvailable:false,
            expirationTime:null
        };
       
    }
    
      getUserData = async(name) =>{
        value = await AsyncStorage.getItem('name');
        return value;
      }
    getTokens = async () => {
        var spotifyCredentials = {
            clientId: 'eede42efdf8b4ff4b6117fdb8e888ec9',
            clientSecret: 'c05f2627222e472f8c09e5abb58f0c47',
            redirectUri: AuthSession.getRedirectUrl()
        }
        var scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                            'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                            'playlist-modify-private','user-read-recently-played','user-top-read','ugc-image-upload','user-read-private',
                            'user-read-email', 'user-follow-read', 'user-follow-modify'];
        var scopes = scopesArr.join(' ');
        // conosle.log(AuthSession.getRedirectUrl());
        getAuthorizationCode = async () => {
            let result = null;
            try {
                const credentials = spotifyCredentials; //we wrote this function above
                const redirectUrl = AuthSession.getRedirectUrl(); 
                console.log(redirectUrl)//this will be something like https://auth.expo.io/@your-username/your-app-slug
                result = await AuthSession.startAsync({
                    authUrl:
                    'https://accounts.spotify.com/authorize' +
                    '?response_type=code' +
                    '&client_id=' +
                    credentials.clientId +
                    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                    '&redirect_uri=' +
                    encodeURIComponent(redirectUrl),
                })
            } catch (err) {
                console.error(err)
            }
            // console.log(result.params.code)
            return result.params.code
        }
        try {
            const authorizationCode = await getAuthorizationCode() //we wrote this function above
            const credentials = spotifyCredentials; //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
            const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
            const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
                credentials.redirectUri
            }`,
            });
            const responseJson = await response.json();
            // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
            const {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
            } = responseJson;
            const expirationTime = new Date().getTime() + expiresIn * 1000;
            console.log('accessToken' + accessToken);
            console.log('refreshToken' + refreshToken);
            console.log('expirationTime', expirationTime);
            try {
             await AsyncStorage.setItem('accessToken', accessToken);
             await AsyncStorage.setItem('refreshToken', refreshToken);
             this.setState({expirationTime:expirationTime})
            } catch (error) {
            // Error saving data
            }
            this.props.navigation.navigate('Home')
        } catch (err) {
            console.error(err);
        }
        }
    refreshTokens = async () => {
        try {
            const credentials = spotifyCredentials; //we wrote this function above
            const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
            const refreshToken = await getUserData('refreshToken');
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            });
            const responseJson = await response.json();
            if (responseJson.error) {
                await getTokens();
            } else {
                const {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_in: expiresIn,
                } = responseJson;
        
                const expirationTime = new Date().getTime() + expiresIn * 1000;
                await AsyncStorage.setItem('accessToken', newAccessToken);
                if (newRefreshToken) {
                    await AsyncStorage.setItem('refreshToken', newRefreshToken);
                }
                this.setState({expirationTime:expirationTime})
            } 
        }catch (err) {
            console.error(err)
            }
        
    }

    async componentDidMount() {
        // const tokenExpirationTime = this.state.expirationTime;
        // if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
        // await refreshTokens();
        // } else {
        // this.setState({ accessTokenAvailable: true });
        // }
    }
  


  render() {
    return (
      <View style={styles.container}>
        <Text> Get Spotify Authorization To Continue </Text>
        <Button
            onPress={this.getTokens}
            title="Get It"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })
  