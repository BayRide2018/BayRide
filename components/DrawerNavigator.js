import React, { Component } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import SideMenu from './SideMenu';
import stackNav from './StackNav';
import app from '../App';
import PassengerHome from './PassengerHome';
import MainScreen from './MainScreen';
import DetailScreen from './DetailScreen';

const drawernav = createDrawerNavigator({
	Item1: {
		screen: MainScreen
	}
}, {
	contentComponent: SideMenu,
	drawerWidth: Dimensions.get('window').width - 120,
});

AppRegistry.registerComponent('Demo', () => drawernav);

export default drawernav;
