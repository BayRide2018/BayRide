import firebase from 'firebase';
import firestore from '../firestore';

async function signup (name, phone, email, password) {

	email = email.toLowerCase();
	for (let i = 0; i < arguments.length; i++) {
		if (!arguments[i].length) return "Please enter information for all fields.";
	}
	if (password.length < 6) return "Password must be at least 6 characters.";
	//It might be cool to validate phone number and license with regex, but whatever

	// Auth Signup
	let res = null;
	await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
		res = `It seems there was an error: ${err}`;
	});
	if (res) return res;

	// DB Signup
	await firestore.collection("users").add({
		name,
		phone,
		email,
		password
	});
	return true;
}


//More consistent promise syntax
// Login
async function login (email, password) {
	email = email.toLowerCase();
	let exists = false;
	let res = null;
	await firestore.collection("users").where("email", "==", email).get()
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
		await firebase.auth().signInWithEmailAndPassword(email, password)
		return true; // This is the successful login case
	} else {
		return "That is not a registered user. Try a different email or signing up.";
	}
}

export { signup,login };
