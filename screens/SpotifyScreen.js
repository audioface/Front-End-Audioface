import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';
// import { spotifyCredentials } from 'secrets';


// export var spotifyCredentials = {
//     clientId: 'eede42efdf8b4ff4b6117fdb8e888ec9',
//     clientSecret: 'c05f2627222e472f8c09e5abb58f0c47',
//     redirectUri: 'http://audioface/hello'
// }

export default class SpotifyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
       
    }
    
    getTokens = async () => {
        var spotifyCredentials = {
            clientId: 'eede42efdf8b4ff4b6117fdb8e888ec9',
            clientSecret: 'c05f2627222e472f8c09e5abb58f0c47',
            redirectUri: 'localhost:19002/'
        }
        getAuthorizationCode = async () => {
            let result = null;
            try {
                const credentials = spotifyCredentials; //we wrote this function above
                const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
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
            console.log(result.params.code)
            return result.params.code
        }
        var scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                            'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                            'playlist-modify-private','user-read-recently-played','user-top-read'];
        var scopes = scopesArr.join(' ');
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
            await setUserData('accessToken', accessToken);
            await setUserData('refreshToken', refreshToken);
            await setUserData('expirationTime', expirationTime);
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
                await setUserData('accessToken', newAccessToken);
                if (newRefreshToken) {
                await setUserData('refreshToken', newRefreshToken);
                }
                await setUserData('expirationTime', expirationTime);
            } 
        }catch (err) {
            console.error(err)
            }
        
    }

    async componentDidMount() {
        const tokenExpirationTime = await getUserData('expirationTime');
        if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
        await refreshTokens();
        } else {
        this.setState({ accessTokenAvailable: true });
        }
    }
  


  render() {
    return (
      <View style={styles.container}>
        <Text> SpotifyScreen </Text>
        <Button
            onPress={this.getTokens}
            title="Learn More"
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
  