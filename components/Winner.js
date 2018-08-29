import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import style from '../public/style';
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

	async componentDidMount () {
    const currEmail = auth.currentUser.email

		await store.collection("lots").where("email", "==", currEmail).get().then(allUsers => {
      allUsers.forEach(user => {
        // spotEmail = user.data().matches.email;
        // secondEmail = currEmail;
        if (spotEmail === currEmail) {
          secondEmail = user.data().matches.email;
        } else {
          spotEmail = user.data().matches.email;
          secondEmail = currEmail;
        }
      })
    })
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
					<Text>Passenger Name {this.props.winningInfo.driverId}</Text>
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
