import { createStackNavigator } from 'react-navigation';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import LotSubmissionForm from './components/LotSubmissionForm';
import Account from './components/Account';
import DrawerNavigator from './components/DrawerNavigator';
import DriverRegistration from './components/DriverRegistration';
import Payment from './components/Payment';
import Waiver from './components/Waiver';
import Help from './components/Help';
import Web from './components/Web';
import DriverHome from './components/DriverHome';

export default createStackNavigator({
	Welcome: { screen: Welcome },
	Login: { screen: Login },
	Signup: { screen: Signup },
	DrawerNavigator: {screen: DrawerNavigator},
	Waiver: { screen: Waiver },
	DriverRegistration: { screen: DriverRegistration},
	LotSubmissionForm: { screen: LotSubmissionForm },
	Account: { screen: Account },
	Payment: { screen: Payment },
	Help: { screen: Help },
	Web: { screen: Web },
	DriverHome: {screen: DriverHome}

}, {
	initialRouteName: 'DriverHome',
	navigationOptions: {
		title: 'BayRide',
		headerLeft: null,
		gesturesEnabled: false,
		header: null,
	}
});


