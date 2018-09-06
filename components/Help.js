import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import style from '../public/style';


export default class Help extends Component {

	state = {}

	render() {
		return(
			<View>
        <Icon
          style={style.drawerIcon}
          name='three-bars' 
          size={30} 
          color='#000' 
          onPress={() => this.props.navigation.toggleDrawer()}
        />

        <Text> Having trouble with your rides? </Text>
        <Text onPress={() => this.props.navigation.navigate('Web')}> Visit us here for help </Text>
			</View>
		);
	}
}
