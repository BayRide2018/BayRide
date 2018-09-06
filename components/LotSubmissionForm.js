import React, { Component } from 'react';
import { View, Button, Text, ScrollView } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { Location } from 'expo';
import { store, auth } from '../fire';
import style from '../public/style';
import { Picker } from 'react-native-wheel-pick';
import ViewPhotos from './ViewPhotos';
import GooglePlacesInput from './GooglePlacesInput';
import { createLot } from '../fireMethods';


export default class LotSubmissionForm extends Component {

	state = { // This state should be reviewed by everyone to make sure that it isn't redundant, etc.
		screenshot: '',
		pickupLocation: '',
		dropoffLocation: {},
		offer: 0,
		passengerId: '',
		driverId: '',
		showMinutePicker: false,
		showOfferPicker: false,
		showPricePicker: false,
		pickupTime: 0,
		location: null,
		marker: null,
		hideButton: null
  }

	componentDidMount() {
		this.getProps();
		store.collection('users').doc(auth.currentUser.email).get().then(user => {
			this.setState({passengerId: user.id});
		});
	}

	getProps = () => {
		const { navigation } = this.props;
		const marker = navigation.getParam('marker', 'null');
		const handleHideButton = navigation.getParam('handleHideButton', 'null');
		this.setState({hideButton: handleHideButton});
		this.setState({marker});
	}

	handleSubmit = () => {
		createLot(this.state.screenshot,
			this.state.pickupTime,
			this.state.pickupLocation,
			this.state.dropoffLocation,
			this.state.offer);
			this.state.hideButton();
			this.props.navigation.navigate('MainScreen');
	}

	handleUseMarkerLocation = async () => {
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

	handleUseCurrentLocation = () => {
		this.setState({ pickupLocation: this.state.marker });
	}


	setScreenshotId =  (photoID) => {
		this.setState({ screenshot: photoID });
	}

	handleBack = () => {
		this.props.navigation.navigate('DrawerNavigator');
	}

	handleDropOff = (dropoffLocation) => {
		this.setState({dropoffLocation});
	}

	render() {
		console.log(this.state.dropoffLocation);
		return (
			<ScrollView contentContainerStyle={style.submissionForm}>

				<View style={style.submissionForm}>
				{this.state.showMinutePicker
				?	<Picker
						style={style.picker}
						selectedValue='4'
						pickerData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']}
						onValueChange={pickupTime => this.setState({ pickupTime, showMinutePicker: false })}
						itemSpace={30} // this only support in android
					/>
				: 	<View>
						<Text>Set pickup time</Text>
						<Button
							title={`${this.state.pickupTime} minutes`}
							onPress={() => this.setState({ showMinutePicker: true })}
						/>
					</View>
				}

					<ViewPhotos setScreenshotId={this.setScreenshotId} passengerId={this.state.passengerId} />

					<FormLabel>Pickup Location</FormLabel>
					// probably will be changing to GPI eventually
					<Button title="Use my current location for pick up" onPress={this.handleUseCurrentLocation} />
					<Button title="Use pin location for pick up" onPress={this.handleUseMarkerLocation} />

					<FormLabel>Drop off Location</FormLabel>
					<GooglePlacesInput dropOff={this.handleDropOff} />

					<FormLabel>Offer</FormLabel>
					<FormInput
						placeholder="Please enter starting bid"
						onChangeText={offer => this.setState({ offer })}
					/>


					{this.state.showPricePicker
						?  <Picker
							style={style.picker}
							selectedValue='4'
							pickerData={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']}
							onValueChange={pickupPrice => this.setState({ offer: pickupPrice, showPricePicker: false })}
							itemSpace={30} // this only support in android
						/> :  <Button
							title={`${this.state.offer} dollars`}
							onPress={() => this.setState({ showPricePicker: true })}
					/> }


					<View style={style.button}>
						<Button
							title="Submit"
							onPress={this.handleSubmit}
						/>

						<Button style={style.backButton} title='Go Back' onPress={this.handleBack} />
					</View>
				</View>
			</ScrollView>
		);
	}
}
