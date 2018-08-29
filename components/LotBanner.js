import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import style from '../public/style';
import firebase from 'firebase';
import { store, auth, imgStorageRef } from '../fire';


export default class LotBanner extends React.Component {

	state = { lotData: this.props.lotData, imgURL: '' };

	// Why were there two copies of this?
  // handlePress = async () => { // All this function is doing for now is updating store about who the driver is
  //   const driverEmail = await auth.currentUser.email;
  //   let driverId;
  //   await store.collection("users").where("email", "==", driverEmail).get().then(users => {
  //     users.forEach(user => {
  //       driverId = user.id;
  //     });
  //   });
  //   store.collection("lots").doc(this.state.id).update({
  //     driverId
  //   });
	// }

	componentDidMount () {
		imgStorageRef.child(this.state.lotData.passengerId).child(this.state.lotData.screenshot).getDownloadURL().then(url => {
			this.setState({ imgURL: url });
		})
	}


	handlePress = async () => { // All this function is doing for now is updating store about who the driver is
		// It'd be nice to make this query more efficient
		store.collection("lots").doc(this.state.lotData.lotId).get().then(lot => {
			if (lot.data().driverId) {
				let newOffer = lot.data().offer - 0.25 ;
				lot.ref.update({ driverId: auth.currentUser.email, offer: newOffer});
			} else {
				lot.ref.update({ driverId: auth.currentUser.email });
			}
		});
	}

	render () {
		const buttonTitle = this.state.lotData.driverId ? "Offer a lower price" : "Bid at this price!";
		return (
			<View>
				<Text>BayRide</Text>
				<View>
					{!!this.state.imgURL &&
						<Image source={{ uri: this.state.imgURL }} style={{ width: 200, height: 200 }} />
					}
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
