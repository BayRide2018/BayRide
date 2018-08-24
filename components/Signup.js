import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import style from '../public/style';
import { signup } from '../fireMethods';

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
					<FormLabel>Full Name</FormLabel>
					<FormInput placeholder="Please enter your full name"
						onChangeText={name => this.setState({ name })}
					/>
					<FormLabel>Phone Number</FormLabel>
					<FormInput placeholder="Please enter your phone number"
						onChangeText={phone => this.setState({ phone })}
					/>
					<FormLabel>E-mail</FormLabel>
					<FormInput placeholder="Please enter your email"
						onChangeText={email => this.setState({ email })}
					/>
					<FormLabel>Password</FormLabel>
					<FormInput placeholder="Please enter your password"
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
