import React, { Component } from 'react';
import { FlatList, Button, StyleSheet, Text, View } from 'react-native';

export default class Songs extends Component {

  state = {

  }

  constructor(props) {
    super(props);
    // console.log("constructor")
    // console.log(props) 
  }
  
  componentDidMount() {
    this.getPlaylist;
  }

  getPlaylist = async() =>{
    console.log("in playlist: ");
    var value = await AsyncStorage.getItem('playlist');
    // var json = JSON.parse(value);
    console.log(value);
  }

  _handlePress() {
    console.log('Pressed!');
  }

  getGuest = async() => {
    var isGuest = await AsyncStorage.getItem('guest');
    return isGuest;
  }
  render() {
    console.log("playlist: ");
    const { navigation, screenProps} = this.props;
    // console.log(screenProps)
    const playList = screenProps['playlist'] || 'NO-ID';
    console.log(playList + " in playlist");
    var isGuest = thid.getGuest;
    if(isGuest == "false"){
      const [title, song1, song2, song3, song4, song5, 
      song6, song7, song8, song9, song10, song11, song12] = playList.split("~~");
      return (
        <View style={{marginTop: 20, backgroundColor: '#FDFAF3', flex: 1}}>
          <Button onPress={() => this._handlePress()} title = '<~ Back to Playlists'>
          </Button>
          <Text style={{fontSize:35, paddingBottom: 1, marginLeft: 10}}>{title}</Text>
          <FlatList style={{alignItems: 'center'}} 
            data={[
              {key: {song1}},
              {key: {song2}},
              {key: {song3}},
              {key: {song4}},
              {key: {song5}},
              {key: {song6}},
              {key: {song7}},
              {key: {song8}},
              {key: {song9}},
              {key: {song10}},
              {key: {song11}},
              {key: {song12}},
            ]}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({item}) => 
              <View>
                <Text style={{fontSize: 25, marginBottom: 15}}> {item.key} </Text>
              </View>
            }
          />
        </View>
      );
    }
    else{
      const [title, song1, song2, song3] = playList.split("~~");
      return (
        <View style={{marginTop: 20, backgroundColor: '#FDFAF3', flex: 1}}>
          <Button onPress={() => this._handlePress()} title = '<~ Back to Playlists'>
          </Button>
          <Text style={{fontSize:35, paddingBottom: 1, marginLeft: 10}}>{title}</Text>
          <FlatList style={{alignItems: 'center'}} 
            data={[
              {key: {song1}},
              {key: {song2}},
              {key: {song3}}
            ]}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({item}) => 
              <View>
                <Text style={{fontSize: 25, marginBottom: 15}}> {item.key} </Text>
              </View>
            }
          />
        </View>
      );
    }
  }
}