import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/style';

const Welcome = ({ navigation }) => (
	<View style={style.container}>
		<Text style={style.title}>BayRide</Text>
		<View style={style.containerRow}>
			<Button style={style.welcomeButton} title="Sign Up" onPress={() => navigation.navigate('Signup')} />
			<Button style={style.welcomeButton} title="Login" onPress={() => navigation.navigate('Login')} />
		</View>
	</View>
);

export default Welcome;
