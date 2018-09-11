import React from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/style';

const Welcome = ({ navigation }) => (
	<View style={style.logContainer}>
		<Image source={require('../public/logo1.png')} style={style.logo} />
		<View>
			<Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
			<Button title="Login" onPress={() => navigation.navigate('Login')} />
		</View>
	</View>
);

export default Welcome;
