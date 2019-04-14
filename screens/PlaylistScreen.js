import React, { Component } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // getPlaylist = () =>{
    //   fetch('http://10.26.220.212:8080/SpotifyAPI_FinalProject/SendDataServlet',{
    //     method: "GET",
    //     headers: {
    //       "Accept": "application/json"
    //     }
    //   })
    //   .then(response => {
    //     response.json().then(json => {
    //       console.log(json);
    //     });
    //   })
    //   .catch(error=>{
    //     console.log(error)
    //   });
    
    // }
    // this.getPlaylist;
    getPlaylist = async() =>{
      var value = await AsyncStorage.getItem('playlist');
      console.log("in playlist: ");
      // var json = JSON.parse(value);
      console.log(value);
    }
    this.getPlaylist;
  }
  
  componentDidMount() {
    getPlaylist = async() =>{
      console.log("in playlist: ");
      var value = await AsyncStorage.getItem('playlist');
      // var json = JSON.parse(value);
      console.log(value);
    }
    this.getPlaylist;
  }
    render(){
        return(
          <View style={{flex: 2, backgroundColor: '#FDFAF3'}}>
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                  
                  <Text style={{marginTop: 40, fontSize: 35, color: global.logoColor}}>My Playlists</Text>
                </View>
                <View style={{flex: 1, flexDirection:'column', alignItems: 'stretch', marginTop: 10}}>
                    <PlaylistData emotion='Happy'/>
                    <PlaylistData emotion='Sad'/>
                    <PlaylistData emotion='Excited'/>
                </View>
            </ScrollView>
          </View>
        );
    }
  }
class Song extends Component{
    render(){
        return (
            <View style={{alignItems: 'center', margin:10}}>
              <Text style={{fontSize: 20}}>{this.props.song} by {this.props.artist}</Text>
            </View>
        );
    }
}
class SongData extends Component{
    render(){
        return(
            <View style={{alignItems:'center'}}>
                <Song song='Hello' artist='Adele'/>
                <Song song='Hello' artist='Adele'/>
                <Song song='Hello' artist='Adele'/>
            </View>
        );
    }
}
class PlaylistData extends Component{

  render(){
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Adele_2016.jpg'
    };
    //onPress = () => {
      //navigate to correct playlist page
    //}
    return(
        <View style={styles.box}>
            <TouchableOpacity onPress={this._onPressButton}>
              <Image source={pic} style={{height:200, width:200}}/>
            </TouchableOpacity>
            <Text style={styles.title}>{this.props.emotion}</Text>
            <SongData/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 25, 
    flex:1,
    alignItems:'center', 
    justifyContent:'center',
    marginTop:5
  },
  box:{
    flex: 1, 
    flexDirection:'column', 
    marginTop:20,
    alignItems: 'center', 
    padding: 20, 
    borderRadius: 20, 
    backgroundColor:'#FFE2DC',
  }

});
