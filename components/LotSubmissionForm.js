import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Button, Text, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Location } from 'expo';
import { signup } from '../fireMethods';
import { store } from '../fire';
import firebase from 'firebase';
import style from '../public/style';
import { Picker, DatePicker } from 'react-native-wheel-pick';
import ViewPhotos from './ViewPhotos';
import GooglePlacesInput from './GooglePlacesInput';
import { createLot } from '../fireMethods';

export default class LotSubmissionForm extends Component {

	// This thing still needs to navigate back to the home
	// Also, consider moving the creation to the firemethods

	state = {
		screenshot: '',
		pickupLocation: '',
		dropoffLocation: '',
		offer: 0,
		passengerId: '',
		driverId: '',
		showMinutePicker: false,
		pickupTime: 'Pick up time in',
		location: null
  }

	async componentDidMount() {

			const passengerEmail = await firebase.auth().currentUser.email;
			await store.collection('users').where('email', '==', passengerEmail).get()
			.then(users => {
				users.forEach(user => {
					this.setState({passengerId: user.id});
				});
			});
	}

	handleSubmit = () => {
		createLot(this.state.screenshot,
			this.state.pickupTime,
			this.state.pickupLocation,
			this.state.dropoffLocation,
			this.state.offer);
			this.props.navigation.navigate('DrawerNavigator');

		// store.collection("lots").add({
		// 	screenshot,
		// 	pickupTime,
		// 	pickupLocation,
		// 	dropoffLocation,
		// 	offer,
		// 	passengerId,
		// 	driverId: null
		// });
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
		this.setState({ pickupLocation: location });
	}

	setScreenshotId =  (photoID) => {
		this.setState({ screenshot: photoID });
	}

	handleBack = async () => {
		this.props.navigation.navigate('DrawerNavigator');
	}


	render() {
		return (
			<View style={{ alignItems: 'center', flex: 1 }}>

				<View style={style.button}>
				{this.state.showMinutePicker ?  <Picker
					style={{ backgroundColor: 'white', width: 300, height: 215 }}
					selectedValue='4'
					pickerData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']}
					onValueChange={pickupTime => this.setState({ pickupTime, showMinutePicker: false })}
					itemSpace={30} // this only support in android
				/> :  <Button
				title={`${this.state.pickupTime} minutes`}
				onPress={() => this.setState({ showMinutePicker: true })}
			/> }
					<FormLabel>Screenshot</FormLabel>

						<ViewPhotos setScreenshotId={this.setScreenshotId} passengerId={this.state.passengerId} />

					<FormLabel>Pickup Location</FormLabel>
					<GooglePlacesInput />
					<Button title="Use my current location for pick up" onPress={this.handleUseCurrentLocation} />
					<FormLabel>Drop off Location</FormLabel>
					<FormInput
					placeholder="Please enter drop off location"
						onChangeText={dropoffLocation => this.setState({ dropoffLocation })}
					/>
					<FormLabel>Offer</FormLabel>
					<FormInput
					 placeholder="Please enter starting bid"
						onChangeText={offer => this.setState({ offer })}
					/>


									{this.state.showPicker ?  <Picker
					style={{ backgroundColor: 'white', width: 300, height: 215 }}
					selectedValue='4'
					pickerData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']}
					onValueChange={pickupTime => this.setState({ pickupTime, showPicker: false })}
					itemSpace={30} // this only support in android
				/> :  <Button
				title={`${this.state.pickupTime} minutes`}
				onPress={() => this.setState({ showPicker: true })}
			/> }


					<View style={style.button}>
						<Button
							title="Submit"
							onPress={this.handleSubmit}
						/>

						<Button style={style.backButton} title='Go Back' onPress={this.handleBack} />
					</View>
				</View>
			</View>
		);
	}
}
