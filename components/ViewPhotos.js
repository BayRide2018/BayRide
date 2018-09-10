import React, { Component } from 'react';
import { imgStorageRef } from '../fire';
import { Image, View, Button } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import uuid from 'uuid';
import { FormLabel } from 'react-native-elements';
import style from '../public/style';



export default class ViewPhotos extends Component {
	state = {
		image: null,
	};

	askPermissionsAsync = async () => {
		Permissions.askAsync(Permissions.CAMERA_ROLL);
	};

	render(){
		let { image } = this.state;
		return (
			<View style={style.iewPhotos}>
			<FormLabel>Screenshot</FormLabel>
				<Button
					title="Pick an image from camera roll"
					onPress={this._pickImage}
				/>
				{image &&
					<Image source={{ uri: image }} />}
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
		.child(passengerId)
		.child(photoId);
	const snapshot = await ref.put(blob);
	return snapshot.downloadURL;
};
