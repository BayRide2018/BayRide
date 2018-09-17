import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text} from 'native-base';
import { FormLabel, FormInput } from 'react-native-elements';
import { Location } from 'expo';
import { store, auth } from '../fire';
import style from '../public/style';
import { Picker } from 'react-native-wheel-pick';
import ViewPhotos from './ViewPhotos';
import GoogleDropoff from './GoogleDropoff';
import { createLot } from '../fireMethods';
import GooglePickup from './GooglePickup';
import AwesomeButton from 'react-native-really-awesome-button';


export default class LotSubmissionForm extends Component {

	state = { // This state should be reviewed by everyone to make sure that it isn't redundant, etc.
		screenshot: '',
		pickupLocation: {},
		dropoffLocation: {},
		offer: 0,
		// passengerId: '', // unnecessary.. we have auth.currentUser.email In fact, we shouldn't be using this inside of View photos, we should just use auth.currentUser.email
		// driverId: '', // We never use this.. when you submit a lot, driverId is an empty string, and this is handled in firemethods, in the createLot function
		showMinutePicker: false,
		// showOfferPicker: false, // We never use this, it's the same as the one below
		showPricePicker: false, // Why is this not used :(
		pickupTime: 0,
		// location: null, // We never use this, and I don't think we need it
		// marker: null, // I still want this to be handled a little differently. See the issue about DropPin.js
		hideButton: null, // I can't seem to tell what this is for?? It doesn't look like we need it, but I don't know
		raiseButton: 4
	}

	// We don't need this
	componentDidMount() {
		this.getProps();
	}

	// We don't need this
	getProps = () => {
		const { navigation } = this.props;
		// const marker = navigation.getParam('marker', 'null');
		// These are also currently unnecesary, meaning that this function is unneccesary
		const handleHideButton = navigation.getParam('handleHideButton', 'null');
		this.setState({hideButton: handleHideButton});
		// this.setState({marker});
	}

	handleSubmit = async (carType) => {
		let lotId = await createLot(this.state.screenshot,
			this.state.pickupTime,
			this.state.pickupLocation,
			this.state.dropoffLocation,
			this.state.offer,
			carType);
		this.state.hideButton(lotId); // I don't think we actually need this because it's doing basically the same thing as the line below...
		// Yeah, just fixed it so thhat the above line is no longer necessary, and just runs empty code. The below line updates the user and then this update can be read from the componentDidMount in MainScreen
		store.collection("users").doc(auth.currentUser.email).update({ currentLot: lotId });
		this.props.navigation.navigate('MainScreen'); // Should this go first?? Will it make it a faster, smoother user experience? IE: you're navigating to MainScreen immediately, and while that's happening, the request is being fulfilled
	}


	// We need to change this function to use DropPin.js
	handleUseMarkerLocation = async () => {
		// Please note that if we use this marker, it needs to have the proper form...
		// This doesn't necessarily mean the same form as `Location` below, which seems to have a lot of extraneous information,
		// but, lots need to be submitted with consistently formatted pickupLocations.
		// this.setState({ pickupLocation: this.state.marker });
	}

	handleUseCurrentLocation = async () => {
		/**
		 * location has this form:
		 * 	   "location": Object {
		 *		     "coords": Object {
		 *		       "accuracy": 65,
		 *		       "altitude": 9.289741516113281,
		 *		       "altitudeAccuracy": 10,
		 *		       "heading": -1,
		 *		       "latitude": 40.70523666448243,
		 *		       "longitude": -74.0134370542345,
		 *		       "speed": -1,
		 *		     },
		 *		     "timestamp": 1534919691811.1948,
		 *		   },
		 */
		let location = await Location.getCurrentPositionAsync({});
		this.setState({ pickupLocation: location, raiseButton: 0 });
	}


	setScreenshotId = (photoID) => {
		this.setState({ screenshot: photoID });
	}

	handleBack = () => {
		this.props.navigation.navigate('MainScreen');
	}

	handleDropOff = (dropoffLocation) => {
		this.setState({ dropoffLocation });
	}

	handlePickUp = (pickupLocation) => {
		this.setState({ pickupLocation });
	}

	render() {
		return (
			<ScrollView contentContainerStyle={style.submissionForm}>

				<View style={style.submissionForm}>
					<Button warning small onPress={this.handleBack} style={style.back}><Text style={{fontSize: 15}}>Go Back</Text></Button>

					<ViewPhotos setScreenshotId={this.setScreenshotId} />

					<FormLabel>Pickup Location</FormLabel>
					{/* commented these out for now */}
					<View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
					 <AwesomeButton raiseLevel={this.state.raiseButton} onPress={this.handleUseCurrentLocation}>Current Location</AwesomeButton>
						<AwesomeButton onPress={this.handleUseMarkerLocation}>Drop a pin</AwesomeButton>
					</View>
					<GooglePickup pickUp={this.handlePickUp} />
					<FormLabel>Drop off Location</FormLabel>
					<GoogleDropoff dropOff={this.handleDropOff} />

					<Text style={{flexDirection: 'row'}}>Your offer: {this.state.offer} $      Pickup Time: {`${this.state.pickupTime} minutes`}</Text>
						<View style={{flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', marginBottom: 70}}>
					{ this.state.showPricePicker
						?  <Picker
						style={style.picker}
						selectedValue='4'
						pickerData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']}
						onValueChange={pickupPrice => this.setState({ offer: pickupPrice, showPricePicker: false })}
						itemSpace={30} // this only support in android
						/>
						:  <Button
						onPress={() => this.setState({ showPricePicker: true })}
						><Text>{this.state.offer} dollars</Text></Button>
					}


						{this.state.showMinutePicker
							?	<Picker
								style={style.picker}
								selectedValue='4'
								pickerData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']}
								onValueChange={pickupTime => this.setState({ pickupTime, showMinutePicker: false })}
								itemSpace={30} // this only support in android
							/>
							:
								<Button
									onPress={() => this.setState({ showMinutePicker: true })}
								><Text>{`${this.state.pickupTime} minutes`}</Text></Button>

						}
						</View>

					<View style={style.button}>
						<Button rounded success onPress={() => { this.handleSubmit("brx") }}><Text>BayRide</Text></Button>
						<Button rounded success onPress={() => { this.handleSubmit("brxl") }}><Text>BayRideXL</Text></Button>
						<Button rounded success onPress={() => { this.handleSubmit("brs") }}><Text>BayRide Supreme </Text></Button>
					</View>
				</View>
			</ScrollView>
		);
	}
}
