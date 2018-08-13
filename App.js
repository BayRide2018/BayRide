import { createStackNavigator } from 'react-navigation';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import PassengerHome from './components/PassengerHome';
import DriverHome from './components/DriverHome';

export default createStackNavigator({
	Welcome: { screen: Welcome },
	Login: { screen: Login },
	Signup: { screen: Signup },
	// PassengerHome: { screen: PassengerHome },
	// DriverHome: { screen: DriverHome }
}, {
	initialRouteName: 'Welcome',
	navigationOptions: {
		title: 'BayRide',
		headerLeft: null,
		gesturesEnabled: false,
		header: null,
	}
});
