import React, { Component } from "react";
import { View, Text } from "react-native";
import LotBanner from "./LotBanner";
import style from '../public/style';
import TimerCountdown from 'react-native-timer-countdown';


export default class LotBannerWrapper extends React.Component {

  state = {
    showThisBanner: true
  }

  handleFinish = () => {
    // Very Important Whatever happens here...
    // Send a notification to the Passenger (they can adjust the bid [add time or lower price] or just have it deleted)
    // and hide this for now
    this.setState({ showThisBanner: false })
  }

  render () {
    return (
      <View>
        {this.state.showThisBanner
        ? <View>
            <TimerCountdown
              initialSecondsRemaining={1000*60}
              onTick={secondsRemaining => console.log('tick', secondsRemaining)}
              onTimeElapsed={this.handleFinish}
              allowFontScaling={true}
              style={{ fontSize: 20 }}
            />
            <LotBanner lotData={this.props.lotData} />
          </View>
        : null}
      </View>
    )
  }
}
