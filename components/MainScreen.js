import React, { Component } from 'react';
import { MapView, Location, Permissions, Notifications } from 'expo';
import {  StyleSheet, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { store, auth } from '../fire';
import { Marker } from 'react-native-maps';
import Winner from './Winner';
import MatchBanner from './MatchBanner';

class MainScreen extends Component {

	state = {
		location: null,
		errorMessage: null,
		marker: { latitude: null, longitude: null },
		showLot: false,
		showBid: false,
		offer: '',
		driverId: '',
		winner: false,
		// Added by Thomas. This is for the component that a passenger can see on home
		// It shows the status of the Lot
		lotId: '',
		matchBanner: false,
		passengerId: ''
	}

	async componentDidMount() {
		let driver = '';
		let id;

		const passengerEmail = auth.currentUser.email;
		await store.collection('users').where('email',
			'==', passengerEmail).get()
			.then(users => {
				users.forEach(user => {
					id = user.id;
				});
			});
		this._getLocationAsync();
		this.registerForPushNotification();
		await store.collection('lots').onSnapshot( allLots => {

			allLots.docChanges().forEach(lot => {
						driver = lot.doc.data().driverId;

						//Not sure if needs another if statement but bid info should not changed unless its another bid
						if (lot.doc.data().passengerId === id && lot.doc.data().driverId !== null) {
							this.setState({showBid: true, offer: lot.doc.data().offer, driverId: driver});
						}
			});
		});
		store.collection("lots").where("passengerId", "==", auth.currentUser.email).get().then(lots => {
			lots.forEach(lot => {
				this.setState({ lotId: lot.id, passengerId: lot.data().passengerId });
			});
		});
	}

	registerForPushNotification = async () => {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;
		// only ask if permissions have not already been determined, because
		// iOS won't necessarily prompt the user a second time.
		if (existingStatus !== 'granted') {
			// Android remote notification permissions are granted during the app
			// install, so this will only ask on iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
		// Stop here if the user did not grant permissions
		if (finalStatus !== 'granted') {
			return;
		}

		// Get the token that uniquely identifies this device
		let token = await Notifications.getExpoPushTokenAsync();

		store.collection('users').doc(auth.currentUser.email).update({expoToken: token});
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

	handleMatch = async () => {
		this.setState({showBid: false});
	}

	handleCancel = async () => {
		this.setState({showBid: false});
	}


	render(){
		const { marker, showBid, driverId, offer, passengerId} = this.state;
		return(
			<View style={styles.container}>
			<MapView
				style={styles.map}
				onRegionChangeComplete={this.onRegionChangeComplete}
				showsUserLocation={true}
				followsUserLocation={true}>
				{marker.latitude ? <Marker
					coordinate={marker}
				/> : null}
			</MapView>

					{/** We can't do these alerts won't work as they are. I believe the problem is that the component is re-rendering
								frequently, and every time it does, a new alert is sent.*/}
					{showBid ? Alert.alert(
						`New Bid! ${driverId} has bid ${offer}!`,
						'Sound Good?',
						[
							{ text: 'Yes!', onPress: () => this.handleMatch(), style: 'cancel' },
							{ text: 'Cancel', onPress: () => this.handleCancel(), style: 'cancel' }
						],
						{ cancelable: false }
					) : null}


				{this.state.passengerId ? <Button title="Look here" style={styles.match} onPress={() => this.setState({matchBanner: true})} /> : <Button
				title="Where to?"
				style={styles.button}
				backgroundColor='white'
				color='grey'
				onPress={this.handleSubmit} /> }
			{this.state.matchBanner ? <MatchBanner lotId={this.state.lotId} close={() => this.setState({matchBanner: false})}  /> : null}

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
	},

	match: {
		zIndex: 20,
		top: 80
	}
});

export default MainScreen;
