import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { View, TouchableOpacity} from 'react-native';
import { Button, Text} from 'native-base';
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
			? <Button full info style={style.navItemStyleSM} onPress={this.state.drivingInformation.canDrive ? this.handleSwitchDriver : this.handleDriverRegistration}><Text style={style.navItemTextSM} >SWITCH TO DRIVER</Text></Button>
			: <Button full info style={style.navItemStyleSM} onPress={this.handleSwitchPassenger}><Text style={style.navItemTextSM} >SWITCH TO PASSENGER</Text></Button>;

		return (
			<View style={style.containerSM}>
				<View>
					<Button full info style={style.navItemStyleSM} onPress={this.handleHome}><Text style={style.navItemTextSM} >HOME</Text></Button>
					<Button full info style={style.navItemStyleSM} onPress={this.navigateToScreen('Account')}><Text style={style.navItemTextSM} >MY ACCOUNT</Text></Button>
					{this.state.currentLot ? null : switchButton }
					<Button full info style={style.navItemStyleSM} onPress={this.navigateToScreen('Payment')}><Text style={style.navItemTextSM} >PAYMENT</Text></Button>

					<Button full info style={style.navItemStyleSM} onPress={this.navigateToScreen('History')}><Text style={style.navItemTextSM} >HISTORY</Text></Button>

					<Button full info style={style.navItemStyleSM} onPress={this.navigateToScreen('Safety')}><Text style={style.navItemTextSM} >SAFETY</Text></Button>

					<Button full info style={style.navItemStyleSM} onPress={this.navigateToScreen('Help')}><Text style={style.navItemTextSM} >HELP</Text></Button>

					{this.state.currentLot ? null : <Button full info style={style.navItemStyleSM} onPress={this.handleLogout}><Text style={style.navItemTextSM} >LOG OUT</Text></Button> }

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
