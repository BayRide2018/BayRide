import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Button, Text, CameraRoll, TouchableHighlight, Image } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import ViewPhotos from './ViewPhotos';

const Blob = RNFetchBlob.polyfill.Blob;
let fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const sessionId = new Date().getTime();
      let uploadBlob = null;
      const imageRef = firebase.storage().ref('images').child(`${sessionId}`);

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, {type: `${mime};BASE64`})
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob._ref, blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        })
    })

}

class upload extends Component {
    render(){
      return(
        <View>
          <Text>TESTTTT</Text>
        </View>
      );
    }
  };


/**
 * I believe that this whole file can be deleted. ~Thomas
 */