import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Button, Text, CameraRoll } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { signup } from '../fireMethods';
import firestore from '../firestore';
import firebase from 'firebase';
import style from '../public/style';



export default class LotSubmissionForm extends Component {

  // This thing still needs to navigate back to the home
  // Also, consider moving the creation to the firemethods

	state = {
		screenshot: '',
		pickupTime: '',
		pickupLocation: '',
		dropoffLocation: '',
		offer: 0,
		passengerId: '',
		driverId: ''
	};

	handleSubmit = async () => {
		const screenshot = this.state.screenshot;
		const pickupTime = this.state.pickupTime;
		const pickupLocation = this.state.pickupLocation;
		const dropoffLocation = this.state.dropoffLocation;
		const offer = this.state.offer;
		const passengerId = this.state.passengerId;

    firestore.collection("lots").add({
      screenshot,
      pickupTime,
      pickupLocation,
      dropoffLocation,
      offer,
      passengerId,
      driverId: null
    });

		// if (typeof result === 'string') {
		// 	this.setState({ response: result });
		// } else {
		// 	this.props.navigation.navigate('Menu');
		// }
  }

  render () {
    return (
      <View>
      <Button style={style.backButton} title='Go Back' onPress={() => this.props.navigation.navigate('Welcome')} />
      <ScrollView style={style.button}>
        <FormLabel>Screenshot</FormLabel>
        <FormInput placeholder="Please enter your screenshot (this will need to be changed)"
          onChangeText={screenshot => this.setState({ screenshot })}
        />
        <FormLabel>Pickup Time</FormLabel>
        <FormInput placeholder="Please enter your pickup time:"
          onChangeText={pickupTime => this.setState({ pickupTime })}
        />
        <FormLabel>Pickup Location</FormLabel>
        <FormInput placeholder="Please enter your pickup location"
          onChangeText={pickupLocation => this.setState({ pickupLocation })}
        />
        <FormLabel>Drop off Location</FormLabel>
        <FormInput placeholder="Please enter your drop off location"
          onChangeText={dropoffLocation => this.setState({ dropoffLocation })}
        />
        <FormLabel>Offer</FormLabel>
        <FormInput placeholder="Please enter the starting bid"
          onChangeText={offer => this.setState({ offer })}
        />
        <View style={style.button}>
          <Button
            title="Submit"
            onPress={this.handleSubmit}
          />
        </View>
      </ScrollView>
      </View>
    );
  }
}
