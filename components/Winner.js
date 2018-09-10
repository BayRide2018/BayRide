import React from 'react';
import { Text, View, Button } from 'react-native';
import style from '../public/style';
import { store } from '../fire';
import getDirections from 'react-native-google-maps-directions';
import call from 'react-native-phone-call';


export default class Winner extends React.Component {

	state = {
		lot : {},
		passenger : {}
	};

	componentDidMount = async () => {
		const { navigation } = this.props;
		const lotId = navigation.getParam('lotId', 'null');
		// This prop the id of the lot that the driver WON, should be the only prop you need to pass
		await store.collection("lots").doc(lotId).get().then(lot => {
			this.setState({ lot: lot.data() });
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
				<Button title="Drive to Passenger's destination!" onPress={this.handleDirectionsForTrip} />
				<Button title="Close" onPress={() => {}} />
			</View>
		);
	}
}
