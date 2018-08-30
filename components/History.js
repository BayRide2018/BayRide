import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { store, auth } from '../fire';

export default class History extends Component {

	state = {
        name: '',
		email: ''
    };

    componentDidMount () {
        store.collection("users").doc(auth.currentUser.email).get()
        .then(user => {
            this.setState({ name: user.data().name, email: user.data().email })
        })
    }

	render() {
        const { name, email } = this.state;
		return (
			<View>
                <Text></Text>
                <Text>This is your passenger history!!</Text>
                <Text>You don't currently have any history, because you haven't been on any rides. Take a trip somewhere, and we'll show it here</Text>
                <Text></Text>
                <Text>This is your driver history!!</Text>
                <Text>You don't currently have any history, because you haven't driven anyone. Take someone out for a spin, and we'll show it here</Text>
                <Text>This is your profile!!</Text>
                <Text>Name: </Text>
                <Text>{name}</Text>
                <Text>email: </Text>
                <Text>{email}</Text>
			</View>
		);
	}
}

