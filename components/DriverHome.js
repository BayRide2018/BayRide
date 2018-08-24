import React, { Component } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import firebase from 'firebase';
import { store, auth } from '../fire';
import LotBanner from './LotBanner';
import LotBannerWrapper from './LotBannerWrapper';
import Winner from './Winner';
import { Permissions, Location } from 'expo';

export default class DriverHome extends Component {

  state = {
    allLots: [],
    winner: true,
    winningInfo: null
  }

  async componentDidMount () {
    // This will need to be trimmed down. IE, only show trips that are close
    // Later, we'll need to have it only show lots with a nearby starting point.
    // We'll also need to have something that show's if they have a bid already in place (I think maybe that banner could be outlined in green).
    // Much much later, we could worry about things like throttling and maybe more complicated sorting algos.

    this._getLocationAsync();
    let id;



    store.collection("lots").get().then(allLots => {
      allLots.forEach(lot => {
        this.setState({ allLots: [...this.state.allLots, lot.data()] })
      })
    })

    const driverEmail = auth.currentUser.email;
		await store.collection('users').where('email',
			'==', driverEmail).get()
			.then(users => {
				users.forEach(user => {
					id = user.id;
				});
      });

      await store.collection('lots').where( 'driverId', '==', id ).get()
      .then(lots => {
        lots.forEach(lot => {
          this.setState( {winningInfo: lot.data()} );
          });
      });
  }

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

  render(){
    return(
      <ScrollView>
        <View>
          {this.state.allLots.map((lot, i) => {
            return <LotBannerWrapper key={i} lotData={lot} />;
          })}
            { this.state.winner ? <Winner winningInfo={this.state.winningInfo} /> : null }
        </View>
        <Button title='Drawer' onPress={() => {this.props.navigation.toggleDrawer();
        }} />
      </ScrollView>
    );
  }
}
