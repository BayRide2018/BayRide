import firebase from 'firebase';
import { store, auth } from '../fire';

async function signup (name, phone, email, password) {

	email = email.toLowerCase();
	for (let i = 0; i < arguments.length; i++) {
		if (!arguments[i].length) return "Please enter information for all fields.";
	}
	if (password.length < 6) return "Password must be at least 6 characters.";
	//It might be cool to validate phone number and license with regex, but whatever

	// Auth Signup
	let res = null;
	await auth.createUserWithEmailAndPassword(email, password).catch(err => {
		res = `It seems there was an error: ${err}`;
	});
	if (res) return res;

	// DB Signup
	// First creat histories...
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
		paymentInformation: {},
		drivingInformation: { canDrive: false },
		myDriverLotHistory: driverLotHistoryId,
		myPassengerLotHistory: passengerLotHistoryId
	});
	return true;
}


//More consistent promise syntax
// Login
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

async function createLot (screenshot, pickupTime, pickupLocation, dropoffLocation, offer) {
	const passengerEmail = auth.currentUser.email;
	let passengerId;
	await store.collection("users").where("email", "==", passengerEmail).get()
		.then(users => {
			users.forEach(user => {
				passengerId = user.id;
			});
		});
	if (!(pickupTime && pickupLocation && dropoffLocation && offer && passengerId)) {
		return "Please fill out all of the forms."
	}
	const currentTime = new Date();
	pickupTime = new Date(currentTime.getTime() + pickupTime*60000);

	// This could be better, maybe? Parsefloat should return a float, and cut out random text
	offer = Number.parseFloat(Number.parseFloat(offer).toFixed(2));

	// With comments for the validations that should be added later, once things are a little more solid
	store.collection("lots").add({
		// Needs to actually be a picture.. Can they submit a lot without a screenshot?
		screenshot,
		// Pickup Time must be in the next... 4 hours? Verifiable with a menu of options, not text input, right?
		pickupTime,
		// To start off, this can be just your location, but I think that it will wind up being important for there to be
		//		Something similar to Uber's set your pickup location. This would make it more useful for the "I'm going to the airport in 20 minutes"
		// 		Scenario, because you could do thus while you're 15 minutes away from where you want to be picked up
		pickupLocation,
		dropoffLocation,
		// I think it might be a good idea to round all offers down to the nearest quarter (2.5 => 2.5; 2.3 => 2.25; 2.2 => 2.0) We could skim off
		//		the difference, and then, when you place an offer, it has to be a multiple of a quarter. This prevents people from doing things
		//		like at the last second, outbidding someone by 1 cent.
		offer,
		passengerId,
		driverId: null
	});
}

async function expireLot (lotId) {
	let lotObj, newLotId;
	await store.collection("lots").doc(lotId).get().then(lot => {
		if (lot.data().driverId) {
			lotObj = lot.data();
			lot.ref.delete();
		} else {
			lot.ref.delete();
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
	}
}

export { signup, login, createLot, expireLot };
