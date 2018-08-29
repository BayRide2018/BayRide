import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/style';
import { store } from '../fire';
import TimerCountdown from 'react-native-timer-countdown';
import Modal from 'react-native-modal';


export default class MatchBanner extends React.Component {

	state = {
		lotData: {},
		driverInfo: {},
		isModalVisible: true
	}

	 async componentDidMount () {
		await store.collection("lots").doc(this.props.lotId).get().then(lot => {
			this.setState({ lotData: lot.data() });
		});
		 store.collection("users").doc(this.state.lotData.driverId).get().then(driver => {
			this.setState({ driverInfo: driver.data()});
		});
	}

	render () {
		let { pickupTime } = this.state.lotData;
		if (pickupTime) pickupTime = pickupTime.toDate();
		const now = new Date().getTime();

		return (
			<View style={{ flex: 1 }}>
			<Modal isVisible={this.state.isModalVisible}>
				<Text>Your Trip to {this.state.lotData.dropoffLocation}</Text>
				<View>
				<Text>Current Price: $ {this.state.lotData.offer}</Text>
				{this.state.lotData.driverId
				?
				<View>
						<Text>You are matched with: {this.state.driverInfo.name}</Text>
						<Text>Phone Number: {this.state.driverInfo.phone}</Text>
						<Text>{this.state.driverInfo.drivingInformation && this.state.driverInfo.drivingInformation.info}</Text>
						</View>
						: <Text>No one has submitted a bid yet, but be patient</Text>
					}
					<Button title='Close' onPress={() => this.props.close()} />
				<TimerCountdown
				initialSecondsRemaining={pickupTime - now}
				onTimeElapsed={this.handleFinish}
				allowFontScaling={true}
				style={{ fontSize: 20 }}
				/>

				</View>
				</Modal>
			</View>
		)
	}
}
