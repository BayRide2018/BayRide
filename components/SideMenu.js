import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, Button} from 'react-native';
import { StackNavigator, SafeAreaView } from 'react-navigation';
// ^^^^ I haven't deleted these, because I think that we might want to include SafeAreaView in this, and in some other stuff
// ^^^^ I think that it helps get around the fact that the iPhone X is shaped oddly
import { store, auth } from '../fire';

class SideMenu extends Component {

	state = {};

	componentDidMount = () => {
		store.collection("users").doc(auth.currentUser.email).get().then(user => {
			this.setState({ ...user.data() })
		});
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
		return (
			<View style={styles.container}>
					<View style={styles.navItemStyle}>
						<Button title="Home" syle={styles.navItemStyle} onPress={this.handleHome} />

						<Button title="My Account" style={styles.navItemStyle} onPress={this.navigateToScreen('Account')} />

						{  this.state.currentlyPassenger
						? <Button title="Switch to Driver" style={styles.navItemStyle} onPress={this.state.drivingInformation.canDrive ? this.handleSwitchDriver : this.handleDriverRegistration} />
						: <Button title="Switch to Passenger" style={styles.navItemStyle} onPress={this.handleSwitchPassenger}/>
						}

						<Button title="Payment" style={styles.navItemStyle} onPress={this.navigateToScreen('Payment')} />

						<Button title="History" style={styles.navItemStyle} onPress={this.navigateToScreen('History')} />

						<Button title="Help" style={styles.navItemStyle} onPress={this.navigateToScreen('Help')} />

						<Button title="Log Out" style={styles.navItemStyle} onPress={this.handleLogout} />

					</View>
				<View style={styles.footerContainer}>
					<Text>Welcome to BayRide</Text>
				</View>
			</View>
		);
	}
}

SideMenu.propTypes = {
	navigation: PropTypes.object
};

const styles = StyleSheet.create({ // This needs to be moved to the global stylsheet
	container: {
		paddingTop: 20,
		flex: 1,
		backgroundColor: '#b0e0e6',
	},
	navItemStyle: {
		padding: 15
	},
	sectionHeadingStyle: {
		paddingVertical: 10,
		paddingHorizontal: 5
	},
	footerContainer: {
		flex: 1,
		backgroundColor: '#b0e0e6',
		justifyContent: 'flex-end',
		bottom: 20,
		alignItems: 'center'
	}
});

export default SideMenu;
