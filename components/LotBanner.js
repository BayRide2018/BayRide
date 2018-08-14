import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/style';


export default class LotBanner extends React.Component {

  constructor (props) {
    super(props);
    this.state = props.lotData;
  }

  render () {
    return (
      <View>
        <Text>BayRide</Text>
        <View>
          <Text>Screenshot: {this.state.screenshot}</Text>
          <Text>Pick Up: {this.state.pickupTime}</Text>
          <Text>Location: {this.state.pickupLocation}</Text>
          <Text>Drop Off location: {this.state.pickupLocation}</Text>
          <Text>Bid Price: {this.state.offer}</Text>
          <Button title="Offer Lower Price" />
        </View>
      </View>
    )
  }
}
