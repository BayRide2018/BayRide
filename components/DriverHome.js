import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { store, auth } from '../fire';
import LotBannerWrapper from './LotBannerWrapper';
import { Permissions, Location } from 'expo';
import style from '../public/style';
import Icon from 'react-native-vector-icons/Octicons';
import { stat } from 'fs';


export default class DriverHome extends Component {

	state = {
		allLots: [],
		showWinnerAlert: false,
		location: '',
	}

	componentDidMount = async () => {
		/**
		 * (1) When DriverHome renders, check to see if we're a winner, and if we are, take us to Winner.js (This happens below)
		 * (2) While DriverHome is open, if the winning Lot expires, it takes us to Winner.js (This happens in LotBannerWrapper)
		 */
	
		// (1) When DriverHome renders, check to see if we're a winner, and if we are, take us to Winner.js (This happens below)
		store.collection("users").doc(auth.currentUser.email).get().then(user => {
			this.setState({ showWinnerAlert: user.data().currentLot.inProgress });
		});

		this._getLocationAsync();

		/**
		 * ### Here, we need to get the lots from the specific state and load them up
		 * Note, the way that we find what the specific state is is by checking state (what is this.state.location)
		 * Also, !!! we need to update firestore. Set the driver's drivingInfo.location to whatever it is, so that we can send them notifications
		 */
		let state = "NY"; // We need to get this somewhere... Probably using Geocoder....
		store.collection("user").doc(auth.currentUser.email).update({ "drivingInformation.state": state }); // I'm not sure if this is exactly what we want... We might want more.. perhaps to have a list of driver IDs in each state
		let lotIdList = [];
		let lotList = [];
		await store.collection("states").doc(state).get().then(state => {
			lotIdList = state.data().lots;
		});
		for (let id of lotIdList) {
			await store.collection("lots").doc(id).get().then(lot => {
				lotList.push({ ...lot.data(), lotId: lot.id });
			});
		}
		// Now sort them and add them to state
		// Really, really long one-liner that sorts based on geometric distance of starting point to the user
		await lotList.sort((a, b) => (Math.hypot(a.pickupLocation.region.lat - this.state.location.coords.latitude, a.pickupLocation.region.lng - this.state.location.coords.longitude) - Math.hypot(b.pickupLocation.region.lat - this.state.location.coords.latitude, b.pickupLocation.region.lng - this.state.location.coords.longitude)));
		
		this.setState({ allLots: lotList });
	}

	/**
	 * Is it even possible for a user to get to DriverHome without having allowed access to his location?
	 */
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


	render () {
		return(
			<View style={style.background} >
				<Icon
					style={style.drawerIcon}
					name='three-bars'
					size={30}
					color='#000'
					onPress={() => this.props.navigation.toggleDrawer()}
				/>
				<ScrollView>
					<View>
						{this.state.allLots.map((lot, i) => {
							return <LotBannerWrapper key={i} lotData={lot} showWin={() => this.setState({ showWinnerAlert: true })} />;
						})}
						{/** This alert should only show if you have the app closed and then win, and then open it */}
						{this.state.showWinnerAlert ? Alert.alert(
							`You Won!!`,
							'Please click here to begin your trip',
							[
								{ text: 'Awesome!', onPress: () => { this.props.navigation.navigate('Winner'); console.log("Why doesn't this work??"); }, style: 'cancel' }
							],
							{ cancelable: false }
						) : null}
					</View>
				</ScrollView>
			</View>
		);
	}
}
