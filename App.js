import { createStackNavigator } from 'react-navigation';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import PassengerHome from './components/PassengerHome';
import DriverHome from './components/DriverHome';
import LotSubmissionForm from './components/LotSubmissionForm';
import Account from './components/Account';


export default createStackNavigator({
	Welcome: { screen: Welcome },
	Login: { screen: Login },
	Signup: { screen: Signup },
	PassengerHome: { screen: PassengerHome },
	LotSubmissionForm: { screen: LotSubmissionForm },
	DriverHome: { screen: DriverHome },
	Account: { screen: Account }
}, {
	initialRouteName: 'Login',
	navigationOptions: {
		title: 'BayRide',
		headerLeft: null,
		gesturesEnabled: false,
		header: null,
	}
});
