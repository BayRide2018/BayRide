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
	}

	async componentDidMount () {
		// This will need to be trimmed down. IE, only show trips that are close
		// Later, we'll need to have it only show lots with a nearby starting point.
		// We'll also need to have something that show's if they have a bid already in place (I think maybe that banner could be outlined in green).
		// Much much later, we could worry about things like throttling and maybe more complicated sorting algos.
		this._getLocationAsync();

		store.collection("lots").get().then(allLots => {
			allLots.forEach(lot => {
				this.setState({ allLots: [...this.state.allLots, { ...lot.data(), lotId: lot.id } ] })
			});
		});

    let myCurrentLotId;
    store.collection("users").doc(auth.currentUser.email).get().then(user => {

      myCurrentLotId = user.data().currentLot.lotId;
    })
    /**
     * So what this means is that Winning can only happen if the component mounts
     */
		// Also, we can make do this better by simply checking if `myCurrentlotId` exists in lot_history.. If it does, then winner
		// OR REALLY, can't we just navigate there when a lot expires...
		/**
		 * Actually, we should do both..
		 * (1) When DriverHome renders, check to see if we're a winner, and if we are, take us to Winner.js (This happens below)
		 * (2) While DriverHome is open, if the winning Lot expires, it takes us to Winner.js (This happens in LotBannerWrapper)
		 */

    await store.collection('lot_history').where('driverId', '==', auth.currentUser.email).get().then(lots => {
      lots.forEach(lot => { // Please note: linear queries, such as this one, are bad
        if (lot.id === myCurrentLotId) {
          this.setState({ winningId: lot.id });
        }
      });
    });

		// (1)
		// It seems that we need to check if the current user's currentLot is in lot_history (in which case they are a winner) or just in lots (in which case they are not)
		if (myCurrentLotId) {
			store.collection("lot_history").doc(myCurrentLotId).get().then(lot => {
				if (lot.exists) {
					this.setState({ showWinnerAlert: true });
				}
			});
		}
    // await store.collection('lot_history').where('driverId', '==', auth.currentUser.email).get().then(lots => {
    //   lots.forEach(lot => { // Please note: linear queries, such as this one, are bad.. Also, this one is just wrong
    //     if (lot.id === myCurrentLot) {
    //       this.setState({ showWinnerAlert: true });
    //     }
    //   });
    // });

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
							return <LotBannerWrapper key={i} lotData={lot} />;
						})}
						{/** This alert should only show if you have the app closed and then win, and then open it */}
						{this.state.showWinnerAlert ? Alert.alert(
							`You Won!!`,
							'Please click here to begin your trip',
							[
								{ text: 'Awesome!', onPress: () => { this.props.navigation.navigate('Winner') }, style: 'cancel' }
							],
							{ cancelable: false }
						) : null}
					</View>
				</ScrollView>
			</View>
		);
	}
}
