import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { store, auth } from '../fire';
import LotBannerWrapper from './LotBannerWrapper';
import { Permissions, Location } from 'expo';
import style from '../public/style';
import Icon from 'react-native-vector-icons/Octicons';


export default class DriverHome extends Component {

	state = {
		allLots: [],
		showWinnerAlert: false,
		location: '',
	}

	componentDidMount = async () => {
		// This will need to be trimmed down. IE, only show trips that are close
		// Later, we'll need to have it only show lots with a nearby starting point.
		// Much much later, we could worry about things like throttling and maybe more complicated sorting algos.
		this._getLocationAsync();

		/**
		 * ### Here, we need to get the lots from the specific city and load them up
		 * Note, the way that we find what the specific city is is by checking state (what is this.state.location)
		 * Also, !!! we need to update firestore. Set the driver's drivingInfo.logcation to whatever it is, so that we can send them notifications
		 */

		store.collection("lots").get().then(allLots => {
			allLots.forEach(lot => {
				this.setState({ allLots: [...this.state.allLots, { ...lot.data(), lotId: lot.id } ] })
			});
		});

		
		/**
		 * (1) When DriverHome renders, check to see if we're a winner, and if we are, take us to Winner.js (This happens below)
		 * (2) While DriverHome is open, if the winning Lot expires, it takes us to Winner.js (This happens in LotBannerWrapper)
		 */

		// (1) When DriverHome renders, check to see if we're a winner, and if we are, take us to Winner.js (This happens below)
		store.collection("users").doc(auth.currentUser.email).get().then(user => {
			this.setState({ showWinnerAlert: user.data().currentLot.inProgress });
		});
  }

	/**
	 * Do we need this??
	 * Do we use this??
	 * Is it even possible for a user to get to DriverHome without having allowed access to his location?
	 */
	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied',
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		this.setState({ location });
	};


	render () {
		return(
			<View style={style.background} >
				<Icon
					style={style.drawerIcon}
					name='three-bars'
					size={30}
					color='#000'
					onPress={() => this.props.navigation.toggleDrawer()}
				/>
				<ScrollView>
					<View>
						{this.state.allLots.map((lot, i) => {
							return <LotBannerWrapper key={i} lotData={lot} showWin={() => this.setState({ showWinnerAlert: true })} />;
						})}
						{/** This alert should only show if you have the app closed and then win, and then open it */}
						{this.state.showWinnerAlert ? Alert.alert(
							`You Won!!`,
							'Please click here to begin your trip',
							[
								{ text: 'Awesome!', onPress: () => { this.props.navigation.navigate('Winner'); console.log("Why doesn't this work??"); }, style: 'cancel' }
							],
							{ cancelable: false }
						) : null}
					</View>
				</ScrollView>
			</View>
		);
	}
}
