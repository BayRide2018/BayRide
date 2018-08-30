import React, { Component } from 'react';
import { View, WebView } from 'react-native';

export default class Web extends Component {

	state = {}

	render() {
		return(
			<View style={{flex: 1}}>
				 <WebView source={{uri: 'https://github.com/BayRide2018/BayRide'}} style={{marginTop: 20}} />
			</View>
		);
	}
}
