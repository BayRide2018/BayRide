import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import style from '../public/style';



const Waiver = ({ navigation }) => (
	<View>
    <Button title='Go Back' onPress={() => this.props.navigation.navigate('Welcome')} />
    <View style={style.button}>
        <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
        <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
        <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
        <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
        <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
        <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
        <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
        <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
        <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
      <View style={style.button}>
        <Button
          title="I agree"
          onPress={this.props.navigation.navigate('DrawerNavigator')} />
      </View>
    </View>
  </View>
);


export default Waiver;