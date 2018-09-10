import React, { Component } from 'react';
import { MapView, Location, Permissions, Notifications, Platform } from 'expo';
import { View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { store, auth } from '../fire';
import { Marker } from 'react-native-maps';
import MatchBanner from './MatchBanner';
import style from '../public/style';
import Icon from 'react-native-vector-icons/Octicons';


class MainScreen extends Component {

	state = { // This state should be reviewed by everyone to make sure that it isn't redundant, etc.
		location: null,
		errorMessage: null,
		marker: null,
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
		//Functions called that will change state
		//(Can't call setState in component did mount (most of the time))
		this._getLocationAsync();
		this.registerForPushNotification();

		let driver = '';

		await store.collection('lots').onSnapshot( allLots => {

			allLots.docChanges().forEach(lot => {
						driver = lot.doc.data().driverId;

						//Not sure if needs another if statement but bid info should not changed unless its another bid
						if (lot.doc.data().passengerId === auth.currentUser.email && lot.doc.data().driverId !== null) {
							this.setState({showBid: true, offer: lot.doc.data().offer, driverId: driver });
							//UNSUBSCRIBE - STOP LISTENING ON COMPONENT DID UNMOUNT
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
		//Gets location and sets location to location and marker.
		//Marker is the draggable marker, defaults to user's location
		this.setState({ location, marker: location.coords });
	};

	handleHideButton = (lotId) => {
		this.setState({ passengerId: true, lotId });
	}

	handleSubmit = () => {
		this.props.navigation.navigate('LotSubmissionForm', {
			//passing marker coordinates as props to lotsubmissionform
			marker: this.state.marker, handleHideButton: this.handleHideButton
		});
	}

	handleMatch = () => {
		this.setState({showBid: false});
	}

	handleCancel = () => {
		this.setState({showBid: false});
	}


	render(){
		const { marker, showBid, driverId, offer} = this.state;

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

			{marker !== null && <Marker draggable
				image={require('../public/images/marker.png')}

			coordinate={marker}
			onDragEnd={(e) => this.setState({ marker: e.nativeEvent.coordinate })
		}
		/>}

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


					{this.state.passengerId ? <Button title="View Your Current Trip" style={style.matchMain} onPress={() => this.setState({matchBanner: true})} /> : <Button
					title="Where to?"
					style={style.buttonMain}
					backgroundColor='white'
					color='grey'
					onPress={this.handleSubmit} /> }
				{this.state.matchBanner ? <MatchBanner lotId={this.state.lotId} close={() => this.setState({matchBanner: false})}  /> : null}
		</View>
		);
	}
}

export default MainScreen;
