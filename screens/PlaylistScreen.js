import React, { Component } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity,
         AsyncStorage} from 'react-native';
export default class PlaylistScreen extends Component {
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

  getGuest = async() => {
    var isGuest = await AsyncStorage.getItem('guest');
    return isGuest;
  }

  render(){

    var isGuest = this.getGuest;
    /* 2. Get the param, provide a fallback value if not available */
    console.log("playlist: ");
    console.log(isGuest)
    const { navigation, screenProps} = this.props;
    // console.log(screenProps)
    const playList = screenProps['playlist'] || 'NO-ID';
    const cameraUri = screenProps['cameraUri'] || 'NO-IMAGE';
    console.log("playlist image: " + cameraUri);
    // console.log(playList + " in playlist");
    if(isGuest == "true"){
      const [title, song1, song2, song3] = playList.split("~~");
        return(
          <View style={{flex: 2, backgroundColor: '#FDFAF3'}}>
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                  <Text style={{marginTop: 40, fontSize: 35, color: global.logoColor}}>My Playlists</Text>
                </View>
                <View style={{flex: 1, flexDirection:'column', alignItems: 'stretch', marginTop: 10}}>
                    <PlaylistData navigation = {this.props.navigation}
                        screenProps={this.props.navigation.state.params} 
                        emotion= {title} song1 = {song1} song2 = {song2} song3 ={song3}
                        cameraUri = {cameraUri} isGuest={isGuest}
                        />
                </View>
            </ScrollView>
          </View>
        );
    }
    else{
      const [title, song1, song2, song3, song4, song5, 
        song6, song7, song8, song9, song10, song11, song12] = playList.split("~~");
        return(
          <View style={{flex: 2, backgroundColor: '#FDFAF3'}}>
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                  <Text style={{marginTop: 40, fontSize: 35, color: global.logoColor}}>My Playlists</Text>
                </View>
                <View style={{flex: 1, flexDirection:'column', alignItems: 'stretch', marginTop: 10}}>
                    <PlaylistData navigation = {this.props.navigation}
                        screenProps={this.props.navigation.state.params} 
                        emotion= {title} song1 = {song1} song2 = {song2} song3 ={song3}
                        song4 = {song4} song5 = {song5} song6 = {song6} song7 = {song7} 
                        song8 = {song8} song9 = {song9} song10 = {song10} song11 = {song11}
                        song12 = {song12}
                        cameraUri = {cameraUri} isGuest={isGuest}
                        />
                </View>
            </ScrollView>
          </View>
        );
    }

  }
}

class Song extends Component{
    render(){
        return (
            <View style={{alignItems: 'center', margin:10}}>
              <Text style={{fontSize: 20}}>{this.props.song}</Text>
            </View>
        );
    }
}
class SongData extends Component{
    render(){
      if(this.props.isGuest == "false"){
        return(
          <View style={{alignItems:'center'}}>
              <Song song= {this.props.data} />
              <Song song= {this.props.data2} />
              <Song song= {this.props.data3} />
          </View>
        );
      }
      else{
        return(
          <View style={{alignItems:'center'}}>
            <Song song= {this.props.data} />
            <Song song= {this.props.data2} />
            <Song song= {this.props.data3} />
            <Song song= {this.props.data4} />
            <Song song= {this.props.data5} />
            <Song song= {this.props.data6} />
            <Song song= {this.props.data7} />
            <Song song= {this.props.data8} />
            <Song song= {this.props.data9} />
            <Song song= {this.props.data10} />
            <Song song= {this.props.data11} />
            <Song song= {this.props.data12} />
        </View>
        );
      }
    }
}
class PlaylistData extends Component{
  constructor(props) {
    super(props);
    // console.log("constructor")
    // console.log(props) 
    this.state ={
      image:null
    }
  }

  getImage = async() =>{
    let value = await AsyncStorage.getItem('cameraUri');
    console.log("in playlist to get image: "+ value)
    this.setState({image:value});
  }

  componentDidMount(){
    this.getImage;

  }

  render(){

    const cameraUri = this.props.cameraUri;
    // console.log("SongDATA image: " + cameraUri);
    if(this.props.isGuest == "true"){
      return(
        <View style={styles.box}>
          <TouchableOpacity onPress={()=>{}}>
            <Image source={{uri:cameraUri}} style={{height:200, width:200}}/>
            {/* <Image source={require('../myphoto0.jpg')} /> */}
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.emotion}</Text>
          <SongData 
          data = {this.props.song1} 
          data2 = {this.props.song2} 
          data3 = {this.props.song3}
          isGuest = {this.props.isGuest}
          />
      </View>

      );
    }
    else{
      return(
          
          <View style={styles.box}>
              <TouchableOpacity onPress={()=>{}}>
                <Image source={{uri:cameraUri}} style={{height:200, width:200}}/>
                {/* <Image source={require('../myphoto0.jpg')} /> */}
              </TouchableOpacity>
              <Text style={styles.title}>{this.props.emotion}</Text>
              <SongData 
              data = {this.props.song1} 
              data2 = {this.props.song2} 
              data3 = {this.props.song3}
              data4 = {this.props.song4}
              data5 = {this.props.song5}
              data6 = {this.props.song6}
              data7 = {this.props.song7}
              data8 = {this.props.song8}
              data9 = {this.props.song9}
              data10 = {this.props.song10}
              data11 = {this.props.song11}
              data12 = {this.props.song12}
              isGuest = {this.props.isGuest}
              />
          </View>

      );
    }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
  ,
  title:{
    fontSize: 25, 
    flex:1,
    alignItems:'center', 
    justifyContent:'center',
    marginTop:5,
    color:'#F78C74'
  },
  box:{
    flex: 1, 
    flexDirection:'column', 
    marginTop:20,
    alignItems: 'center', 
    padding: 25, 
    borderRadius: 20, 
    backgroundColor:'#FFE2DC',
  }

});