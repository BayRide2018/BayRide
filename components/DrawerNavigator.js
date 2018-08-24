import React, { Component } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import SideMenu from './SideMenu';
import MainScreen from './MainScreen';
import DriverHome from './DriverHome';
import Account from './Account';
import Payment from './Payment';
import History from './History';

const DrawerNavigator = createDrawerNavigator({
	MainScreen: {
		screen: MainScreen
	},
	DriverHome: {
		screen: DriverHome
	},
	Account: {
		screen: Account
	},
	History: {
		screen: History // I don't know why, but for some reason, this word `History` is highlighted a different color on my machine. It works fine, though
	},
	Payment: {
		screen: Payment
	}
}, {
	contentComponent: SideMenu,
	drawerWidth: Dimensions.get('window').width - 120,
});

AppRegistry.registerComponent('Demo', () => DrawerNavigator);

export default DrawerNavigator;
