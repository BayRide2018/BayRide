import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { store, auth } from '../fire';
import TimerCountdown from 'react-native-timer-countdown';
import Modal from 'react-native-modal';
import call from 'react-native-phone-call';
import style from '../public/style';
import { expireLot } from '../fireMethods';


export default class MatchBanner extends React.Component {

	state = {
		lotData: {},
		driverInfo: {},
		isModalVisible: true,
		tripinProgress: false,
	}

	/**
	 * Somewhere, we want to set up a listener for changes to the driver
	 * When it's location changes, calculate the time til he gets here,
	 * then round it to the nearest minute. When it gets below 2 minutes,
	 * (or maybe 1:30) then say "Your driver is arriving, please proceed
	 * to the pickup location."
	 */

	async componentDidMount () {
		// check currentLot.inProgress
		let currentLot;
		await store.collection("users").doc(auth.currentUser.email).get().then(user => {
			currentLot = user.data().currentLot;
		})
		if (currentLot.inProgress) {
			await store.collection("lot_history").doc(this.props.currentLotId).get().then(lot => {
				this.setState({ lotData: lot.data(), tripinProgress: true });
			});
		} else {
			await store.collection("lots").doc(this.props.currentLotId).get().then(lot => {
				this.setState({ lotData: lot.data() });
			});
		}
		if (this.state.lotData.driverId) {
			store.collection("users").doc(this.state.lotData.driverId).get().then(driver => {
				this.setState({ driverInfo: driver.data() });
			});
		}
	}

	handleDelete = async () => {
		this.props.close();
		// actually delete the lot from the db
		expireLot(this.props.currentLotId);
		store.collection("users").doc(auth.currentUser.email).update({ "currentLot.lotId" : '' });
		// Also, do we need to further update the state of MainScreen?
		this.props.delete(); // Yes, this
	}


	render () {
		let { pickupTime } = this.state.lotData;
		if (pickupTime) pickupTime = pickupTime.toDate();
		const now = new Date().getTime();

		let carType;
		if (this.state.lotData.carType === "brs") {
			carType = "BayRide Supreme";
		} else if (this.state.lotData.carType === "brxl") {
			carType = "BayRide XL";
		} else {
			carType = "BayRide";
		}

		return (
			<View>
				<Modal isVisible={this.state.isModalVisible}>
					<View style={style.matchBanner}>

						{this.state.tripinProgress
						?	<Text>{this.state.driverInfo.name} is on the way to {this.state.lotData.pickupLocation && this.this.state.lotData.pickupLocation.fullAddress}!!</Text>
						:	<TimerCountdown
								initialSecondsRemaining={pickupTime - now}
								onTimeElapsed={() => { this.setState({ tripinProgress: true }) }}
								allowFontScaling={true}
							/>
						}
						<Text>Your {carType} to {this.state.lotData.dropoffLocation && this.state.lotData.dropoffLocation.fullAddress}</Text>
						<Text>Current Price: $ {this.state.lotData.offer}</Text>
						{this.state.lotData.driverId
						?	<View>
								<Text>You are matched with: {this.state.driverInfo.name}</Text>
								<Button title={"" + this.state.driverInfo.phone} onPress={() => { call({ number: this.state.driverInfo.phone, prompt: true }).catch(console.error) }} />
								<Text>{this.state.driverInfo.drivingInformation && this.state.driverInfo.drivingInformation.info}</Text>
							</View>
						:	<Text>No one has submitted a bid yet, but be patient</Text>
						}

						<View style={style.buttonRows} > {/** Can we style this view, so that these buttons are in a row */}
							<Button rounded info onPress={() => this.props.close()}>
								<Text>Close</Text>
							</Button>
							<Text>  </Text>
							{this.state.lotData.driverId
							?	null
							:	<Button rounded info onPress={this.handleDelete}>
									<Text>Delete this Ride</Text>
								</Button>
							}
						</View>

					</View>
				</Modal>
			</View>
		);
	}
}
