import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View, TouchableOpacity
} from 'react-native';

import { createStackNavigator } from  'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import MainScreen from "./MainScreen";
import DetailScreen from "./DetailScreen";
import PassengerHome from './PassengerHome';
import Menu from './Menu';

const stackNav = createStackNavigator({
	Main : {
		screen: MainScreen,
	},
	Detail: {
		screen: DetailScreen,
	}
});

export default stackNav;
