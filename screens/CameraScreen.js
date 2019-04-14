import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet,TouchableOpacity,
        Dimensions, Image, Alert, AsyncStorage } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import uuid from 'uuid';

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        flash: "off",
        zoom: 0,
        autoFocus: "on",
        type: "front",
        whiteBalance: "auto",
        ratio: "16:9",
        ratios: [],
        barcodeScanning: false,
        faceDetecting: false,
        faces: [],
        newPhotos: false,
        permissionsGranted: false,
        pictureSize: undefined,
        pictureSizes: [],
        pictureSizeId: 0,
        showGallery: false,
        showMoreOptions: false,
        mImage: null,
        cameraUri: "null",
        Debug: "debug",
        selectedIndex:1,
        positionArray:{},
        videoLink: null,
        canvasOpen: 1,
        count:0,
        image: null,
        uploading: false,
        userid:null,
        accessToken:null,
        refreshToken:null,
        email:null,
        response:null
    };
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  
  takePicture = async() => {
    if (this.camera) {
      var oldCounter = this.state.count;
      oldCounter += 1;
      this.setState({count: oldCounter})
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved, quality: 0.5 });
    }
  };
  sendPhoto = async() =>{
    //retrive data from the async storage
    var value = null;
    try {
      value = await AsyncStorage.getItem('userid');
      accessToken = await AsyncStorage.getItem('accessToken');
      refreshToken = await AsyncStorage.getItem('refreshToken');
      email = await AsyncStorage.getItem('email');
      if (value !== null && accessToken !== null && refreshToken != null) {
        // We have data!!
        this.setState({userid: value})
        this.setState({accessToken: accessToken})
        this.setState({refreshToken: refreshToken})
        this.setState({email: email})
        // console.log("hello: "+value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
    var form = new FormData();
    form.append('counter', this.state.count);
    form.append('userid', this.state.userid);
    form.append('accessToken', this.state.accessToken);
    form.append('refreshToken', this.state.refreshToken);
    form.append('email', this.state.email);
    form.append('photo', {
      uri: this.state.cameraUri,
      type:"image/jpeg"
    });
    var mString = "";
    store = async(mString) =>{
  
      try{
        console.log("storage called")
        await AsyncStorage.setItem('playlist', mString);
      }
      catch(error){
        console.log(error);
      }
    }
    fetch("http://10.26.220.212:8080/SpotifyAPI_FinalProject/HandleImage", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: form,
    })
    .then(function(response){ 
      console.log(response)
      // mString = JSON.stringify(response);
      // console.log("mstring: " + mString)
      store(mString)
    })
    .catch(error=>{
      console.log(error)
    });
  }


  
  onPictureSaved = async photo => {
      try {
        this.setState({ uploading: true });
        const manipResult = await ImageManipulator.manipulateAsync(photo.uri, 
          [{flip: {horizontal: true}}], 
          { format: 'jpeg' });
        this.setState({cameraUri: manipResult.uri});
        await this.sendPhoto();
        // uploadUrl = await this.uploadImageAsync(manipResult.uri);
        // this.setState({ CameraUrl: uploadUrl });
        alert('Uploading Photo and Analyzing');
        setTimeout(() => {
          this.props.navigation.navigate('Playlists');
        }, 10000);
        
      } catch (e) {
        console.log(e);
        alert('Upload failed, sorry :(');
      } finally {
        this.setState({ uploading: false });
      }
  }
  uploadImageAsync = async uri => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }
  
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
        return (
            <View style={{ flex: 1 }}>
                <View style={{flex:1, alignItems:'center'}}>
                  
                    <Camera style={{ flex: 1 , 
                        justifyContent: 'flex-end', 
                        width: Dimensions.get('window').width}} 
                    
                        type={this.state.type}  
                            ref={ref => {
                                this.camera = ref;
                        }}>
                    </Camera>
                  <View style={styles.center}>
                      <FontAwesomeIcon 
                            name="circle" 
                            style={styles.takeButton}
                            onPress={this.takePicture}>
                        </FontAwesomeIcon>
                        <Image style = {{position:"absolute",
                                height:100,
                                width:100,
                                left:0,
                                top:0}}
                                source={{uri: this.state.cameraUri}} >
                        </Image>
                        {/* <Text style={{color:'white'}}>{this.state.cameraUri}</Text> */}
                  </View>
              </View>
            </View>
          );
    }
  }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: global.background,
        alignItems: 'center',
        justifyContent:'center'
    },
    center:{
        justifyContent:'center',  
        alignItems: 'center', 
        marginTop:10,
        position: "absolute",
        bottom:20
    },
    takeButton:{
      position:"absolute", 
      height:200,
      width:110,
      color:global.logoColor, 
      marginBottom:200,
      marginLeft: 320,
      fontSize:100
    }
});
