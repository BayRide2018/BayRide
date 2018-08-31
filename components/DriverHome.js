import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { store, auth } from '../fire';
import LotBannerWrapper from './LotBannerWrapper';
import Winner from './Winner';
import { Permissions, Location } from 'expo';

export default class DriverHome extends Component {

  state = {
    allLots: [],
    winner: false,
    winningInfo: null
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

    // This isn't exactly the right way to do this..
    // We can do both of these queries at the same time, but I don't think that we want to do the bottom one
    // I'll have to think about how we want to do this, though
    await store.collection('lots').where('driverId', '==', auth.currentUser.email).get().then(lots => {
      lots.forEach(lot => {
        this.setState( {winningInfo: lot.data(), winner: true} );
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
      </ScrollView>
    );
  }
}
