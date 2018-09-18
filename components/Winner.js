import React from 'react';
import { Text, View, Button } from 'react-native';
import style from '../public/style';
import { store, auth } from '../fire';
import getDirections from 'react-native-google-maps-directions';
import call from 'react-native-phone-call';


export default class Winner extends React.Component {


	/**
	 * NOTE:
	 * 		When you reach Winner.js, the lot that you are working with should be a lot that is in lot_history.
	 * It should not be in the lots collection. If it is, then this is a mistake.
	 */


	state = {
		lot : {},
		passenger : {},
		showFinishTrip: false,
		showDirectionsForTrip: false,
	};

	componentDidMount = async () => {
		const { navigation } = this.props;
		const lotId = navigation.getParam('lotId', 'null');
		// This prop the id of the lot that the driver WON, should be the only prop you need to pass
		await store.collection("lots").doc(lotId).get().then(lot => {
			this.setState({ lot: { ...lot.data(), lotId } }); // Now the id of the lot is on state for easy access
			store.collection("users").doc(lot.data().passengerId).get().then(passenger => {
				this.setState({ passenger: passenger.data() })
			})
		})
	}
		
	// It seems like these functions could be written more concisely / better, but I don't think it's really a big deal, since it doesn't really affect proformance, and they're pretty readable
	handleDirectionsToStart = () => {
		const data = {
			destination: {
				latitude: this.state.pickupLocation.coords.latitude,
				longitude: this.state.pickupLocation.coords.longitude
			},
			params: [
				{
					key: 'travelmode',
					value: 'driving'
				},
				{
					key: 'dir_action"',
					value: 'navigate'       // this instantly initializes navigation using the given travel mode
				}
			]
		};
		getDirections(data);
		this.setState({ showDirectionsForTrip: true })
	}
	
	handleDirectionsForTrip = () => {
		const data = {
			destination: {
				latitude: this.state.dropoffLocation.coords.latitude,
				longitude: this.state.dropoffLocation.coords.longitude
			},
			params: [
				{
					key: 'travelmode',
					value: 'driving'
				},
				{
					key: 'dir_action"',
					value: 'navigate'       // this instantly initializes navigation using the given travel mode
				}
			]
		};
		getDirections(data);
		this.setState({ showFinishTrip: true })
	}

	handleFinishTrip () {
		store.collection("users").doc(auth.currentUser.email).update({ currentLot: '' });
		store.collection("users").doc(this.state.lot.passengerId).update({ currentLot: '' });
		// Update the lot_history, so that showReceipt is true
		store.collection("lot_history").doc(this.state.lot.lotId).update({ showReceipt: true })
		this.props.navigation.navigate('DriverHome');
	}
	
	
	render () {
		return (
			<View>
				<Text> You are the Winner!</Text>
				<Text>Passenger Name: {this.state.passenger.name}</Text>
				<Button title={"" + this.state.passenger.phone} onPress={() => { call({ number: this.state.passenger.phone, prompt: true }).catch(console.error) }} />
				<Text>Passenger location</Text>
				{/* <Text>Destination time {this.props.winningInfo.pickupTime.seconds}</Text> */}
				<Button title="Drive to Passenger!" onPress={this.handleDirectionsToStart} />

				{this.state.showDirectionsForTrip
				?	<Button title="Drive to Passenger's destination!" onPress={this.handleDirectionsForTrip} />
				:	null}

				{this.state.showFinishTrip
				?	<Button title="Finish trip" onPress={this.handleFinishTrip} />
				:	null}
			</View>
		);
	}
}
