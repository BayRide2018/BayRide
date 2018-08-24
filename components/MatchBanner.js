import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../public/style';
import { store } from '../fire';
import TimerCountdown from 'react-native-timer-countdown';


export default class MatchBanner extends React.Component {

  state = {
    lotData: {},
    driverInfo: {}
  }

  componentDidMount = async () => {
    await store.collection("lots").doc(this.props.lotId).get().then(lot => {
      this.setState({ lotData: lot.data() });
    });
    store.collection("users").lot(this.state.lotData.driverId).get().then(driver => {
      this.setState({ driverInfo: driver.data() });
    });
  }

  render () {
    let { pickupTime } = this.state.lotData.pickupTime;
    pickupTime = pickupTime.toDate();
    const now = new Date().getTime();

    return (
      <View style={style.container}>
        <Text style={style.title}>Your Trip to {this.state.lotData.dropoffLocation}</Text>
        <View style={style.containerRow}>
        <Text style={style.title}>Current Price: $ {this.state.lotData.offer}</Text>
        {this.state.lotData.driverId
        ? <View>
            <Text>You are matched with: {this.state.driverInfo.name}</Text>
            <Text>Phone Number: {this.state.driverInfo.phone}</Text>
            <Text>{this.state.driverInfo.drivingInformation.info}</Text>
          </View>
        : <Text>No one has submitted a bid yet, but be patient</Text>
        }

          <TimerCountdown
            initialSecondsRemaining={pickupTime - now}
            onTimeElapsed={this.handleFinish}
            allowFontScaling={true}
            style={{ fontSize: 20 }}
          />
    
        </View>
      </View>
    )
  }
}
