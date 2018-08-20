import React, { Component } from 'react';
import {
	Image,
	View,
	Button
} from 'react-native';
import {ImagePicker, Permissions} from 'expo';
// import { uploadImage } from './uploadImage';
import firebase from 'firebase';
import uuid from 'uuid';
// ^^This library is used to generate random id's

export default class ViewPhotos extends Component {
	state = {
		image: null,
	};

	askPermissionsAsync = async () => {
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
	};

	render(){
		let { image } = this.state;
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Button
					title="Pick an image from camera roll"
					onPress={this._pickImage}
				/>
				{image &&
					<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
			</View>
		);
	}


	_pickImage = async () => {
		await this.askPermissionsAsync();

		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		  });

		  uploadImageAsync(pickerResult.uri);
		// let result = await ImagePicker.launchImageLibraryAsync({
		// 	allowsEditing: true,
		// 	aspect: [4, 3],
		// }, response => {
		// 	uploadImageAsync(response.uri)
		// 		.then(() => {
		// 			console.log(response.uri);
		// 		})
		// 		.catch(error => {
		// 			console.log(error);
		// 		});
		// });

		// console.log(result);
		if (!pickerResult.cancelled) {
			this.setState({ image: pickerResult.uri });
		}
	}
}

async function uploadImageAsync(uri) {
	const response = await fetch(uri);
	const blob = await response.blob();
	const ref = firebase
	  .storage()
	  .ref()
	  .child("images")
	  .child(uuid.v4());

	const snapshot = await ref.put(blob);
	return snapshot.downloadURL;
  }
