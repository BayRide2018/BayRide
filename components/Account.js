import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { store, auth } from '../fire';
import Icon from 'react-native-vector-icons/Octicons';
import style from '../public/style';



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
		store.collection("users").doc(auth.currentUser.email).get().then(user => {
			this.setState({name: user.data().name, email: user.data().email, password: user.data().password, phone: user.data().phone, defaultSetting: user.data().defaultSetting , paymentInformation: user.data().paymentInformation, drivingInformation: user.data().drivingInformation, id: user.id})
		})
	}

	handleSubmit = async () => {
		store.collection('users').doc(auth.currentUser.email).update({name: this.state.name,   phone: this.state.phone});
		// We probably want to add more fields for the user to edit but for now its fine
		this.props.navigation.navigate('MainScreen');
	}


	render() {
		const { name, email, password, phone, defaultSetting, paymentInformation, drivingInformation, id } = this.state;
		return (
			<View>
				<Text>This is your profile!!</Text>

				<Icon
					style={style.drawerIcon}
					name='three-bars' 
					size={30} 
					color='#000' 
					onPress={() => this.props.navigation.toggleDrawer()}
				/>

				<FormLabel>Name: </FormLabel>
				<FormInput placeholder={name} onChangeText={name => this.setState({name: name})}></FormInput>
				<FormLabel>Phone number: </FormLabel>
				<FormInput placeholder={phone} onChangeText={phone => this.setState({phone: phone})}></FormInput>
				<Button title="Save Changes" onPress={this.handleSubmit} />
			</View>
		);
	}
}

