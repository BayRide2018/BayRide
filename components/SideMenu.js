import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet, Button} from 'react-native';
import { StackNavigator, SafeAreaView } from 'react-navigation';
import { store, auth } from '../fire';

class SideMenu extends Component {

	state = {};

	componentDidMount = () => {
		store.collection("users").where("email", "==", auth.currentUser.email).get().then(users => {
			users.forEach(user => {
				this.setState({ ...user.data() })
			});
		});
	}

	handleLogout = async () => {
		await auth.signOut();
		this.navigateToScreen('Welcome')();
	}

	handleSwitchDriver = async () => {
		const userEmail = await auth.currentUser.email;
		let userId;
		await store.collection("users").where("email", "==", userEmail).get().then(users => {
			users.forEach(user => {
				userId = user.id;
			});
		});
		await store.collection("users").doc(userId).update({
			currentlyPassenger: false
		});
		this.navigateToScreen('DriverHome')();
		this.componentDidMount();
	}

	handleSwitchPassenger = async () => {
		const userEmail = await auth.currentUser.email;
		let userId;
		await store.collection("users").where("email", "==", userEmail).get().then(users => {
			users.forEach(user => {
				userId = user.id;
			});
		});
		await store.collection("users").doc(userId).update({
			currentlyPassenger: true
		});
		this.navigateToScreen('MainScreen')();
		this.componentDidMount();
	}

	navigateToScreen = (route) => () => {
		const navigateAction = NavigationActions.navigate({
			routeName: route
		});
		this.props.navigation.dispatch(navigateAction);
	}

	render () {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.navSectionStyle}>
						<Text style={styles.navItemStyle} onPress={this.navigateToScreen('Account')}>
							My Account
						</Text>
						{this.state.currentlyPassenger ? <Button title='Switch to Driver' onPress={this.state.drivingInformation.canDrive ? this.handleSwitchDriver : this.navigateToScreen('DriverRegistration')} /> : <Button title='Switch to Passenger' onPress={this.handleSwitchPassenger} /> }

						<Text style={styles.navItemStyle} onPress={this.navigateToScreen('Payment')}>
							Payments
						</Text>
						<Text style={styles.navItemStyle} onPress={this.handleLogout}>
							Log Out
						</Text>
					</View>
				</ScrollView>
				<View style={styles.footerContainer}>
					<Text>This. is. parkupied.</Text>
				</View>
			</View>
		);
	}
}

SideMenu.propTypes = {
	navigation: PropTypes.object
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		flex: 1
	},
	navItemStyle: {
		padding: 10
	},
	navSectionStyle: {
		backgroundColor: 'lightgrey'
	},
	sectionHeadingStyle: {
		paddingVertical: 10,
		paddingHorizontal: 5
	},
	footerContainer: {
		padding: 20,
		backgroundColor: 'lightgrey'
	}
});

export default SideMenu;
