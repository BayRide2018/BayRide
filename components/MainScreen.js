import React, { Component } from 'react';
import { MapView, Location, Permissions, Notifications, Platform } from 'expo';
import { View, Alert } from 'react-native';
import { Button, Text } from 'native-base';
import { store, auth } from '../fire';
// import { Marker } from 'react-native-maps';
import MatchBanner from './MatchBanner';
import style from '../public/style';
import Icon from 'react-native-vector-icons/Octicons';


class MainScreen extends Component {

	state = { // This state should be reviewed by everyone to make sure that it isn't redundant, etc.
		// location: null, // It seems that we never use this.. we only need the passengers current location for LotSubmissionForm... We need it for the MapView, right?? But that seems to get it by default..
		errorMessage: null, // We never use this, just set it if the user won't allow access to their location. We need to not let the app do anything if that's the case... See below
		// marker: null, // We should get rid of this.
		// showLot: false, // We're not using this, I think we can get rid of it
		showBid: false, // We need this if and only if we want to keep the alerts see the note in the render method
		offer: '', // We need this if and only if we want the alerts
		driverId: '', // Same as above.. Also, it should be driver's name, not id, which is an email
		// winner: false, // I think that we never use this and can delete it
		// Added by Thomas. This is for the component that a passenger can see on home
		// It shows the status of the Lot
		// lotId: '', // I think that this should be replaced with the field currentLot
		matchBanner: false, // This is actually important... It is the Bool which determines whether or not we display the MatchBanner modal component thing, which shows the status of the trip you want to take
		// passengerId: '', // I think that we never use this and can delete it
		currentLot: '', // This is actually important... It's the id of the lot that passenger has open
	}

	async componentDidMount() {
		//Functions called that will change state
		//(Can't call setState in component did mount (most of the time))
		this._getLocationAsync();
		this.registerForPushNotification();

		let driver = '';

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

		// This should just be get the passenger (aka the currentUser)'s currentLot... And do we even want to do this??
		await store.collection("lots").where("passengerId", "==", auth.currentUser.email).get().then(lots => {
			lots.forEach(lot => {
				this.setState({ currentLot: lot.id });
			});
		});

		store.collection('users').doc(auth.currentUser.email).onSnapshot(user => {
			this.setState({currentLot: user.data().currentLot});
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
				/**
				 * 		PLEASE SEE THE NOTE IN STATE ABOUT THIS
				 * 		We can't just set state, we need to basically cut off all functionality, and le the user know that this was the reason why. Also, provide them an opportunity to switch back.
				 */
			});
		}
		let location = await Location.getCurrentPositionAsync({});
		//Gets location and sets location to location and marker.
		//Marker is the draggable marker, defaults to user's location
		this.setState({ location });
	}

	// I think that we never actually use this
	handleHideButton = (currentLot) => {
		this.setState({ currentLot });
	}

	handleSubmit = () => {
		this.props.navigation.navigate('LotSubmissionForm', {
			//passing marker coordinates as props to lotsubmissionform
			handleHideButton: this.handleHideButton
		});
	}

	handleMatch = () => {
		this.setState({showBid: false});
	}

	handleCancel = () => {
		this.setState({showBid: false});
	}


	render() {
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

					{/* {marker !== null && <Marker draggable
						image={require('../public/images/marker.png')}
						
						coordinate={marker}
						onDragEnd={ (e) => this.setState({ marker: e.nativeEvent.coordinate }) }
						/>} */}

				</MapView>

				{/** We probably don't really want these alerts.. Do push notifications still show up if you're in that app?? If not, then having these alerts at that time would be good, but we don't really want them to be spammy */}
				{showBid ? Alert.alert(
					`New Bid! ${driverId} has bid ${offer}!`, /** we really only need to have driverId and offer on state if we want to have this alert. See above*/
					'Sound Good?', /** Also, driverId, shouldn't be the driver's Id, which is an email, it should be his first name */
					[
						{ text: 'Yes!', onPress: () => this.handleMatch(), style: 'cancel' },
						{ text: 'Cancel', onPress: () => this.handleCancel(), style: 'cancel' }
					],
					{ cancelable: false }
				) : null}


				{this.state.currentLot
				? 	<View style={style.matchMain}>
						<Button rounded info onPress={() => this.setState({matchBanner: true})}>
							<Text>View your current trip</Text>
						</Button>
					</View>
				:	<View style={style.matchMain}>
						<Button rounded info large onPress={this.handleSubmit}>
							<Text>Where to?</Text>
						</Button>
					</View> }

				{this.state.matchBanner ? <MatchBanner currentLot={this.state.currentLot} close={() => this.setState({matchBanner: false})}  /> : null}
			</View>
		);
	}
}

export default MainScreen;
