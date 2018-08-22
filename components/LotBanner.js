import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import style from '../public/style';
import firebase from 'firebase';
import { store, auth } from '../fire';


export default class LotBanner extends React.Component {

	state = { lotData: this.props.lotData, imgURL: '' };


  handlePress = async () => { // All this function is doing for now is updating store about who the driver is
    const driverEmail = await auth.currentUser.email;
    let driverId;
    await store.collection("users").where("email", "==", driverEmail).get().then(users => {
      users.forEach(user => {
        driverId = user.id;
      });
    });
    store.collection("lots").doc(this.state.id).update({
      driverId
    });
	}

	componentDidMount () {
		// Get the reference to the passenger, from the Lot
		// Get the reference to screenshot, from the Lot
		const { passengerId, screenshot } = this.state.lotData;
		// Reference passenger/screenshotID
		const ref = firebase.storage().ref()
			.child("images")
			.child(passengerId)
			.child(screenshot.toString())
			.getDownloadURL().then(url => {
				this.setState({ imgURL: url});
			});
	}


	handlePress = async () => { // All this function is doing for now is updating store about who the driver is
		const driverEmail = await auth.currentUser.email;
		let driverId;
		await store.collection("users").where("email", "==", driverEmail).get().then(users => {
			users.forEach(user => {
				driverId = user.id;
			});
		});
		store.collection("lots").doc(this.state.lotData.id).update({
			driverId
		});
	}

	render () {
		const buttonTitle = this.state.driverId ? "Offer a lower price" : "Bid at this price!";
		return (
			<View>
				<Text>BayRide</Text>
				<View>
					{this.state.imgURL &&
						<Image source={{ uri: this.state.imgURL }} style={{ width: 200, height: 200 }} />}
					<Text>Screenshot: {this.state.screenshot}</Text>
					<Text>Pick Up: {this.state.pickupTime}</Text>
					<Text>Location: {this.state.pickupLocation}</Text>
					<Text>Drop Off location: {this.state.pickupLocation}</Text>
					<Text>Bid Price: {this.state.offer}</Text>
					{!this.state.driverId && <Text>Be the first one to bid on this!!!</Text>}
					<Button title={buttonTitle} onPress={this.handlePress} />
				</View>
			</View>
		);
	}
}
