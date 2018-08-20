// import * as firebase from 'firebase';
// import 'firebase/firestore';

// var config = {
// 	// do not forget to hide the API key when time comes
// 	apiKey: 'AIzaSyCU1BZSUnS5vlJUbK_SMcO8xuQpMXvGtWE',
// 	authDomain: 'bayride-213215.firebaseapp.com',
// 	databaseURL: 'https://bayride-213215.firebaseio.com',
// 	projectId: 'bayride-213215',
// 	storageBucket: 'bayride-213215.appspot.com',
// 	messagingSenderId: '1020951671508'
// };
// firebase.initializeApp(config);

// const firestore = firebase.firestore();

// const settings = {
// 	timestampsInSnapshots: true
// };

// firestore.settings(settings);



import * as firebase from 'firebase';
import 'firebase/firestore';


const config = {
	// do not forget to hide the API key when time comes
	apiKey: 'AIzaSyCU1BZSUnS5vlJUbK_SMcO8xuQpMXvGtWE',
	authDomain: 'bayride-213215.firebaseapp.com',
	databaseURL: 'https://bayride-213215.firebaseio.com',
	projectId: 'bayride-213215',
	storageBucket: 'bayride-213215.appspot.com',
	messagingSenderId: '1020951671508'
};
firebase.initializeApp(config);


const auth = firebase.auth();

const store = firebase.firestore();
const settings = { timstampsInSnapshots: true };
store.settings(settings);

const imgStorageRef = firebase.storage().ref().child("images");


export { auth, store, imgStorageRef };


// export default firestore;

