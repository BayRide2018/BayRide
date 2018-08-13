import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { login } from '../fireMethods';
import style from '../public/style';


export default class Login extends Component {

	state = {
		email: '',
		password: '',
		response: ''
	};

	handleSubmit = async () => {
		const email = this.state.email;
		const password = this.state.password;
		const result = await login(email, password);
		if (result === true) {
			this.props.navigation.navigate('Menu');
		} else {
			this.setState({response: result})
		}
	}

	render() {

		return (
			<View>
				<Button title='Go Back' onPress={() => this.props.navigation.navigate('Welcome')} />
				<View style={style.button}>
					<FormLabel>E-mail</FormLabel>
					<FormInput placeholder="Please enter your email"
						onChangeText={email => this.setState({ email })}
					/>
					<FormLabel>Password</FormLabel>
					<FormInput placeholder="Please enter your password"
						onChangeText={password => this.setState({ password })}
					/>
					<View style={style.button}>
						<Text>{this.state.response}</Text>
						<Button
							title="Login"
							onPress={this.handleSubmit} />
					</View>
				</View>
			</View>
		);
	}
}

