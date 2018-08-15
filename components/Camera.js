import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Button, Text, CameraRoll, TouchableHighlight, Image } from 'react-native';
import ViewPhotos from './ViewPhotos';


export default class Camera extends Component {

	state = {
		showPhotoGallery: false,
		photoArray: []
	}

	getPhotosFromGallery() {
		CameraRoll.getPhotos({ first: 1000000, assetType: 'Photos'})
			.then(res => {
				let photoArray = res.edges;
				this.setState({ showPhotoGallery: true, photoArray: photoArray });
			});
	}

	render() {
		if (this.state.showPhotoGallery) {
			return (
				<ViewPhotos
					photoArray={this.state.photoArray} />
			);
		}
		return (
			<View style={styles.container}>
				<TouchableHighlight>
					<Button onPress={() => this.getPhotosFromGallery()} title='Choose Photo' />
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
		container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
