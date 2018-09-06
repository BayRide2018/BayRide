import React, { Component } from "react";
import { View, Text } from "react-native";
import LotBanner from "./LotBanner";
import TimerCountdown from 'react-native-timer-countdown';
import { expireLot } from '../fireMethods';
import style from '../public/style';


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
	)
	}

}
