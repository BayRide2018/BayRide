import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import firestore from '../firestore';
import LotBanner from './LotBanner';

export default class DriverHome extends Component {

  state = {
    allLots: []
  }

  componentDidMount () {
    // This will need to be trimmed down. IE, only show trips that are close

    // For now, let's just have it show all of the lots.
    // It will take all of the lots from the database, and then put them into LotBanners.
    // Later, we'll need to have it only show lots with a nearby starting point.
    // We'll also need to have something that show's if they have a bid already in place (I think maybe that banner could be outlined in green).
    // Much much later, we could worry about things like throttling and maybe more complicated sorting algos.

    firestore.collection("lots").get().then(allLots => {
      allLots.forEach(lot => {
        console.log(">>>>>>", lot.data());
        this.setState({ allLots: [...this.state.allLots, lot.data()] })
      })
    })
  }

  render(){
    return(
      <View>
        <Text>Hello, from DriverHome</Text>
        <View>
          {this.state.allLots.map((lot, i) => {
            return <LotBanner key={i} lotData={lot} />
          })}
        </View>
        <Text>Hello, from DriverHome</Text>
      </View>
    )
  }
}
