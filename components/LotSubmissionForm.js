import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Button, Text, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { signup } from '../fireMethods';
import firestore from '../firestore';
import firebase from 'firebase';
import style from '../public/style';
import { Picker, DatePicker } from 'react-native-wheel-pick';
import ViewPhotos from './ViewPhotos';




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

  };

  handleSubmit = async () => {
    const screenshot = this.state.screenshot;
    const pickupTime = this.state.pickupTime;
    const pickupLocation = this.state.pickupLocation;
    const dropoffLocation = this.state.dropoffLocation;
    const offer = this.state.offer;
    const passengerId = this.state.passengerId;
  }
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
      driverId: null,
    });

    // if (typeof result === 'string') {
    // 	this.setState({ response: result });
    // } else {
    // 	this.props.navigation.navigate('Menu');
    // }
  }


  handleBack = async () => {
    this.props.navigation.navigate('PassengerHome');
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
          <FormInput
          placeholder="Please enter your screenshot"
            onChangeText={screenshot => this.setState({ screenshot })}
            />
            <ViewPhotos />
          <FormLabel>Pickup Time</FormLabel>
          <FormInput
            placeholder="Minutes"
            onChangeText={pickupTime => this.setState({ pickupTime })}
          />
          <FormLabel>Pickup Location</FormLabel>
          <FormInput
          placeholder="Please enter pickup location"
            onChangeText={pickupLocation => this.setState({ pickupLocation })}
          />
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
