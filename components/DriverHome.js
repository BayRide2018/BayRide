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
    // Later, we'll need to have it only show lots with a nearby starting point.
    // We'll also need to have something that show's if they have a bid already in place (I think maybe that banner could be outlined in green).
    // Much much later, we could worry about things like throttling and maybe more complicated sorting algos.

    firestore.collection("lots").get().then(allLots => {
      allLots.forEach(lot => {
        this.setState({ allLots: [...this.state.allLots, lot.data()] })
      })
    })
  }

  render(){
    return(
      <View>
        <Text>Hello, This is DriverHome</Text>
        <View>
          {this.state.allLots.map((lot, i) => {
            return <LotBanner key={i} lotData={lot} />
          })}
        </View>
        <Text>Hello, This was DriverHome</Text>
      </View>
    )
  }
}
