import React, { Component } from "react";
import { View } from "react-native";
import LotBanner from "./LotBanner";
import style from '../public/style';
import TimerCountdown from 'react-native-timer-countdown';

 
export default class LotBannerWrapper extends React.Component {

  handleFinish = () => {
    // Very Important
  }

  render () {
    return (
      <View>
        <TimerCountdown
            initialSecondsRemaining={1000*60}
            onTick={secondsRemaining => console.log('tick', secondsRemaining)}
            onTimeElapsed={this.handleFinish}
            allowFontScaling={true}
            style={{ fontSize: 20 }}
        />
        <LotBanner lotData={this.props.lotData} />
      </View>
    )
  }
}