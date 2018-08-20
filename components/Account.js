import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { store, auth } from '../fire';
import firebase from 'firebase';



export default class Account extends Component {

	state = {
        name: '',
		email: '',
		password: '',
        phone: '',
        defaultSetting: '',
        paymentInformation: {}, // I think that these two will be editable somewhere else.. There will be other forms that it 
        drivingInformation: {}, // Takes them to.. The other tabs in the drawer
        id: '' // This is here for when we want to add an edit button later
    };
    
    componentDidMount () {
        store.collection("users").where("email", "==", auth.currentUser.email).get()
        .then(users => {
            users.forEach(user => {
                this.setState({name: user.data().name, email: user.data().email, password: user.data().password, phone: user.data().phone, defaultSetting: user.data().defaultSetting , paymentInformation: user.data().paymentInformation, drivingInformation: user.data().drivingInformation, id: user.id})
            })
        })
    }

	handleSubmit = async () => {
        console.log("This is where the edits should happen. (Nothing happens yet).")
	}

	render() {
        const { name, email, password, phone, defaultSetting, paymentInformation, drivingInformation, id } = this.state;
		return (
			<View>
                <Text>This is your profile!!</Text>
                <Text>Name: </Text>
                <Text>{name}</Text>
                <Text>email: </Text>
                <Text>{email}</Text>
                <Text>password: </Text> /** We'll want something nice here, like have it not show the password. Also editing some of this stuff will be tricky */
                <Text>{password}</Text>
                <Text>Phone number: </Text>
                <Text>{phone}</Text>
                <Text>defaultSetting: </Text>
                <Text>{defaultSetting}</Text>
                <Text>id: </Text>
                <Text>{id}</Text>
                <Text>paymentInformation: </Text>
                <Text>drivingInformation: (these are empty on purpose for now)</Text>
                <Button title="Edit" onPress={this.handleSubmit} />
			</View>
		);
	}
}

