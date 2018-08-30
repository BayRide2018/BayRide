import React, { Component } from "react";
import { View } from "react-native";
import LotBanner from "./LotBanner";
import TimerCountdown from 'react-native-timer-countdown';
import { expireLot } from '../fireMethods';


export default class LotBannerWrapper extends Component {

	state = {
		showThisBanner: true
	}

	handleFinish = () => {
		this.setState({ showThisBanner: false });
		expireLot(this.props.lotData.lotId);
	}

	render () {
	let { pickupTime } = this.props.lotData;
	if (pickupTime) pickupTime = pickupTime.toDate();
	const now = new Date().getTime();


	return (
		<View>
		{this.state.showThisBanner
		? <View>
			<TimerCountdown
				initialSecondsRemaining={pickupTime - now}
				onTimeElapsed={this.handleFinish}
				allowFontScaling={true}
				style={{ fontSize: 20 }}
			/>
			<LotBanner lotData={this.props.lotData} />
			</View>
		: null}
		</View>
	)
	}

}
