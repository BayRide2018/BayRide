import React, { Component } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import style from '../public/style';
import { signup } from '../fireMethods';
import PasswordInputText from 'react-native-hide-show-password-input';
import {
	TextField
} from 'react-native-material-textfield';

export default class Signup extends Component {
	state = {
		name: '',
		phone: '',
		email: '',
		password: '',
	};

	handleSubmit = async () => {
		const name = this.state.name;
		const phone = this.state.phone;
		const email = this.state.email;
		const password = this.state.password;

		const result = await signup(name, phone, email, password);

		if (typeof result === 'string') {
			this.setState({ response: result });
		} else {
			this.props.navigation.navigate('Waiver');
		}
	}

	render() {

		return (
			<View>
				<Button style={style.backButton} title='Go Back' onPress={() => this.props.navigation.navigate('Welcome')} />
				<ScrollView style={style.button}>
					<TextField label='Full Name' placeholder="Please enter your full name"
						onChangeText={name => this.setState({ name })}
					/>

					<TextField label='Phone Number' placeholder="Please enter your phone number"
						onChangeText={phone => this.setState({ phone })}
					/>

					<TextField label='E-mail' placeholder="Please enter your email"
						onChangeText={email => this.setState({ email })}
					/>
					<PasswordInputText value={this.state.password} placeholder="Please enter your password"
						onChangeText={password => this.setState({ password })}
					/>
					<Text>{this.state.response}</Text>
					<View style={style.button}>
						<Button
							title="Signup"
							onPress={this.handleSubmit}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
}
