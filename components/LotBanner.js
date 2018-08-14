import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import style from '../public/style';



const LotBanner = ({ }) => (
  <View style={style.container}>
    <View style={style.banner}>
    <Text style={style.font}>BayRide</Text>
      <Text style={style.font}>Pick Up: </Text>
      <Text style={style.font}>Location: </Text>
      <Text style={style.font}>Drop Off location: </Text>
      <Text style={style.font}>Bid Price: </Text>
      <Button style={style.menuButtonStyle}>Offer Lower Price</Button>
    </View>
  </View>
);

export default LotBanner;
