import { AppRegistry, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import SideMenu from './SideMenu';
import MainScreen from './MainScreen';
import DriverHome from './DriverHome';
import Account from './Account';
import Payment from './Payment';
import History from './History';
import Help from './Help';
import Winner from './Winner';
import Web from './Web';
import LotSubmissionForm from './LotSubmissionForm';
import LotBanner from './LotBanner';
import LotBannerWrapper from './LotBannerWrapper';
////////////////////////////// PART OF PERSISTANCE, DON'T TOUCH
// import { auth, store } from '../fire';

// let initialRouteName = "MainScreen" ;
// if (auth.currentUser) {
// 	store.collection("users").doc(auth.currentUser.email).get().then(user => {
// 		initialRouteName = user.data().currentlyPassenger ? "MainScreen" : "DriverHome";
// 	});
// }
//////////////////////////////

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
	Payment: {
		screen: Payment
	},
	History: {
		screen: History
	},
	Help: {
		screen: Help
	},
	Winner: {
		screen: Winner
	},
	Web: {
		screen: Web
	},
	LotSubmissionForm: {
		screen: LotSubmissionForm
	},
	LotBanner: {
		screen: LotBanner
	},
	LotBannerWrapper: {
		screen: LotBannerWrapper
	},
}, {
	// initialRouteName: initialRouteName,
	contentComponent: SideMenu,
	drawerWidth: Dimensions.get('window').width - 120,
});

AppRegistry.registerComponent('Demo', () => DrawerNavigator);

export default DrawerNavigator;
