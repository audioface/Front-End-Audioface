import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet,TouchableOpacity,
        Dimensions, Image, Alert } from 'react-native';
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
    };
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved, quality: 0.5 });
    }
  };

  onPictureSaved = async photo => {
      try {
        this.setState({ uploading: true });
        const manipResult = await ImageManipulator.manipulateAsync(photo.uri, 
          [{flip: {horizontal: true}}], 
          { format: 'jpeg' });
        
        uploadUrl = await this.uploadImageAsync(manipResult.uri);
        this.setState({ CameraUrl: uploadUrl });
        alert('Uploading Photo and Analyzing');
        
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
                            style={{position:"absolute", height:100,
                                    width:100,color:'black', marginBottom:20}}
                            size={30}
                            onPress={this.takePicture}>
                        </FontAwesomeIcon>
                        <Image style = {{position:"absolute",
                                height:100,
                                width:100,
                                left:0,
                                top:0}}
                                source={{uri: this.state.cameraUri}} >
                        </Image>
                        <Text style={{color:'white'}}>{this.state.cameraUri}</Text>
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
    }
});