import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import style from '../public/style';
import firebase from 'firebase';
import { store, auth } from '../fire';
import Modal from "react-native-modal";
import getDirections from 'react-native-google-maps-directions'


export default class Winner extends React.Component {

	state = {
		isModalVisible: true,
		// lot : {}
		// passenger : {}
	};

	_toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

		handleGetDirections = () => {
			const data = {
				destination: {
					latitude: -33.8600024,
					longitude: 18.697459
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

	componentDidMount () {
		// Get the lot that you (the driver) have won off of firestore
		// Save that stuff in state and then keep the passengerId from the lot
		// and save that in state
	}

	render () {
		return (
			<View style={{ flex: 1 }}>
			<TouchableOpacity onPress={this._toggleModal}>
				<Text>Show Modal</Text>
			</TouchableOpacity>
			{/** Button toggles this.state.isModalVisible*/}
			<Modal isVisible={this.state.isModalVisible}>
				<View style={{ flex: 1, backgroundColor: 'white' }}>
					<Text>Winner!</Text>
					<Text>Passenger Name</Text>
					<Text>Passenger location</Text>
					<Text>Destination time</Text>
					<Button
					style={{color: 'Blue'}}
					title="Drive there!"
					onClick={this.handleGetDirections} />
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
