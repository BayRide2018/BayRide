import React, { Component } from "react";
import { View } from "react-native";
import LotBanner from "./LotBanner";
import TimerCountdown from 'react-native-timer-countdown';
import { expireLot } from '../fireMethods';


export default class LotBannerWrapper extends Component {

	state = {
		showThisBanner: true
	}

	handleFinish = async () => {
		this.setState({ showThisBanner: false });

		await expireLot(this.props.lotData.lotId);
		store.collection("users").doc(auth.currentUser.email).get().then(user => {
			if (user.data().currentLot.inProgress) {
				this.props.showWin();
			}
		});

		// I don't think we need to worry about this too much anymore...
		/** 
		 * The code that updates the database should only run once (duh), meaning that it 'should' be (B) backend code or (A) code that only runs on one user's device. This means either
		 * (A) The code either runs on the device of the passenger or the driver. We can immediately dismiss the possiblity of the passenger, as it needs to be okay for the passenger to close their phone.
		 * 		The question is then, is it okay to trust that the driver will have the app open?? It seems likely, and I think that Uber drivers sort of always have the app open while driving, but I don't know... 
		 * (A2) An option that is sort of in between these is having any person's device perform the updates necessary, and only whoever does it first does it. However, this seems inelegant, and I don't know if it ould actually work
		 * (B) The code runs on the 'backend', for us, this probably means a firestore function. However, we don't really have a good way of getting them to trigger at the proper time.. We could have it be that on Lot Submission,
		 * 		a function is run that is just a setTimeout for the correct amount of time.. and then does the expiration.
		 */

	}
	

	render () {
		let { pickupTime } = this.props.lotData;
		if (pickupTime) pickupTime = pickupTime.toDate();
		const now = new Date().getTime();

		return (
			<View style={style.lotBannerWrapper} >
				{this.state.showThisBanner
				?	<View>
						<View style={style.center}>
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
