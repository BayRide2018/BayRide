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
	await store.collection("users").add({
		name,
		phone,
		email,
		password,
		location: [],
		defaultSetting: "passenger",
		paymentInformation: {},
		drivingInformation: { canDrive: false }
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
		await auth.signInWithEmailAndPassword(email, password)
		return true; // This is the successful login case
	} else {
		return "That is not a registered user. Try a different email or signing up.";
	}
}

async function createLot (screenshot, pickupTime, pickupLocation, dropoffLocation, offer) {
	const passengerEmail = auth.currentUser.email;
	let passengerId;
	store.collection("users").where("email", "==", "passengerEmail").get().then(users => {
		users.forEach(user => {
			passengerId = user.id;
		})
	})
	if (!(pickupTime && pickupLocation && dropoffLocation && offer && passengerId)) {
		return "Please fill out all of the forms."
	}
	const currentTime = new Date()
	pickupTime = new Date(currentTime.getTime() + pickupTime*60000)
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

export { signup, login, createLot };
