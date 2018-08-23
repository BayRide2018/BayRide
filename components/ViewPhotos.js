import React, { Component } from 'react';
import { imgStorageRef } from '../fire';
import {
	Image,
	View,
	Button
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
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


		  const photoId = uuid.v4();
		  const passengerId = this.props.passengerId;
		  uploadImageAsync(pickerResult.uri, photoId, passengerId);

		  this.props.setScreenshotId(photoId);

		if (!pickerResult.cancelled) {
			this.setState({ image: pickerResult.uri });
		}
	}
}

async function uploadImageAsync(uri, photoId, passengerId) {
	const response = await fetch(uri);
	const blob = await response.blob();
	const ref = imgStorageRef
	  .child(passengerId).child(photoId);
	const snapshot = await ref.put(blob);
	return snapshot.downloadURL;
};
