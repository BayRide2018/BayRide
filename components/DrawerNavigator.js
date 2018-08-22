import React, { Component } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import SideMenu from './SideMenu';
import MainScreen from './MainScreen';
import DriverHome from './DriverHome';
import Account from './Account';
import Payment from './Payment';

const drawernav = createDrawerNavigator({
	MainScreen: {
		screen: MainScreen
	},
	DriverHome: {
		screen: DriverHome
	},
	Account: {
		screen: Account
	},
	Payment: {
		screen: Payment
	}
}, {
	contentComponent: SideMenu,
	drawerWidth: Dimensions.get('window').width - 120,
});

AppRegistry.registerComponent('Demo', () => drawernav);

export default drawernav;
