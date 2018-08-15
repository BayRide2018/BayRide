import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import style from '../public/style';
import firestore from '../firestore';

export default class MatchBanner extends React.Component {

  // props is just the lot information from firestore
  // so it has driverId, dropoffLocation, offer, passengerId, pickupLocation, pickupTime, screenshot
  state = { ...this.props.matchData, 
    driverName: '',
    driverPhone: ''
    // We will need to get stuff from the driving credentials field
  };

  componentDidMount () {
    firestore.collection("users").doc(this.state.driverId).get().then(doc => {
      if (doc.exists) {
        driverName = doc.data().name;
        driverPhone = doc.data().phone;
      }
    })
  }

  render () {
    return (
      <View>
        <Text>Your requested trip</Text>
        {this.state.driverId 
          ? <View>
              <Text>You are currently matched with:</Text>       
              <Text>{this.state.driverName}</Text>
              <Text>Phone Number: {this.state.driverPhone}</Text>
              <Text>They are offering ${this.state.offer} for this trip</Text>
              <Text>Here is where the car information etc. can go</Text>
            </View> 
          : <View>
            <Text>You aren't currently matched with anyone</Text>
            <Text>You're asking for ${this.state.offer} for this trip</Text>
            </View>
        }
        <Text>Time until pickup: {this.state.pickupTime}</Text>
        <Text>pickup location: {this.state.dropoffLocation}</Text>
      </View>
    );
  }

}