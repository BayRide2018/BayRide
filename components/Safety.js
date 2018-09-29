import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import call from 'react-native-phone-call';
import Icon from 'react-native-vector-icons/Octicons';
import style from '../public/style';


export default class History extends Component {

	render () {
		return (
			<View style={style.background} >
                <Icon
                    style={style.drawerIcon}
                    name='three-bars' 
                    size={30} 
                    color='#000' 
                    onPress={() => this.props.navigation.toggleDrawer()}
                />

                <Text>This is the safety Component! Gnarly!</Text>
                <Text>Maybe here (but definitely somewhere) we can have some copy about how safe BayRide is.</Text>

                <Text>Call Emergency Services:</Text>
                <Button
                    onPress={() => { call({ number: '9174705378', prompt: true }).catch(console.error) }}>
                    <Text>911</Text>
                </Button>

                <Text>Transmit your Location:</Text>
                <Button
                    onPress={() => {}}>
                    <Text>Track</Text>
                </Button>

                <Text>Contact Stealth Air Corp:</Text>
                <Button
                    onPress={() => { WebBrowser.openBrowserAsync('http://stealthaircorp.com/') }}>
                    <Text>Drones</Text>
                </Button>

                <Text>Contact RJP Detectives:</Text>
                <Button
                    onPress={() => {}}>
                    <Text>Detectives</Text>
                </Button>
			</View>
		);
	}
}
