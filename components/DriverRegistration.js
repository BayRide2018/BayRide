import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { store, auth } from '../fire';
import style from '../public/style';


export default class DriverRegistration extends Component {

	handleSubmit = async () => {
    await store.collection("users").doc(auth.currentUser.email).update({
      drivingInformation: { canDrive: true },
      currentlyPassenger: false
    })
    this.props.navigation.navigate('DriverHome');
  }

  handleBack = () => {
    this.props.navigation.navigate('MainScreen');
  }

  render() {
    return (
      <View>
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
