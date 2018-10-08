import React, { Component } from 'react';
import { View, ScrollView, TextInput} from 'react-native';
import { Button, Text } from 'native-base';
import style from '../public/style';
import { signup } from '../fireMethods';
import PasswordInputText from 'react-native-hide-show-password-input';
import { TextField } from 'react-native-material-textfield';


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


	render () {
		return (
			<View style={style.background} >
				<Button warning small onPress={() => this.props.navigation.navigate('Welcome')} style={style.backButton}><Text style={{fontSize: 15}}>Go Back</Text></Button>
				<ScrollView style={style.signIn} >
					<TextField label='Full Name' placeholder="Please enter your full name"
						onChangeText={name => this.setState({ name })}
					/>

					<TextInput keyboardType={'numeric'} label='Phone Number' placeholder="Please enter your phone number"
						onChangeText={phone => this.setState({ phone })}
					/>

					<TextField label='E-mail' placeholder="Please enter your email"
						onChangeText={email => this.setState({ email })}
					/>
					<PasswordInputText value={this.state.password} placeholder="Please enter your password"
						onChangeText={password => this.setState({ password })}
					/>
					<Text>{this.state.response}</Text>
					<View>
						<Button
							style={style.signInButton}
							onPress={this.handleSubmit}
						><Text style={style.buttonText} >Signup</Text></Button>
					</View>
				</ScrollView>
			</View>
		);
	}
}
