import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/style';
import { store, auth } from '../fire';
import Modal from "react-native-modal";
import getDirections from 'react-native-google-maps-directions'


export default class Winner extends React.Component {

	state = {
		isModalVisible: true,
		// lot : {}
		passenger : {}
	};

	componentDidMount () {
		store.collection("users").doc(this.props.winningInfo.passengerId).get().then(passenger => {
			this.setState({ passenger });
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
			<View style={{ flex: 1 }}>
			<TouchableOpacity onPress={this._toggleModal}>
				<Text>Show Modal</Text>
			</TouchableOpacity>
			{/** Button toggles this.state.isModalVisible*/}
			<Modal isVisible={this.state.isModalVisible}>
				<View style={{ flex: 1, backgroundColor: 'white', marginTop: 20 }}>
					<Text> You are the Winner!</Text>
					<Text>Passenger Name: {this.state.passenger.name}</Text>
					<Text>Passenger Phone: {this.state.passenger.phone}</Text>
					<Text>Passenger location</Text>
					<Text>Destination time {this.props.winningInfo.pickupTime.seconds}</Text>
					<Button
					title="Drive to Passenger!"
					onPress={this.handleGetDirections} />
					<Button
					title="Drive to Passenger's destination!"
					onPress={this.handleGetDirectionsTwo} />
					<TouchableOpacity onPress={this._toggleModal}>
						<Text style={style.font}>Close</Text>
					</TouchableOpacity>
								{/** Button gets directions to start*/}
											{/** Button gets directions from start to end */}
				</View>
			</Modal>
		</View>
		);
	}
}
