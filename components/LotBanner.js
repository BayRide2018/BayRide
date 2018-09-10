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
		winningBidder: false
	 };

	componentDidMount () {
		imgStorageRef.child(this.state.lotData.passengerId).child(this.state.lotData.screenshot).getDownloadURL()
			.then(url => {
				this.setState({ imgURL: url });
			});
		 store.collection('lots').doc(this.state.lotData.lotId).onSnapshot(lot => {
			this.setState({bidPrice: lot.data().offer});

			if (lot.data().driverId === auth.currentUser.email) {
				this.setState({winningBidder: true});
			} else {
				this.setState({winningBidder: false});
			}
		});


	}


	handleReport = () => {
		// Mark the lot in the db
		// Notify a human
	}

	handlePress = async () => {
		let driverExpoToken;
		store.collection("users").doc(auth.currentUser.email).update({ currentLot: this.state.lotData.lotId });
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
		// Here's something that needs to be fixed vv
		const buttonTitle = this.state.lotData.driverId ? "Offer a lower price" : "Bid at this price!";
		let lotBannerStyle = 		this.state.winningBidder ? style.winningBanner : style.lotBanner;

		return (
			<View style={lotBannerStyle}>
				<View>
					{!!this.state.imgURL &&
						<LightBox underlayColor='white'>
							<Image resizeMode='contain' source={{ uri: this.state.imgURL }} style={{ flex:1, height: 200 }} />
						</LightBox>
					}
				</View> {/* THIS NEEDS TO BE MOVED, BUT I DON'T WANT TO BREAK ANYTHING SO, I'M LEAVING IT FOR NOW */}
				<View>
					<Text style={style.info}>Drop Off location: {this.state.lotData.dropoffLocation.fullAddress}</Text>
					<Text style={style.info}>Bid Price: {this.state.bidPrice}</Text>
					{!this.state.lotData.driverId && <Text style={style.info}>Be the first one to bid on this!!!</Text>}
					<View style={style.lotBannerButton}>
						<Button title={buttonTitle} onPress={this.handlePress} />
						<Button title={"Report"} onPress={this.handleReport} />
						{/*{this.state.winningBidder ? <View style={{backgroundColor: 'green', flex: 1}}><Text>You are winning on this lot!</Text></View> : null}*/}
					</View>
				</View>
			</View>
		);
	}
}
