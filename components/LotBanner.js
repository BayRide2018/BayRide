import React from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { store, auth, imgStorageRef } from '../fire';
import LightBox from 'react-native-lightbox';
import style from '../public/style';


export default class LotBanner extends React.Component {

	state = { lotData: this.props.lotData, imgURL: '' };

	componentDidMount () {
		imgStorageRef.child(this.state.lotData.passengerId).child(this.state.lotData.screenshot).getDownloadURL().then(url => {
			this.setState({ imgURL: url });
		})
	}


	handleReport = () => {
		// Mark the lot in the db
		// Notify a human
	}

	handlePress = async () => {
		let driverExpoToken;
		await store.collection("users").doc(auth.currentUser.email).get().then(user => {
			driverExpoToken = user.data().expoToken;
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
		console.log("render state: ", this.state);
		// Here's something that needs to be fixed vv
		const buttonTitle = this.state.lotData.driverId ? "Offer a lower price" : "Bid at this price!";
		return (
			<View style={style.lotBanner}>
				<View>
					{!!this.state.imgURL &&

						<LightBox underlayColor='white'>
							<Image resizeMode='contain' source={{ uri: this.state.imgURL }} style={{ flex:1, height: 200 }} />
						</LightBox>
					}
				</View>
				<View>
					<Text>Drop Off location: {this.state.lotData.dropoffLocation}</Text>
					<Text>Bid Price: {this.state.lotData.offer}</Text>
					{!this.state.lotData.driverId && <Text>Be the first one to bid on this!!!</Text>}
					<View style={style.lotBannerButton}>
						<Button title={buttonTitle} onPress={this.handlePress} />
						<Button title={"Report"} onPress={this.handleReport} />
					</View>
				</View>
			</View>
		);
	}
}
