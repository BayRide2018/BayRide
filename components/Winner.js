import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import style from '../public/style';
import { store, auth } from '../fire';
import Modal from "react-native-modal";
import getDirections from 'react-native-google-maps-directions';
import call from 'react-native-phone-call';


export default class Winner extends React.Component {

	state = {
		isModalVisible: true,
		// lot : {}
		passenger : {}
	};

	componentDidMount = async () => {
		await store.collection("users").doc(this.props.winningInfo.passengerId).get().then(passenger => {
			this.setState({ passenger: passenger.data() });
		})
	}
	
	_toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
	
	handleGetDirections = () => {
		const data = {
			destination: {
				latitude: this.props.pickupLocation.coords.latitude,
				longitude: this.props.pickupLocation.coords.longitude
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
	
	handleGetDirectionsTwo = () => {
		const data = {
			destination: {
				// latitude: this.props.pickupLocation.coords.latitude,
				// longitude: this.props.pickupLocation.coords.longitude
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
			<TouchableOpacity onPress={this._toggleModal}>
				<Text>Show Modal</Text>
			</TouchableOpacity>
			{/** Button toggles this.state.isModalVisible*/}
			<Modal isVisible={this.state.isModalVisible}>
				<View>
					<Text> You are the Winner!</Text>
					<Text>Passenger Name: {this.state.passenger.name}</Text>
					<Button title={"" + this.state.passenger.phone} onPress={() => { call({ number: this.state.passenger.phone, prompt: true }).catch(console.error) }} />
					<Text>Passenger location</Text>
					<Text>Destination time {this.props.winningInfo.pickupTime.seconds}</Text>
					<Button
					title="Drive to Passenger!"
					onPress={this.handleGetDirections} />
					<Button
					title="Drive to Passenger's destination!"
					onPress={this.handleGetDirectionsTwo} />
					
						<Button title="Close" onPress={this._toggleModal} />
					
								{/** Button gets directions to start*/}
											{/** Button gets directions from start to end */}
				</View>
			</Modal>
		</View>
		);
	}
}
