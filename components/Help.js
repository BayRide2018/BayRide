import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import style from '../public/style';
import { WebBrowser } from 'expo';



export default class Help extends Component {

  state = {}

  /**
   * This was taken from Expo docs: https://docs.expo.io/versions/latest/workflow/linking
   * This is so that you know how we want to be pulling our website from the App
   */

  _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync('https://expo.io');
  }

	render () {
		return(
			<View style={style.background} >
        <Icon
          style={style.drawerIcon}
          name='three-bars'
          size={30}
          color='#000'
          onPress={() => this.props.navigation.toggleDrawer()}
        />

        <Text> Having trouble with your rides? </Text>
        <Text onPress={() => this.props.navigation.navigate('Web')}> Visit us here for help... This is using WebView from React Native</Text>

        <Button
          title="Open URL with Expo.WebBrowser"
          onPress={this._handleOpenWithWebBrowser}
          style={style.button}
        />
			</View>
		);
	}
}
