import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import style from '../public/style';


export default class Web extends Component {

	state = {}

	render () {
		return(
			<View style={style.webOuterView}>
				 <WebView source={{uri: 'https://github.com/BayRide2018/BayRide'}} style={style.webView} />
			</View>
		);
	}
}
