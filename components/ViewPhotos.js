import React, { Component } from 'react';
import {
	Image,
	View,
	Button
} from 'react-native';
import {ImagePicker, Permissions} from 'expo';

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
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
		});

		console.log(result);
		if (!result.cancelled) {
			this.setState({ image: result.uri });
		}
	}
}
