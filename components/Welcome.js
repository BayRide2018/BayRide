import React from 'react';
import { View, Image } from 'react-native';
import style from '../public/style';
import { Button, Text } from 'native-base';

const Welcome = ({ navigation }) => (
	<View style={style.background} >
		<Image source={require('../public/images/logo1.png')} style={style.logo} />
		<View>
			<Button style={style.welcomeSignUp} onPress={() => navigation.navigate('Signup')}><Text style={style.welcomeSignUpText} >SIGN UP</Text></Button>
			<Button style={style.welcomeLogIn} onPress={() => navigation.navigate('Login')}><Text style={style.buttonText} >Login</Text></Button>
		</View>
	</View>
);

export default Welcome;
