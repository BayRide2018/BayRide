import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/style';



const LotBanner = ({ navigation, pickupTime, pickupLocation, dropoffLocation, bidPrice, passengerId, driverId }) => (
  <View style={style.container}>
    <Text style={style.title}>BayRide</Text>
    <View style={style.containerRow}>
      <Text style={style.title}>Pick Up: {pickupTime}</Text>
      <Text style={style.title}>Location: {pickupLocation}</Text>
      <Text style={style.title}>Drop Off location: {pickupLocation}</Text>
      <Text style={style.title}>Bid Price: {bidPrice}</Text>
      <Button>Offer Lower Price</Button>
    </View>
  </View>
);

export default LotBanner;
