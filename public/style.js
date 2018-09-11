var React = require('react-native');

var {
	StyleSheet,
} = React;

const BRBLUE = '#42d5d1'; // also try: c5fef3, c5edfe, c5fed7
const BROFFWHITE = '#fff1e4'; // also try: fef3c5

module.exports = StyleSheet.create({
	containerMain: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'transparent',
		flex: 1
	},

	/**
	 * Styling for Welcome
	 */

	/**
	 * Styling for SignUp & Login
	 */
	signUp: {
		width: 150,
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 5,
		padding: 2,
	},
	/**
	 * Styling for PassengerHome / MainScreen
	 */

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
		margin: 20,
		marginTop: 50,
		alignItems: 'center'
	},
	viewPhoto: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 0,
		paddingBottom: 0
	},
	lotMain: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'black'
	},
	scrollviewMain: {
		alignItems: 'center',
	},
	mapMain: {
		zIndex: -1,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
	},
	buttonMain: {
		zIndex: 10,
		top: 70
	},
	matchMain: {
		zIndex: 20,
		top: 80
	},
	button: {
		margin: 20,
		marginTop: 50,
	},
	backButton: {
		marginTop: 'auto'
	},
	callDrawerContainer: {
		padding: 25
	},
	banner: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#b0e0e6',
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	welcomeButton: {
		width: 150,
		backgroundColor: 'teal',
		borderWidth: 1,
		borderRadius: 5,
		padding: 2,
	},
	title: {
		fontSize: 75,
		fontWeight: 'bold',
		width: 500,
		backgroundColor: '#b0e0e6',
		textAlign: 'center',
		color: 'teal',
		top: 70
	},
	/**
	 * Style for Matchbanner
	 */
	matchBanner: {
		backgroundColor: 'white',
		margin: 40
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
		backgroundColor: 'green',
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
		paddingTop: 20,
		flex: 1,
		backgroundColor: '#b0e0e6',
	},
	navItemStyleSM: {
		padding: 15
	},
	sectionHeadingStyleSM: {
		paddingVertical: 10,
		paddingHorizontal: 5
	},
	footerContainerSM: {
		flex: 1,
		backgroundColor: '#b0e0e6',
		justifyContent: 'flex-end',
		bottom: 20,
		alignItems: 'center'
	},

	/**
	 * Styling other things
	 */
	webView: {
		marginTop: 20,
	},
	webOuterView: {
		flex: 1
	}
});
