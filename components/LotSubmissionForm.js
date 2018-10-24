import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { FormLabel } from 'react-native-elements';
import { Location } from 'expo';
import { store, auth } from '../fire';
import style from '../public/style';
import { Picker } from 'react-native-wheel-pick';
import ViewPhotos from './ViewPhotos';
import GoogleDropoff from './GoogleDropoff';
import { createLot } from '../util/fireMethods';
import GooglePickup from './GooglePickup';
import AwesomeButton from 'react-native-really-awesome-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class LotSubmissionForm extends Component {

	state = {
		screenshot: '',
		pickupLocation: {
			fullAddress: 'Search',
		},
		dropoffLocation: {},
		offer: '20',	// I think that this change, and the one below to pickupTime, might be why the wheel-pick buttons were crashing. If it's not this, then it's probably just the library itself that we need to replace
		showMinutePicker: false,
		showPricePicker: false,
		pickupTime: '15',
		pickBorderWidth: 0,
		dropBorderWidth: 0,
	}


	handleSubmit = async (carType) => {
		let lotId = await createLot(this.state.screenshot,
			this.state.pickupTime,
			this.state.pickupLocation,
			this.state.dropoffLocation,
			this.state.offer,
			carType);
		store.collection("users").doc(auth.currentUser.email).update({ "currentLot.lotId" : lotId });
		this.props.navigation.navigate('MainScreen'); // Should this go first?? Will it make it a faster, smoother user experience? IE: you're navigating to MainScreen immediately, and while that's happening, the request is being fulfilled
	}

	// We need to change this function to use DropPin.js
	handleUseDropPin = async () => {
		this.props.navigation.navigate('DropPin', {
			handleDropPin: (pickupLocation) => { this.setState({ pickupLocation, dropBorderWidth: 3, pickBorderWidth: 0 }) }
		});
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
		location = {
			fullAddress: 'Current Location',
			region: {
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			}
		};
		this.setState({ pickupLocation: location, pickBorderWidth: 3, dropBorderWidth: 0 });
	}


	render () {
		return (
			<KeyboardAwareScrollView contentContainerStyle={style.background} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} >
				<View style={style.submissionForm}>
					<Button warning small onPress={() => {this.props.navigation.navigate('MainScreen')} } style={style.backButton}><Text style={{fontSize: 15}}>Go Back</Text></Button>

					<ViewPhotos setScreenshotId={ (photoID) => {this.setState({ screenshot: photoID })} } />


					<FormLabel>Pickup Location</FormLabel>
					<View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
						<AwesomeButton backgroundShadow='green' backgroundColor='#2bb88a' backgroundDarker='#28c890' width={150} borderColor='green' borderWidth={this.state.pickBorderWidth} onPress={this.handleUseCurrentLocation}>Current Location</AwesomeButton>
						{/* <Text>  </Text> */}
						{/* <AwesomeButton width={150} backgroundShadow='green' backgroundColor='#2bb88a' backgroundDarker='#28c890' borderColor='green' borderWidth={this.state.dropBorderWidth} onPress={this.handleUseDropPin}>Drop a pin</AwesomeButton> */}
					</View>
					<GooglePickup pickUp={ (pickupLocation) => {this.setState({ pickupLocation, dropBorderWidth: 0, pickBorderWidth: 0 });} } style={{marginBottom: 90}} myPlaceHolder={this.state.pickupLocation.fullAddress} />


					<FormLabel>Drop off Location</FormLabel>
					<GoogleDropoff dropOff={ (dropoffLocation) => {this.setState({ dropoffLocation });} } />


					<Text style={{flexDirection: 'row'}}>Your offer: {this.state.offer} $      Pickup Time: {`${this.state.pickupTime} minutes`}</Text>
					<View style={style.pickerRow}>
						{ this.state.showPricePicker
							?	<Picker
									style={style.picker}
									selectedValue={this.state.offer}
									pickerData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']}
									onValueChange={pickupPrice => this.setState({ offer: pickupPrice, showPricePicker: false })}
									itemSpace={30} // this only support in android
								/>
							:	<Button
									style={{ backgroundColor: '#36c6ac' }}
									onPress={() => this.setState({ showPricePicker: true })}
								><Text style={style.buttonText} >{this.state.offer} dollars</Text></Button>
						}


						{this.state.showMinutePicker
							?	<Picker
									style={style.picker}
									selectedValue={this.state.pickupTime}
									pickerData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']}
									onValueChange={pickupTime => this.setState({ pickupTime, showMinutePicker: false })}
									itemSpace={30} // this only support in android
								/>
							:
								<Button
									style={{ backgroundColor: '#36c6ac' }}
									onPress={() => this.setState({ showMinutePicker: true })}
								><Text style={style.buttonText} >{`${this.state.pickupTime} minutes`}</Text></Button>
						}
					</View>


					<View style={style.buttonRows} >
						<Button rounded style={style.button} onPress={() => { this.handleSubmit("brx") }}><Text style={style.buttonText} >Bayride</Text></Button>
						<Button rounded style={style.button} onPress={() => { this.handleSubmit("brxl") }}><Text style={style.buttonText} >BayrideXL</Text></Button>
						<Button rounded style={style.button} onPress={() => { this.handleSubmit("brs") }}><Text style={style.buttonText} >Bayride Supreme </Text></Button>
					</View>
				</View>
			</KeyboardAwareScrollView>
		);
	}
}
