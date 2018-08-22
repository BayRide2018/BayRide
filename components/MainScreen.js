import React, { Component } from 'react';
import { MapView, Location, Permissions } from 'expo';
import {  StyleSheet, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { store, auth } from '../fire';
import { Marker } from 'react-native-maps';
import { firebase } from '@firebase/app';


class MainScreen extends Component {

  state = {
    location: null,
    errorMessage: null,
    marker: { latitude: null, longitude: null },
		showLot: false,
		showBid: false,
		offer: '',
		driverId: ''
  }

	async componentDidMount() {
		let driver = '';
		let id;

		const passengerEmail = auth.currentUser.email;
		await store.collection('users').where('email',
		'==', passengerEmail).get()
		.then(users => {
			users.forEach(user => {
				id = user.id;
			});
		});
		this._getLocationAsync();
		await store.collection('lots').onSnapshot( allLots => {

      allLots.docChanges().forEach(lot => {
						driver = lot.doc.data().driverId;
						//Not sure if needs another if statement but bid info should not changed unless its another bid
						if (lot.doc.data().passengerId === id && lot.doc.data().driverId !== null) {
							this.setState({showBid: true, offer: lot.doc.data().offer, driverId: driver });
						}
      });
		});
		console.log(">>>>>>>>>", this.state)
	}


	///////////
	/**
	 * 0. I left most of the old parkupied code in as comments. Most of it's just logic that we don't want
	 * 		anymore, but it's so convoluted that I couldn't tell if it was important or not
	 * 1. Is there a reason that we don't simply get current user, and set it's state location to location?
	 * 		It seems that the location param is the location of the user.. Is that correct?
	 * 2. Again, what is movingLocation vs. location?
	 * 3. For that matter, what is 'origin'? It's just a string version of the location..
	 * 4. What's the difference (or at least difference in purpose) between onRegionChangeComplete and _getLocationAsync?
	 */
	onRegionChangeComplete = async (location) => {
		// Is there a reason that origin is set to a string??
    let origin = `${location.latitude}, ${location.longitude}`;
		// if (!this.state.showFinalAlert && !this.state.showMatch && !this.state.showNoPSAlert) 
		this.setState({ movinglocation: origin });

    // let matchingEmail = '';
    let myLocation = '';
    await store.collection('users').where('email', '==', auth.currentUser.email).get().then(allUsers => {
      allUsers.forEach(user => {
        const id = user.id;
        //Updates your data with matched user email
        // if (user.data().matches.email) matchingEmail = user.data().matches.email;
        // myLocation = user.data().location;
        store.collection('users').doc(id).update({ location: this.state.movinglocation })
      })
    })
  //   if (matchingEmail) {
  //     store.collection('users').where('email', '==', matchingEmail).get().then(allUsers => {
  //       allUsers.forEach(user => {
  //         const id = user.id;
  //         //Updates your data with matched user email
  //         firestore.collection('users').doc(id).update({ matches: { email: authcurrentUser.email, location: myLocation } })
  //       })
  //     })
	// 	}
	}
	///////////


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

  handleSubmit = async () => {
		this.props.navigation.navigate('LotSubmissionForm');
	}

	handleMatch = async () => {
		this.setState({showBid: false});
	}

	handleCancel = async () => {
		this.setState({showBid: false});
	}

  render() {
		const { marker, showBid, driverId, offer} = this.state;
		console.log(">>>>>>>>>", this.state)

    return(
      <View style={styles.container}>
			<MapView
			  style={styles.map}
        onRegionChangeComplete={this.onRegionChangeComplete}
        showsUserLocation={true}
        followsUserLocation={true}>
        {marker.latitude ? <Marker
          coordinate={marker}
        /> : null}
			></MapView>

					{/** We can't do these alerts won't work as they are. I believe the problem is that the component is re-rendering
								frequently, and every time it does, a new alert is sent.*/}
					{showBid ? Alert.alert(
						`New Bid! ${driverId} has bid ${offer}!`,
						'Sound Good?',
						[
							{ text: 'Yes!', onPress: () => this.handleMatch(), style: 'cancel' },
							{ text: 'Cancel', onPress: () => this.handleCancel(), style: 'cancel' }
						],
						{ cancelable: false }
					) : Alert.alert('Awaiting bids!', 'Please be patient!')}

			<Button
						title="Where to?"
						style={styles.button}
						backgroundColor='white'
						color='grey'
						onPress={this.handleSubmit} />

		</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    flex: 1
	},
	lot: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'black'
	},

	scrollview: {
		alignItems: 'center',
	},

	map: {
		zIndex: -1,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
	},

	button: {
		zIndex: 10,
		top: 70
	}
});

export default MainScreen;
