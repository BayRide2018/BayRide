import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, Button, TouchableOpacity} from 'react-native';
import { StackNavigator, SafeAreaView } from 'react-navigation';
// ^^^^ I haven't deleted these, because I think that we might want to include SafeAreaView in this, and in some other stuff
// ^^^^ I think that it helps get around the fact that the iPhone X is shaped oddly
import { store, auth } from '../fire';
import style from '../public/style';


export default class SideMenu extends Component {

	state = {};
	 componentDidMount =  async () => {
		var unsubscribe =	await store.collection('users').doc(auth.currentUser.email).onSnapshot(user => {
			this.setState({ ...user.data() });
		})
	}

	componentWillUnmount = () => {
		this.unsubscribe();
	}

	handleHome = async () => {
		let currentlyPassenger;
		await store.collection("users").doc(auth.currentUser.email).get().then(user => {
			currentlyPassenger = user.data().currentlyPassenger;
		});
		if (currentlyPassenger) {
			this.navigateToScreen('MainScreen')();
		} else {
			this.navigateToScreen('DriverHome')();
		}
	}

	handleSwitchDriver = async () => {
		await store.collection("users").doc(auth.currentUser.email).update({
			currentlyPassenger: false
		});
		this.navigateToScreen('DriverHome')();
		this.componentDidMount();
	}

	handleDriverRegistration = async () => {
		this.navigateToScreen('DriverRegistration')();
		this.componentDidMount();
	}

	handleSwitchPassenger = async () => {
		await store.collection("users").doc(auth.currentUser.email).update({
			currentlyPassenger: true
		});
		this.navigateToScreen('MainScreen')();
		this.componentDidMount();
	}

	handleLogout = async () => {
		await auth.signOut();
		this.navigateToScreen('Welcome')();
	}

	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
	}

	render () {
		let switchButton =  this.state.currentlyPassenger
			? <Button title="Switch to Driver" style={style.navItemStyleSM} onPress={this.state.drivingInformation.canDrive ? this.handleSwitchDriver : this.handleDriverRegistration} />
			: <Button title="Switch to Passenger" style={style.navItemStyleSM} onPress={this.handleSwitchPassenger}/>;

		return (
			<View style={style.containerSM}>
					<View style={style.navItemStyleSM}>
						<Button title="Home" syle={style.navItemStyleSM} onPress={this.handleHome} />
						<Button title="My Account" style={style.navItemStyleSM} onPress={this.navigateToScreen('Account')} />
				{this.state.currentLot ? null : switchButton }
						<Button title="Payment" style={style.navItemStyleSM} onPress={this.navigateToScreen('Payment')} />

						<Button title="History" style={style.navItemStyleSM} onPress={this.navigateToScreen('History')} />

						<Button title="Help" style={style.navItemStyleSM} onPress={this.navigateToScreen('Help')} />

					{this.state.currentLot ? null : <Button title="Log Out" style={style.navItemStyleSM} onPress={this.handleLogout} /> }

					</View>
				<View style={style.footerContainerSM}>
					<Text>Welcome to BayRide</Text>
				</View>
			</View>
		);
	}
}

SideMenu.propTypes = {
	navigation: PropTypes.object
};
