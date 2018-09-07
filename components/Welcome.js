import React from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/style';

const Welcome = ({ navigation }) => (
	<View style={style.container}>
			<Image source={require('../public/logo1.png')} style={{ marginTop: 150, height: 230, width: 230 }} />
		<View style={style.containerRow}>
			<Button style={style.welcomeButton} title="Sign Up" onPress={() => navigation.navigate('Signup')} />
			<Button style={style.welcomeButton} title="Login" onPress={() => navigation.navigate('Login')} />
		</View>
	</View>
);

export default Welcome;
