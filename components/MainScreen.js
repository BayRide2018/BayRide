import React, { Component } from 'react';
import { MapView, Location, Permissions, Notifications, Platform } from 'expo';
import { View, Alert } from 'react-native';
import { Button, Text } from 'native-base';
import { store, auth } from '../fire';
// import { Marker } from 'react-native-maps';
import MatchBanner from './MatchBanner';
import style from '../public/style';
import Icon from 'react-native-vector-icons/Octicons';


export default class MainScreen extends Component {

	state = {
		errorMessage: null, // We never use this, just set it if the user won't allow access to their location. We need to not let the app do anything if that's the case... See below
		showBid: false, // We need this if and only if we want to keep the alerts see the note in the render method
		offer: '', // We need this if and only if we want the alerts
		driverId: '', // Same as above.. Also, it should be driver's name, not id, which is an email
		matchBanner: false, // This is the Bool which determines whether or not we display the MatchBanner modal component thing, which shows the status of the trip you want to take
		currentLot: '', // This is the id of the lot that passenger has open
	}

	async componentDidMount() {
		//Functions called that will change state
		//(Can't call setState in component did mount (most of the time))
		this._getLocationAsync();
		this.registerForPushNotification();

		let driver = '';

		// We should really just get rid of this whole query, and put a better version of this in MatchBanner.js
		await store.collection('lots').onSnapshot( allLots => { // This query needs to be majorly changed..
			allLots.docChanges().forEach(lot => {
				driver = lot.doc.data().driverId;
				//Not sure if needs another if statement but bid info should not changed unless its another bid
				if (lot.doc.data().passengerId === auth.currentUser.email && lot.doc.data().driverId !== null) {
					this.setState({showBid: true, offer: lot.doc.data().offer, driverId: driver});
					//UNSUBSCRIBE - STOP LISTENING ON COMPONENT DID UNMOUNT
				}
			});
		});

		// This is the query that we want to make: It ensures that the button on MainScreen always displays properly
		store.collection("users").doc(auth.currentUser.email).get().then(user => {
			this.setState({ currentLot: user.data().currentLot })
		})
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
		store.collection('users').doc(auth.currentUser.email).update({ expoToken: token });
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied',
				/**
				 * 		PLEASE SEE THE NOTE IN STATE ABOUT THIS
				 * 		We can't just set state, we need to basically cut off all functionality, and le the user know that this was the reason why. Also, provide them an opportunity to switch back.
				 */
			});
		}
	}

	handleSubmit = () => {
		this.props.navigation.navigate('LotSubmissionForm');
	}

	handleAlert = () => {
		this.setState({showBid: false});
	}


	render () {
		const { showBid, driverId, offer} = this.state;

		return(
			<View style={style.containerMain}>

				<Icon
					style={style.drawerIcon}
					name='three-bars'
					size={30}
					color='#000'
					onPress={() => this.props.navigation.toggleDrawer()}
				/>

				<MapView
						style={style.mapMain}
						onRegionChangeComplete={this.onRegionChangeComplete}
						showsUserLocation={true}
						followsUserLocation={true}>
				</MapView>

				{/** I believe that we do want to keep these alerts, as push notifications don't actually show up when you're in the app */}
				{showBid ? Alert.alert(
					`New Bid! ${driverId} has bid ${offer}!`, /** driverId, shouldn't be the driver's Id, which is an email, it should be his first name */
					'Sound Good?',
					[
						{ text: 'Nice', onPress: () => this.handleAlert(), style: 'cancel' }
					],
					{ cancelable: false }
				) : null}


				{!!this.state.currentLot
				? 	<View style={style.matchMain}>
						<Button rounded info onPress={() => this.setState({matchBanner: true})}>
							<Text>View your current trip</Text>
						</Button>
					</View>
				:	<View style={style.matchMain}>
						<Button full info large onPress={this.handleSubmit}>
							<Text>Where to?</Text>
						</Button>
					</View> }

				{this.state.matchBanner ? <MatchBanner currentLot={this.state.currentLot} close={() => this.setState({matchBanner: false})}  /> : null}
			</View>
		);
	}
}
