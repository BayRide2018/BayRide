import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/style';
import firebase from 'firebase';
import firestore from '../firestore';


export default class LotBanner extends React.Component {

  // constructor (props) {
  //   super(props);
  //   this.state = props.lotData;
  // }
  state = this.props.lotData;

  handlePress = async () => { // All this function is doing for now is updating Firestore about who the driver is
    const driverEmail = await firebase.auth().currentUser.email;
    let driverId;
    await firestore.collection("users").where("email", "==", driverEmail).get().then(users => {
      users.forEach(user => {
        driverId = user.id;
      });
    });
    firestore.collection("lots").doc(this.state.id).update({
      driverId
    });
  }

  render () {
    console.log(this.state);
    const buttonTitle = this.state.driverId ? "Offer a lower price" : "Bid at this price!";
    return (
      <View>
        <Text>BayRide</Text>
        <View>
          <Text>Screenshot: {this.state.screenshot}</Text>
          <Text>Pick Up: {this.state.pickupTime}</Text>
          <Text>Location: {this.state.pickupLocation}</Text>
          <Text>Drop Off location: {this.state.pickupLocation}</Text>
          <Text>Bid Price: {this.state.offer}</Text>
          {!this.state.driverId && <Text>Be the first one to bid on this!!!</Text>}
          <Button title={buttonTitle} onPress={this.handlePress} />
        </View>
      </View>
    )
  }
}
