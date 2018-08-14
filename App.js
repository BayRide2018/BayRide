import { createStackNavigator } from 'react-navigation';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import PassengerHome from './components/PassengerHome';
import DriverHome from './components/DriverHome';
import LotSubmissionForm from './components/LotSubmissionForm';
import LotBanner from './components/LotBanner';

export default createStackNavigator({
	Welcome: { screen: Welcome },
	Login: { screen: Login },
	Signup: { screen: Signup },
	PassengerHome: { screen: PassengerHome },
	LotSubmissionForm: { screen: LotSubmissionForm },
	LotBanner: { screen: LotBanner }
	// DriverHome: { screen: DriverHome }
}, {
	initialRouteName: 'PassengerHome',
	navigationOptions: {
		title: 'BayRide',
		headerLeft: null,
		gesturesEnabled: false,
		header: null,
	}
});
