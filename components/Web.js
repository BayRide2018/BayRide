import React, { Component } from 'react';
import { View, WebView } from 'react-native';

export default class Web extends Component {

	state = {}

	render() {
		return(
			<View>
				 <WebView source={{uri: 'https://github.com/BayRide2018/BayRide'}} />
			</View>
		);
	}
}
