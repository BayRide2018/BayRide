import React, { Component } from "react";
import { View } from "react-native";
import LotBanner from "./LotBanner";
import TimerCountdown from 'react-native-timer-countdown';
import { expireLot } from '../fireMethods';
import { store, auth } from '../fire';
import style from '../public/style';


export default class LotBannerWrapper extends Component {

	state = {
		showThisBanner: true
	}

	// This needs to be fixed!!!!
	handleFinish = async () => {
		this.setState({ showThisBanner: false });
		const expiringLotId = this.props.lotData.lotId;
		const newLotId = await expireLot(expiringLotId); // ......... We should test this with multiple drivers viewing a lot as it expires... Won't they all call expireLot?
												// I think maybe we should have some sort of test at the beginning, like when you call it, check to see if it actually exists, and if not, don't do anything.. 

		// Get the current User's current lot
		let myCurrentLot;
		store.collection("users").doc(auth.currentUser.email).get().then(user => {
			myCurrentLot = user.data().currentLot;
		});

		if (myCurrentLot === expiringLotId) {
			store.collection("users").doc(auth.currentUser.email).update({ currentLot: newLotId }); // I don't think that this is right... Won't this mean that anyone on DriverHome will have their currentLot set to the new Lot id?
			// Here's where, if you're the winner, we navigate you to Winner.js
			// How do we do that? Does this.props.navigation.navigate('Winner') work? Even though LBW isn't in DrawerNavigator?
		}
	}

	render () {
		let { pickupTime } = this.props.lotData;
		if (pickupTime) pickupTime = pickupTime.toDate();
		const now = new Date().getTime();

		return (
			<View style={style.lotBannerWrapper} >
				{this.state.showThisBanner
				?	<View>
						<View style={style.timer}>
						<TimerCountdown

							initialSecondsRemaining={pickupTime - now}
							onTimeElapsed={this.handleFinish}
							allowFontScaling={true}
						/>
						</View>
						<LotBanner lotData={this.props.lotData} />
						<View style={style.horizontalRule} />
					</View>
				: null}
			</View>
		);
	}
}
