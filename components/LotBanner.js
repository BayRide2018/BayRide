import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import style from '../public/style';
import firebase from 'firebase';
import { store, auth, imgStorageRef } from '../fire';
import LightBox from 'react-native-lightbox';


export default class LotBanner extends React.Component {

	state = { lotData: this.props.lotData, imgURL: '' };

	componentDidMount () {
		imgStorageRef.child(this.state.lotData.passengerId).child(this.state.lotData.screenshot).getDownloadURL().then(url => {
			this.setState({ imgURL: url });
		})
	}


	handlePress = async () => { // All this function is doing for now is updating store about who the driver is
		let driverExpoToken;
		await store.collection("users").doc(auth.currentUser.email).get.then(user => {
			driverExpoToken = user.expoToken;
		})
		store.collection("lots").doc(this.state.lotData.lotId).get().then(lot => {
			if (lot.data().driverId) {
				let newOffer = lot.data().offer - 0.25 ;
				lot.ref.update({ driverExpoToken, driverId: auth.currentUser.email, offer: newOffer});
			} else {
				lot.ref.update({ driverExpoToken, driverId: auth.currentUser.email });
			}
		});
	}

	render () {
		// Here's something that needs to be fixed vv
		const buttonTitle = this.state.lotData.driverId ? "Offer a lower price" : "Bid at this price!";
		return (
			<View>
				<Text>BayRide</Text>
				<View>
					{!!this.state.imgURL &&

						<LightBox underlayColor='white'>
							<Image resizeMode='contain' source={{ uri: this.state.imgURL }} style={{ flex:1, height: 200 }} />
						</LightBox>
					}
					<Text>Screenshot: {this.state.lotData.screenshot}</Text>
					<Text>Pick Up: {this.state.lotData && this.state.lotData.pickupTime && this.state.lotData.pickupTime.seconds}</Text>

					<Text>Drop Off location: {this.state.lotData.dropoffLocation}</Text>
					<Text>Bid Price: {this.state.lotData.offer}</Text>
					{!this.state.lotData.driverId && <Text>Be the first one to bid on this!!!</Text>}
					<Button title={buttonTitle} onPress={this.handlePress} />
				</View>
			</View>
		);
	}
}
