import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Button, Text, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { signup } from '../fireMethods';
import { store, auth } from '../fire';
import firebase from 'firebase';
import style from '../public/style';
import { Picker, DatePicker } from 'react-native-wheel-pick';
import ViewPhotos from './ViewPhotos';


export default class DriverRegistration extends Component {

	handleSubmit = async () => {

    const userEmail = await auth.currentUser.email;
    let userId;
    await store.collection("users").where("email", "==", userEmail).get().then(users => {
      users.forEach(user => {
        userId = user.id;
      })
    })
    await store.collection("users").doc(userId).update({
      drivingInformation: { canDrive: true },
      currentlyPassenger: false
    })
    this.props.navigation.navigate('DriverHome');
  }


  handleBack = async () => {
    this.props.navigation.navigate('PassengerHome');
  }

  render() {
    return (
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text>This is the sample driver registration page</Text>
        <Text>For now, just click the button, and you'll be registered as a driver!</Text>
        <Text>Later, registration will be a more formal process, with real requirements</Text>
        <View style={style.button}>
          <Button
            title="Sign up to Drive"
            onPress={this.handleSubmit}
          />
          <Button style={style.backButton} title='Go Back' onPress={this.handleBack} />
        </View>
      </View>
    );
  }
}
