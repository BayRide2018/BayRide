import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Button, Text, CameraRoll, TouchableHighlight, Image } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';


export default class uploadImage extends Component {

	let Blob = RNFetchBlob.polyfill.Blob;
	let fs = RNFetchBlob.fs;
	window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
	window.Blob = Blob;

	showImagePicker((res) => {
		if(!res.didCancel) {
			uploadImage(res.uri);
		}
	});

	const storeReference = (downloadUrl, sessionId) => {
		let imageRef = firebase.storage().ref('images').child('filename');
		let currentUser = firebase.auth().currentUser;
		let image = {
			type: 'image',
			url: downloadUrl,
			createdAt: sessionId,
			user: {
				id: currentUser.uid,
				email: currentUser.email
			}
		}
		firebase.database().ref(imageRef)
			.push(image);
	}

	export const uploadImage = (uri, mime = 'application/octet-stream') => {
		return (dispatch) => {
			return new Promise((resolve, reject) => {
				const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
				const sessionId = new Date().getTime();
				let uploadBlob = null;
				const imageRef = firebase.storage().ref('images').child('filename');
				fs.readFile(uploadUri, 'base64')
					.then((data) => {
						return Blob.build(data, {type: `${mime};BASE64`})
					})
					.then((blob) => {
						uploadBlob = blob;
						return imageRef.put(blob, {contentType: mime})
					})
					.then(() => {
						uploadBlob.close();
						return imageRef.getDownloadURL();
					})
					.then((url) => {
						resolve(url);
						storeReference(url, sessionId);
					})
					.catch((error) => {
						reject(error);
					})
			})
		}
	}

