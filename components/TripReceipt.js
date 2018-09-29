import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { store } from '../fire';
import Modal from 'react-native-modal';
import style from '../public/style';


export default class TripReceipt extends React.Component {

	state = {
		lotData: {},
		driverInfo: {},
		isModalVisible: true
	}

	async componentDidMount () {
        let myPassengerLotHistory, mostRecentLotId;
        await store.collection("users").doc(auth.currentUser.email).get().then(user => {
            myPassengerLotHistory = user.data().myPassengerLotHistory
        });
        await store.collection("passenger_lot_history").doc(myPassengerLotHistory).get().then(plh => {
            mostRecentLotId = plh.lots[plh.lots.length - 1];
        });
        await store.collection("lot_history").doc(mostRecentLotId).get().then(lot => {
            this.setState({ lotData: lot.data() });
        });
        await store.collection("users").doc(this.state.lotData.driverId).get().then(driver => {
            this.setState({ driverInfo: driver.data() });
        });
	}

	
	render () {
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
						<Text>{carType}</Text>
						<Text>From {this.state.lotData.pickupLocation}</Text>
						<Text>To {this.state.lotData.dropoffLocation}</Text>
						<Text>On {this.state.lotData.pickupTime}</Text>
						<Text>Price: $ {this.state.lotData.offer}</Text>
                        <Text>Driven by: {this.state.driverInfo.name}</Text>
                        {/* <Button title={"" + this.state.driverInfo.phone} onPress={() => { call({ number: this.state.driverInfo.phone, prompt: true }).catch(console.error) }} /> */}
                        <Text>{this.state.driverInfo.drivingInformation && this.state.driverInfo.drivingInformation.info}</Text>

                        <View>
                            <Text>Rate? How many stars?</Text>
                            <Text>*    *    *    *    *</Text>
                        </View>

						<View>
							<Button rounded info onPress={() => this.props.close()}>
								<Text>Close</Text>
							</Button>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}
