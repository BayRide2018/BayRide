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
					{!!this.state.lotData.screenshot &&&
						<Image source={{ uri: this.state.lotData.imgURL }} style={{ width: 200, height: 200 }} />}
					<Text>Screenshot: {this.state.lotData.screenshot}</Text>
					<Text>Pick Up: {this.state.lotData.pickupTime.seconds}</Text>

					<Text>Drop Off location: {this.state.lotData.dropoffLocation}</Text>
					<Text>Bid Price: {this.state.lotData.offer}</Text>
					{!this.state.lotData.driverId && <Text>Be the first one to bid on this!!!</Text>}
					<Button title={buttonTitle} onPress={this.handlePress} />
				</View>
			</View>
		);
	}
}
