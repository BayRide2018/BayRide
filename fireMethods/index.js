import firebase from 'firebase';
import { store, auth } from '../fire';
import { PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';

async function signup (name, phone, email, password) {
	email = email.toLowerCase();
	for (let i = 0; i < arguments.length; i++) {
		if (!arguments[i].length) return "Please enter information for all fields.";
	}
	if (password.length < 6) return "Password must be at least 6 characters.";
	// It might be cool to validate phone number and license with regex, but whatever
	// ^No, but really

	let valid = false;

		const phoneUtil = PhoneNumberUtil.getInstance();
		// user doesn't have to include +1
		// an example telling the user that above the field would be great
		valid = phoneUtil.isValidNumber(phoneUtil.parse('+1' + phone));

	if (!valid) {
		return 'Invalid Phone Number';
	}

	// Auth Signup
	let res = null;
	await auth.createUserWithEmailAndPassword(email, password).catch(err => {
		res = `It seems there was an error: ${err}`;
	});
	if (res) return res;

	// DB Signup
	let passengerLotHistoryId, driverLotHistoryId;
	store.collection("driver_lot_history").add({ driverId: email, lots: [] })
		.then(DLH => { driverLotHistoryId = DLH.id });
	await store.collection("passenger_lot_history").add({ driverId: email, lots: [] })
		.then(PLH => { passengerLotHistoryId = PLH.id });

	await store.collection("users").doc(email).set({
		name,
		phone,
		email,
		password,
		location: [],
		currentlyPassenger: true,
		currentLot: '', // Having just this one means that it is important that passengers don't bid on their own lots in testing
		paymentInformation: {},
		drivingInformation: { canDrive: false },
		myDriverLotHistory: driverLotHistoryId,
		myPassengerLotHistory: passengerLotHistoryId
	});
	return true;
}

async function login (email, password) {
	email = email.toLowerCase();
	let exists = false;
	let res = null;
	await store.collection("users").where("email", "==", email).get()
		.then(allUsers => {
			allUsers.forEach(user => {
				if (user.data().password !== password) {
					res = "That's not the right password, sir.";
				}
				exists = true;
			});
		});
	if (res) return res;
	if (exists) {
		// await	auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
		await auth.signInWithEmailAndPassword(email, password);
		return true;
		// This is the successful login case
	} else {
		return "That is not a registered user. Try a different email or signing up.";
	}
}

async function createLot (screenshot, pickupTime, pickupLocation, dropoffLocation, offer, carType) {
	let passengerId, passengerExpoToken;

	await store.collection("users").doc(auth.currentUser.email).get().then(user => {
		passengerId = user.id;
		passengerExpoToken = user.data().expoToken;
	})

	// if (!(pickupTime && pickupLocation && dropoffLocation && offer && passengerId)) {
	// 	return "Please fill out all of the forms."
	// } Rather, this should be validated in LSF

	const currentTime = new Date();
	pickupTime = new Date(currentTime.getTime() + pickupTime*60000);

	// This could be better, maybe? Parsefloat should return a float, and cut out random text
	offer = Number.parseFloat(Number.parseFloat(offer).toFixed(2));

	// Important
	let driverExpoToken = '';

	let newLot = await store.collection("lots").add({
		screenshot,
		pickupTime,
		pickupLocation,
		dropoffLocation,
		offer,
		carType,
		passengerId,
		passengerExpoToken,
		driverExpoToken,
		driverId: null
	});
	return newLot.id;
}

async function expireLot (lotId) {
	let lotObj, newLotId;
	await store.collection("lots").doc(lotId).get().then(lot => {
		if (lot.exists) {
			
			if (lot.data().driverId) {
				lotObj = lot.data();
				lot.ref.delete();
			} else {
				lot.ref.delete();
			}
		}
	});
	if (lotObj) {
		// Move lot to History
		await store.collection("lot_history").add(lotObj)
		.then(newLot => {
			newLotId =  newLot.id;
		});
		// Add to driverHistory of Driver &
		// Get dlh of driver
		let dlh, plh;
		// Please note: the below 4 awaited calls can be optimized by making it "double-threaded"
		// This isn't a big deal for now, but something to be improved later
		await store.collection("users").doc(lotObj.driverId).get().then(driver => {
			dlh = driver.data().myDriverLotHistory;
		});
		await store.collection("driver_lot_history").doc(dlh).update({
			lots: firebase.firestore.FieldValue.arrayUnion(newLotId) // taken from https://firebase.google.com/docs/firestore/manage-data/add-data
		});
		// PassengerHistory of Passenger
		await store.collection("users").doc(lotObj.passengerId).get().then(passenger => {
			plh = passenger.data().myPassengerLotHistory;
		});
		await store.collection("passenger_lot_history").doc(plh).update({
			lots: firebase.firestore.FieldValue.arrayUnion(newLotId) // taken from https://firebase.google.com/docs/firestore/manage-data/add-data
		});
		return newLotId;
	}
}

export { signup, login, createLot, expireLot };
