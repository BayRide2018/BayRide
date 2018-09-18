import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { store, auth } from '../fire';
import style from '../public/style';


export default class DriverRegistration extends Component {

	handleSubmit = async (carType) => {
    // Please test to see if this really needs to be awaited.. If it doesn't (the function still works) then it removing it will be a slightly better UX, I believe
    await store.collection("users").doc(auth.currentUser.email).update({
      drivingInformation: { canDrive: true, carType },
      currentlyPassenger: false
    })
    this.props.navigation.navigate('DriverHome');
  }

  handleBack = () => {
    this.props.navigation.navigate('MainScreen');
  }

  render () {
    const BayRideX = "brx";
    const BayRideXL = "brxl";
    const BayRideSupreme = "brs";
    return (
      <View style={style.background} >
        <Text>This is the sample driver registration page</Text>
        <Text>For now, just click the button, and you'll be registered as a driver!</Text>
        <Text>Later, registration will be a more formal process, with real requirements</Text>
        <Button title="Sign up to Drive BayRide" onPress={() => { this.handleSubmit(BayRideX) } } />
        <Button title="Sign up to Drive BayRideXL" onPress={() => { this.handleSubmit(BayRideXL) } } />
        <Button title="Sign up to Drive BayRide Supreme" onPress={() => { this.handleSubmit(BayRideSupreme) } } />
        <Button style={style.backButton} title='Go Back' onPress={this.handleBack} />
      </View>
    );
  }
}
