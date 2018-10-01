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
                        
                <View style={style.center} >

                    <Text>SAFETY</Text>

                    <View style={style.horizontalRule} />

                    <Text>BayRide is totally commited to providing the safest possible ride.</Text>
                    <Text>We never want you to be without the resources to help you in a emergency.</Text>

                    <Text>Call Emergency Services:</Text>
                    <Button
                        danger
                        outline
                        rounded
                        onPress={() => { call({ number: '9174705378', prompt: true }).catch(console.error) }}>
                        <Text>911</Text>
                    </Button>

                    <Text>Transmit your Location:</Text>
                    <Button
                        warning
                        rounded
                        onPress={() => {}}>
                        <Text>Track</Text>
                    </Button>

                    <Text>Contact Stealth Air Corp:</Text>
                    <Button
                        warning
                        rounded
                        onPress={() => { WebBrowser.openBrowserAsync('http://stealthaircorp.com/') }}>
                        <Text>On Air</Text>
                    </Button>

                    <Text>Contact Richard Blaise & Associates Investigators:</Text>
                    <Button
                        info
                        rounded
                        onPress={() => { WebBrowser.openBrowserAsync('http://www.richardblaise.com/') }}>
                        <Text>Detectives</Text>
                    </Button>

                </View>
			</View>
		);
	}
}
