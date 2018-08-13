import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

var config = {
	apiKey: 'AIzaSyCU1BZSUnS5vlJUbK_SMcO8xuQpMXvGtWE',
	authDomain: 'bayride-213215.firebaseapp.com',
	databaseURL: 'https://bayride-213215.firebaseio.com',
	projectId: 'bayride-213215',
	storageBucket: 'bayride-213215.appspot.com',
	messagingSenderId: '1020951671508'
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {
	timestampsInSnapshots: true
};
firestore.settings(settings);

export default class App extends React.Component {

	componentDidMount() {
		firestore.collection('users').doc('9zwc25dRf8TT0DhrekDb').set({
			firstName: 'white'
		});
		firestore.collection('users').doc('9zwc25dRf8TT0DhrekDb').get()
			.then(users => {
				console.log('USERSSS', users.data());
			})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<Text>Changes you make will automatically reload.</Text>
				<Text>Shake your phone to open the developer menu.</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
