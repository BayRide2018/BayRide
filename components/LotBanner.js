import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import { store, auth, imgStorageRef } from '../fire';
import LightBox from 'react-native-lightbox';
import style from '../public/style';


export default class LotBanner extends React.Component {

	state = {
		lotData: this.props.lotData,
		imgURL: '',
		bidPrice: 0,
		winningBidder: false,
		showCantBid: false,
	 };

	componentDidMount () {
		imgStorageRef.child(this.state.lotData.passengerId).child(this.state.lotData.screenshot).getDownloadURL()
			.then(url => {
				this.setState({ imgURL: url });
			});
		 store.collection('lots').doc(this.state.lotData.lotId).onSnapshot(lot => {
			 // It'd be cool for someone to look into these.. do we need all of these &&'s ?
			 if (lot.data() && lot.data().offer) {
				 this.setState({ bidPrice: lot.data().offer });
			 }

			if (lot.data() && lot.data().driverId === auth.currentUser.email) {
				this.setState({ winningBidder: true });
			} else {
				this.setState({ winningBidder: false });
			}
		});
	}

	handleReport = () => {
		// Mark the lot in the db
		// Notify a human
		console.log("The report button doesn't do anything right now, but it would be great for it to do something later...")
	}

	handlePress = async () => {
		let driverExpoToken, currentLot;
		await store.collection("users").doc(auth.currentUser.email).get().then(user => {
			driverExpoToken = user.data().expoToken;
			currentLot = user.data().currentLot.lotId;
		});
		if (!currentLot || currentLot === this.state.lotData.lotId) {
			store.collection("users").doc(auth.currentUser.email).update({ "currentLot.lotId" : this.state.lotData.lotId });
			store.collection("lots").doc(this.state.lotData.lotId).get().then(lot => {
				if (lot.data().driverId) {
					let newOffer = lot.data().offer - 0.25 ;
					lot.ref.update({ driverExpoToken, driverId: auth.currentUser.email, offer: newOffer});
				} else {
					lot.ref.update({ driverExpoToken, driverId: auth.currentUser.email });
				}
			});
			this.this.setState({ lotData: { ...this.state.lotData, driverId: auth.currentUser.email } });
		} else {
			this.setState({ showCantBid: true });
		}
	}
	

	render () {
		const buttonTitle = this.state.lotData.driverId ? "Offer a lower price" : "Bid at this price!";
		let lotBannerStyle = this.state.winningBidder ? style.winningBanner : style.lotBanner;

		return (
			<View  style={lotBannerStyle}>
				<View  style={style.innerLotBannerA}>
					{!!this.state.imgURL &&
						<LightBox underlayColor='white'>
							<Image resizeMode='contain' source={{ uri: this.state.imgURL }} style={style.screenshot} />
						</LightBox>
					}
				</View>
				<View  style={style.innerLotBannerB}>
					<Text style={style.center} >Drop Off location: {this.state.lotData.dropoffLocation.fullAddress}</Text>
					<Text style={style.center} >Bid Price: {this.state.bidPrice}</Text>
					{!this.state.lotData.driverId && <Text style={style.center} >Be the first one to bid on this!!!</Text>}
					<View style={style.lotBannerButton}>
					<Button title={buttonTitle} onPress={this.handlePress} />
					<Button title={"Report"} onPress={this.handleReport} />
					</View>
				</View>
				{this.state.showCantBid ? Alert.alert(
					`You already have a bid open!`, /** driverId, shouldn't be the driver's Id, which is an email, it should be his first name */
					'You can\'t bid on other trips while you have a bid open',
					[
						{ text: 'Nice', onPress: () => this.setState({ showCantBid: false }), style: 'cancel' }
					],
					{ cancelable: false }
				) : null}
			</View>
		);
	}
}
