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

		/** 
		 * In reality, basically nothing below this should be here, because the only thing that we want to happen for every user who is viewing the app is for the lot to disappear when time's up..
		 * ^Except that it should navigate the correct person to Winner.js, right?? Or is there a way to make that easier? Like having that on driverHome
		 * 
		 * The code that updates the database should only run once (duh), meaning that it 'should' be (B) backend code or (A) code that only runs on one user's device. This means either
		 * (A) The code either runs on the device of the passenger or the driver. We can immediately dismiss the possiblity of the passenger, as it needs to be okay for the passenger to close their phone.
		 * 		The question is then, is it okay to trust that the driver will have the app open?? It seems likely, and I think that Uber drivers sort of always have the app open while driving, but I don't know... 
		 * (A2) An option that is sort of in between these is having any person's device perform the updates necessary, and only whoever does it first does it. However, this seems inelegant, and I don't know if it ould actually work
		 * (B) The code runs on the 'backend', for us, this probably means a firestore function. However, we don't really have a good way of getting them to trigger at the proper time.. We could have it be that on Lot Submission,
		 * 		a function is run that is just a setTimeout for the correct amount of time.. and then does the expiration.
		 */

		const expiringLotId = this.props.lotData.lotId;
		const newLotId = await expireLot(expiringLotId); // ......... We should test this with multiple drivers viewing a lot as it expires... Won't they all call expireLot?
												// I think maybe we should have some sort of test at the beginning, like when you call it, check to see if it actually exists, and if not, don't do anything.. 

		// This should be the case where no one was the  no one was the driver
		if (!newLotId) { return "The lot was already taken care of"; }
		// ^^ So do we even need this? I don't think so...

		// Not this..
		let myCurrentLot;
		store.collection("users").doc(auth.currentUser.email).get().then(user => {
			myCurrentLot = user.data().currentLot;
		});

		if (myCurrentLot === expiringLotId) {
			store.collection("users").doc(auth.currentUser.email).update({ currentLot: newLotId }); // I don't think that this is right... Won't this mean that anyone on DriverHome will have their currentLot set to the new Lot id?
			// Here's where, if you're the winner, we navigate you to Winner.js
			this.props.navigation.navigat('Winner');
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
