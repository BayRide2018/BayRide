import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import style from '../public/style';


export default class Help extends Component {

	state = {}

	render() {
		return(
			<View style={{flex: 1}}>
        <Icon
          style={style.drawerIcon}
          name='three-bars' 
          size={30} 
          color='#000' 
          onPress={() => this.props.navigation.toggleDrawer()}
        />

        <Text style={{textAlign: 'center', top: 80, fontSize: 15}}> Having trouble with your rides? </Text>
        <Text style={{textAlign: 'center', top: 80, fontSize: 30}} onPress={() => this.props.navigation.navigate('Web')}> Visit us here for help </Text>
			</View>
		);
	}
}
