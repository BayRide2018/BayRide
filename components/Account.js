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
		id: '', // This is here for when we want to add an edit button later ..... don't know if we need this?
		editName: false,
		editPhone: false,
		editEmail: false,
		editPassword: false,
		showAlert: false,
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


	render () {
		return (
			<View style={style.background} >
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
				:	<View style={style.singleLine} >
						<Text>Name: {this.state.user.name}</Text><Button rounded info onPress={() => this.setState({editName: true})}><Text>Edit</Text></Button>
					</View>
				}
				<View style={style.horizontalRule} />

				{this.state.editPhone
				?	<View>
						<TextField label="Phone" placeholder={this.state.user.phone}
							onChangeText={phone => this.setState({ user: { ...this.state.user, phone: phone } })}
						/>
						<Button rounded info onPress={() => { this.handleSubmit(); this.setState({ editPhone: false }); }} ><Text>Save Changes</Text></Button>
					</View>
				:	<View style={style.singleLine} >
						<Text>Phone: {this.state.user.phone}</Text><Button rounded info onPress={() => this.setState({editPhone: true})}><Text>Edit</Text></Button>
					</View>
				}
				<View style={style.horizontalRule} />

				{this.state.editEmail
				?	<View>
						<TextField label="Email" placeholder={this.state.user.email}
							onChangeText={email => this.setState({ user: { ...this.state.user, email: email } })}
						/>
						<Button rounded info onPress={() => { this.handleSubmit(); this.setState({ editEmail: false }); }} ><Text>Save Changes</Text></Button>
					</View>
				:	<View style={style.singleLine} >
						<Text>Email: {this.state.user.email}</Text><Button rounded info onPress={() => this.setState({editEmail: true})}><Text>Edit</Text></Button>
					</View>
				}
				<View style={style.horizontalRule} />

				{this.state.user.drivingInformation && this.state.user.drivingInformation.canDrive
				?	<View style={style.center} >
						<Text>You can drive!! Nice work!</Text>
						<Text style={{ textAlign: 'center' }} >Here's where the information about your car, etc, will go!</Text>
					</View>
				: 	<View style={style.center} >
						<Text>Sign up to drive and start earning!!</Text>
						<Text>BayRide puts the control back in the hands of the drivers.</Text><Button rounded info onPress={() => {
							// Please note: we can assume that the user, right here, is a Passenger, and not a driver, because canDrive is false
							if (this.state.user.currentLot.lotId) { // the user has a lot currently open
								this.setState({ showAlert: true })
							} else { // The user does not have a lot currently open
								this.props.navigation.navigate('DriverRegistration')
							}
						}}><Text>Sign Up to drive</Text></Button>
					</View>
				}
				{this.state.showAlert
				?	Alert.alert(
						"Can't switch to Driver",
						"You can't become a driver while you are looking for a ride. Try signing up once you finish your trip",
						[
							{ text: 'OK', onPress: () => this.setState({ showAlert: false }), style: 'cancel' }
						],
						{ cancelable: false }
					)
				:	null}
				<View style={style.horizontalRule} />

				<View style={style.center} >
					<Button rounded info onPress={() => {this.props.navigation.navigate('History')} }>
						<Text>History</Text>
					</Button>
				</View>


			</View>
		);
	}
}
