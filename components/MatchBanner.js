import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { store } from '../fire';
import TimerCountdown from 'react-native-timer-countdown';
import Modal from 'react-native-modal';
import call from 'react-native-phone-call';
import style from '../public/style';
import { expireLot } from '../fireMethods';



export default class MatchBanner extends React.Component {

	state = {
		lotData: {},
		driverInfo: {},
		isModalVisible: true
	}

	async componentDidMount () {
		await store.collection("lots").doc(this.props.currentLot).get().then(lot => {
			this.setState({ lotData: lot.data() });
		});
		if (this.state.lotData.driverId) {
			store.collection("users").doc(this.state.lotData.driverId).get().then(driver => {
				this.setState({ driverInfo: driver.data()});
			});
		}
	}

	handleDelete = () => {
		this.props.close();
		// actually delete the lot from the db
		expireLot(this.props.currentLot);
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
						{/* <Text>Your Trip to {this.state.lotData.dropoffLocation}</Text> */}
						{/* This line was breaking it, because for the lot, dropOffLocation was an empty object.. I think it might have something to do with the Google API search bar */}
						<Text>{carType}</Text>
						<Text>Current Price: $ {this.state.lotData.offer}</Text>
						{this.state.lotData.driverId
						?	<View>
								<Text>You are matched with: {this.state.driverInfo.name}</Text>
								<Button title={"" + this.state.driverInfo.phone} onPress={() => { call({ number: this.state.driverInfo.phone, prompt: true }).catch(console.error) }} />
								<Text>{this.state.driverInfo.drivingInformation && this.state.driverInfo.drivingInformation.info}</Text>
							</View>
						: <Text>No one has submitted a bid yet, but be patient</Text>
						}

						<View> {/** Can we style this view, so that these buttons are in a row */}
							<Button rounded info onPress={() => this.props.close()}>
								<Text>Close</Text>
							</Button>
							{this.state.lotData.driverId
							?	null
							:	<Button rounded info onPress={this.handleDelete}>
									<Text>Delte this Ride</Text>
								</Button>
							}
						</View>

						<TimerCountdown
							initialSecondsRemaining={pickupTime - now}
							onTimeElapsed={() => {}}
							allowFontScaling={true}
						/>
					</View>
				</Modal>
			</View>
		);
	}
}
