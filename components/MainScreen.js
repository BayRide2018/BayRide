import React, { Component } from 'react';
import { MapView, Constants, Location, Permissions } from 'expo';
import {  StyleSheet, Text, Dimensions, View, Platform, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import firestore from '../firestore';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { firebase } from '@firebase/app';
const key = 'AIzaSyDVmcW1my0uG8kBPgSHWvRhZozepAXqL_A';
import getDirections from 'react-native-google-maps-directions'
import LotSubmissionForm from './LotSubmissionForm'
import ViewPhotos from './ViewPhotos';
import DrawerNavigator from './DrawerNavigator';

class MainScreen extends Component {

  state = {
    location: null,
    errorMessage: null,
    marker: { latitude: null, longitude: null },
    showLot: false
  }

	componentDidMount() {
		this._getLocationAsync()
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied',
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		this.setState({ location });
	};

  handleSubmit = async () => {
		this.props.navigation.navigate('LotSubmissionForm');
	}

  render(){
    const { location, marker, showLot } = this.state;
    return(
      <View style={styles.container}>
      <MapView style={styles.map}
        onRegionChangeComplete={this.onRegionChangeComplete}
        showsUserLocation={true}
        followsUserLocation={true}
        onRegionChangeComplete={this.onRegionChangeComplete}>
        {marker.latitude ? <Marker
          coordinate={marker}
        /> : null}
			</MapView>


			<MapView style={styles.map}
				onRegionChangeComplete={this.onRegionChangeComplete}
				showsUserLocation={true}
				followsUserLocation={true}
				onRegionChangeComplete={this.onRegionChangeComplete}>
				{marker.latitude ? <Marker
					coordinate={marker}
				/> : null}
			</MapView>

			<Button
						title="Where to?"
						style={styles.button}
						backgroundColor='white'
						color='grey'
						onPress={this.handleSubmit} />

		</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    flex: 1
	},
	lot: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'black'
	},

	scrollview: {
		alignItems: 'center',
	},

	map: {
		zIndex: -1,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
	},

	button: {
		zIndex: 10,
		top: 70
	}
});

export default MainScreen;

