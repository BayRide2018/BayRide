import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/style';



const MatchBanner = ({ navigation, name, phoneNumber, dropoffLocation, pickupTime }) => (
  <View style={style.container}>
    <Text style={style.title}>BayRide</Text>
    <View style={style.containerRow}>
     <Text style={style.title}>Name {name}</Text>
     <Text style={style.title}>Pickup Time: {pickupTime}</Text>

      <Text style={style.title}>Phone number: {phoneNumber}</Text>
      <Text style={style.title}>Drop Off location: {dropoffLocation}</Text>

    </View>
  </View>
);

export default MatchBanner;
