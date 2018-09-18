import React, { Component } from 'react';
import { imgStorageRef, auth } from '../fire';
import { Image, View } from 'react-native';
import {Text, Button} from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import style from '../public/style';
import UploadPhotoButton from 'react-native-upload-photo-button';



export default class ViewPhotos extends Component {
	state = {
		image: null,
	};

	askPermissionsAsync = async () => {
		Permissions.askAsync(Permissions.CAMERA_ROLL);
	};

	render () {
		let { image } = this.state;
		return (
			<View style={style.viewPhoto}>
				<View>
					<UploadPhotoButton label='Add a photo' color='rgb(0,175,115)' onPress={this._pickImage}/>
				</View>
				{image && <Image style={style.screenshot} source={{uri: image}} />}
			</View>
		);
	}


	_pickImage = async () => {
		await this.askPermissionsAsync();

		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: false,
			aspect: [4, 3],
		});

		const photoId = uuid.v4();
		uploadImageAsync(pickerResult.uri, photoId, auth.currentUser.email);

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
		.child(passengerId)
		.child(photoId);
	const snapshot = await ref.put(blob);
	return snapshot.downloadURL;
};
