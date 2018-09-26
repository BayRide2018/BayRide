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
		flex: 1,
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
	signInButton: {
		backgroundColor: BRBLUE,
		width: React.Dimensions.get('window').width * .9,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
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
		alignSelf: 'center',
	},

	/**
	 * Styling for LotSubmissionForm
	 */
	submissionForm: {
		flex: 1,
		margin: 15,
		alignItems: 'center',
	},
	viewPhoto: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		width: React.Dimensions.get('window').width * .9,
		margin: 30,
	},
	buttonForPicker: {
		color: '#2bb88a',
	},
	picker: {
		backgroundColor: 'white',
		width: React.Dimensions.get('window').width * .4,
		height: 215,
	},
	pickerRow: {
		width: React.Dimensions.get('window').width * .9,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-around',
		marginBottom: 20,
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
		// flex: 1,
		height: 140,
		width: 80,
	},
	innerLotBannerB: {
		width: React.Dimensions.get('window').width / (20/13),
	},
	lotBanner: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	winningBanner: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#88ff88',
	},
	lotBannerButton: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		alignContent: 'space-around',
	},

	/**
	 * Styling for the drawer
	 */
	drawerIcon: {
		marginTop: 24,
		marginLeft: 18,
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
		alignItems: 'center',
	},

	/**
	 * Styling for Account
	 */
	singleLine: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	/**
	 * Styling other things, or general things
	 */
	background: {
		backgroundColor: BROFFWHITE,
		height: React.Dimensions.get('window').height*1.4,
	},
	button: {
		backgroundColor: BRBLUE,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	buttonRows: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
	},
	buttonText: {
		color: BROFFWHITE,
	},
	center: {
		alignSelf: 'center',
		alignItems: 'center',
	},
	horizontalRule: {
		marginLeft: 15,
		marginRight: 15,
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		margin: 3,
	},
	webView: {
		marginTop: 20,
	},
	webOuterView: {
		flex: 1,
	},
	backButton: {
		marginLeft: 10,
		marginTop: 35,
	},
});
