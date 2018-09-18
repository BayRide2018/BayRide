var React = require('react-native');

var {
	StyleSheet,
} = React;

const BRBLUE = '#40d3cf'; // also try: c5fef3, c5edfe, c5fed7
const BRDARKBLUE = '#2ec1bd'; // also try: c5fef3, c5edfe, c5fed7
const BROFFWHITE = '#fff9f2'; // also try: fef3c5

module.exports = StyleSheet.create({
	containerMain: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'transparent',
		flex: 1
	},

	/**
	 * Styling for Welcome
	 */
	logo: {
		marginTop: 150,
		marginBottom: 70,
		height: 230,
		width: 230,
		alignSelf: 'center'
	},
	welcomeSignUp: {
		backgroundColor: BRBLUE,
		width: React.Dimensions.get('window').width * .8,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		// margin: 20,
		height: 70,
	},
	welcomeSignUpText: {
		fontSize: 35,
		color: BROFFWHITE,
	},
	welcomeLogIn: {
		backgroundColor: BRDARKBLUE,
		width: React.Dimensions.get('window').width * .3,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		margin: 40,
	},

	/**
	 * Styling for SignUp & Login
	 */
	signIn: {
		marginLeft: 15,
		marginRight: 15,
		height: React.Dimensions.get('window').height,
	},

	backButton: {
		marginLeft: 10,
		marginTop: 35
	},

	successButtons: {
		alignSelf: 'center'
	},
	/**
	 * Styling for PassengerHome / MainScreen
	 */
	mapMain: {
		zIndex: -1,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
	},
	whereTo: {
		zIndex: 10,
		top: 70
	},
	matchMain: {
		zIndex: 20,
		top: 80,
		alignSelf: 'center'
	},

	/**
	 * Styling for LotSubmissionForm
	 */
	picker: {
		backgroundColor: 'white',
		width: 300,
		height: 215,
	},
	submissionForm: {
		flex: 1,
		margin: 15,

		alignItems: 'center'
	},
	viewPhoto: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		flexDirection: 'row'
	},
	buttonRows: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between'
	},
	back: {
		marginLeft: 30
	},

	/**
	 * Style for Matchbanner
	 */
	matchBanner: {
		backgroundColor: 'white',
		alignItems: 'center',
		margin: 40,
		padding: 20,
		borderRadius: 15,
	},


	/**
	 * Styling for DriverHome
	 */
	myLotBannerWrapper: {},
	innerLotBannerA: {
		width: React.Dimensions.get('window').width / (20/7),
	},
	screenshot: {
		flex: 1,
		height: 150
	},
	innerLotBannerB: {
		width: React.Dimensions.get('window').width / (20/13),
	},
	lotBanner: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	winningBanner: {
		display: 'flex',
		backgroundColor: '#aaffaa',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	lotBannerButton: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		alignContent: 'space-around',
	},
	horizontalRule: {
		marginLeft: 15,
		marginRight: 15,
		borderBottomColor: 'black',
		borderBottomWidth: 1,
	},
	info: {
		textAlign: 'center'
	},
	timer: {
		display: 'flex',
		alignItems: 'center'
	},

	/**
	 * Styling for the drawer
	 */
	drawerIcon: {
		marginTop: 24,
		marginLeft: 18
	},
	/** The rest of these are for the sidemenu */
	containerSM: {
		paddingTop: 45,
		flex: 1,
		backgroundColor: BROFFWHITE,
	},
	navItemStyleSM: {
		padding: 10,
		backgroundColor: BROFFWHITE,
		height: (React.Dimensions.get('window').height / 12),
	},
	navItemTextSM: {
		color: BRBLUE,
		fontWeight: '300',
		fontSize: 22,
	},
	footerContainerSM: {
		flex: 1,
		backgroundColor: BROFFWHITE,
		justifyContent: 'flex-end',
		bottom: 20,
		alignItems: 'center'
	},

	/**
	 * Styling other things, or general things
	 */
	background: {
		backgroundColor: BROFFWHITE,
		height: React.Dimensions.get('window').height,
	},
	webView: {
		marginTop: 20,
	},
	webOuterView: {
		flex: 1
	},
	button: {
		backgroundColor: BRBLUE,
		width: React.Dimensions.get('window').width * .9,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	buttonText: {
		color: BROFFWHITE,
	},
});
