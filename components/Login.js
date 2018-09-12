import React, { Component } from 'react';
import { View} from 'react-native';
import { Button , Text } from 'native-base';
import { login } from '../fireMethods';
import style from '../public/style';
import { store, auth } from '../fire';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';

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
		let bool;
		await store.collection("users").doc(auth.currentUser.email).get().then(user => {
			bool = user.data().currentlyPassenger;
		});
		if (result && bool) {
			this.props.navigation.navigate('MainScreen');
		} else if (result && !bool) {
			this.props.navigation.navigate('DriverHome');
		} else {
			this.setState({response: result});
		}
	}

	render() {

		return (
			<View>
			<Button warning small onPress={() => this.props.navigation.navigate('Welcome')} style={style.backButton}><Text style={{fontSize: 15}}>Go Back</Text></Button>
				<View style={style.signIn}>
					<TextField label="Email" placeholder="Please enter your email"
						onChangeText={email => this.setState({ email })}
					/>

					<PasswordInputText value={this.state.password} placeholder="Please enter your password"
						onChangeText={password => this.setState({ password })}
					/>
					<View>
						<Text>{this.state.response}</Text>
						<Button
							style={style.successButtons}
							title="Login"
							onPress={this.handleSubmit}><Text>Login</Text></Button>
					</View>
				</View>
			</View>
		);
	}
}

