import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { store, auth } from '../fire';
import Icon from 'react-native-vector-icons/Octicons';
import style from '../public/style';



export default class Account extends Component {

	state = {
		user: {},
		id: '', // This is here for when we want to add an edit button later
		editName: false,
		editPhone: false,
		editEmail: false,
		editPassword: false,
	};

	componentDidMount () {
		store.collection("users").doc(auth.currentUser.email).get().then(user => {
			this.setState({user: user.data(), id: user.id})
		})
	}

	handleSubmit = async () => {
		store.collection('users').doc(auth.currentUser.email).update({ ...this.state.user });
		// We probably want to add more fields for the user to edit but for now its fine
		// this.props.navigation.navigate('MainScreen');
	}


	render() {
		return (
			<View>
				<Icon
					style={style.drawerIcon}
					name='three-bars' 
					size={30} 
					color='#000' 
					onPress={() => this.props.navigation.toggleDrawer()}
				/>

				{this.state.editName
				?	<View>
						<TextField label="Name" placeholder={this.state.user.name}
							onChangeText={name => this.setState({ user: { ...this.state.user, name: name } })}
						/>
						<Button rounded info onPress={() => { this.handleSubmit(); this.setState({ editName: false }); }} ><Text>Save Changes</Text></Button>
					</View>
				:	<View>
						<Text>Name: {this.state.user.name}</Text><Button rounded info onPress={() => this.setState({editName: true})}><Text>Edit</Text></Button>
					</View>
				}
				<View style={style.horizontalRule} />

			</View>
		);
	}
}

