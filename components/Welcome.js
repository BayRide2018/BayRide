import React from 'react';
import { View, Image } from 'react-native';
import style from '../public/style';
import { Button, Text } from 'native-base';

const Welcome = ({ navigation }) => (
	<View style={style.logContainer}>
		<Image source={require('../public/images/logo1.png')} style={style.logo} />
		<View style={{flexDirection: 'row', alignSelf: 'center'}}>
			<Button full success onPress={() => navigation.navigate('Signup')}><Text style={style.buttonText} >Sign Up</Text></Button>
			<Button full onPress={() => navigation.navigate('Login')}><Text style={style.buttonText} >Login</Text></Button>
		</View>
	</View>
);

export default Welcome;
