import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import LotBanner from "./LotBanner";
import style from '../public/style';
import TimerCountdown from 'react-native-timer-countdown';
import { store } from '../fire';


export default class LotBannerWrapper extends React.Component {

	state = {
	showThisBanner: true
	}

	handleFinish = () => {
	// Very Important Whatever happens here...
	// Send a notification to the Passenger (they can adjust the bid [add time or lower price] or just have it deleted)
	// and hide this for now
		this.setState({ showThisBanner: false });

		store.collection('lots').where('passengerId', '==', this.props.lotData.passengerId).get()
			.then((lots) => {
				lots.forEach(lot => {
					if (lot.data().driverId) {
						console.log('i found the driver id', lot.data().driverId);
					} else {
						lot.ref.delete();
					}
				});
			});
	}

	render () {
	let { pickupTime } = this.props.lotData;
	pickupTime = pickupTime.toDate();
	const now = new Date().getTime();

	return (
		<ScrollView>
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
		</ScrollView>
	)
	}
}
