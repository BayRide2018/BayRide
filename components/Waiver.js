import React, { Component } from 'react';
import { View } from 'react-native';
import { Button , Text } from 'native-base';
import style from '../public/style';

export default class Waiver extends Component {
  render () {
    return(
      <View style={style.background} >
        <Button title='Go Back' onPress={() => this.props.navigation.navigate('Welcome')} />
        <View>
            <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
            <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
            <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
            <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
            <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
            <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
            <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
            <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
            <Text>This is some filler text. Do you agree to be doing whatever, to not sue, and ride responsibly, and follow the rules of the road, and ....</Text>
          <View>
            <Button
              style={style.button}
              onPress={() => this.props.navigation.navigate('DrawerNavigator')}
              ><Text style={style.buttonText} >I agree</Text></Button>
          </View>
        </View>
      </View>
    );
  }
}
