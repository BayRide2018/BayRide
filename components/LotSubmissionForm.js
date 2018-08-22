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
		showPicker: false,
		pickupTime: 'Pick up time in'
	}

	async componentDidMount() {

			const passengerEmail = await firebase.auth().currentUser.email;
			await store.collection('users').where('email', '==', passengerEmail).get().then(users => {
				users.forEach(user => {
					this.setState({passengerId: user.id});
				});
			});
	}

	handleSubmit = async () => {
		const screenshot = this.state.screenshot;
		const pickupTime = this.state.pickupTime;
		const pickupLocation = this.state.pickupLocation;
		const dropoffLocation = this.state.dropoffLocation;
		const offer = this.state.offer;
		const passengerId = this.state.passengerId;

		store.collection("lots").add({
			screenshot,
			pickupTime,
			pickupLocation,
			dropoffLocation,
			offer,
			passengerId,
			driverId: null
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
		this.setState({ pickupLocation: location })
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
				{this.state.showPicker ?  <Picker
					style={{ backgroundColor: 'white', width: 300, height: 215 }}
					selectedValue='4'
					pickerData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']}
					onValueChange={pickupTime => this.setState({ pickupTime, showPicker: false })}
					itemSpace={30} // this only support in android
				/> :  <Button
				title={`${this.state.pickupTime} minutes`}
				onPress={() => this.setState({ showPicker: true })}
			/> }
					<FormLabel>Screenshot</FormLabel>

						<ViewPhotos setScreenshotId={this.setScreenshotId} passengerId={this.state.passengerId} />
					<FormLabel>Pickup Time</FormLabel>
					<FormInput
						placeholder="Minutes"
						onChangeText={pickupTime => this.setState({ pickupTime })}
					/>
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
