const functions = require('firebase-functions');
const fetch = require('node-fetch');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);


// THIS IS THE EXAMPLE FROM https://www.youtube.com/watch?v=R2D6J10fhA4&feature=youtu.be
// FROM https://github.com/nathvarun/React-Native-Firebase-Tutorials/tree/master/Project%20Files/6%20Push%20Notifications

// exports.sendPushNotification = functions.database.ref('contacts/').onCreate(event => {
//   const root = event.data.ref.root
//   var messages = []
//   //return the main promise
//   return root.child('/users').once('value').then(function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {

//         var expoToken = childSnapshot.val().expoToken;

//         messages.push({
//             "to": expoToken,
//             "sound": "default",
//             "body": "New Note Added"
//         });
//     });
//     //firebase.database then() respved a single promise that resolves
//     //once all the messages have been resolved
//     return Promise.all(messages)

//   })
//       .then(messages => {
//           // console.log(messages)
//           fetch('https://exp.host/--/api/v2/push/send', {
//               method: 'POST',
//               headers: {
//                   'Accept': 'application/json',
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(messages)
//           });
//       })
//       .catch(reason => {
//           console.log(reason)
//       })
// });



exports.sendPushNotificationConfirmation = functions.firestore.document("lot_history/{expiredLot}").onCreate((snap, context) => {
  const lotObj = snap.data();
  const lotId = context.params.expiredLot;
  console.log(">>>>>>", lotObj, "<<<<<<");
  console.log("<<<<<<", context, ">>>>>>");
  console.log("This function d0n't really do anything.. The http request to expo fails because of our firebase plan (the unpaid stuff)");

  const expoTokenPassenger = lotObj.passengerExpoToken;
  const expoTokenDriver = lotObj.driverExpoToken;

  let passengerMessage = {
    "to": expoTokenPassenger,
    "sound": "default",
    "body": "Passenger Notification Body"
  };

  let driverMessage = {
    "to": expoTokenDriver,
    "sound": "default",
    "body": "Driver Notification Body"
  };

  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(passengerMessage)
  });

  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(driverMessage)
  });
})

exports.sendPushNotificationUpdate = functions.firestore.document("lots/{lotId}").onUpdate((change, context) => {
  const newValue = change.after.data();
  const previousValue = change.before.data();

  console.log(">>NV>>", newValue);
  console.log(">>PV>>", previousValue);
  console.log(">Context>", context);

  const expoTokenPassenger = newValue.passengerExpoToken;
  const expoTokenDriver = previousValue.driverExpoToken; // We need this to be the PREV driver, so that

  let passengerMessage = {
    "to": expoTokenPassenger,
    "sound": "default",
    "body": "Passenger Notification Body"
  };

  let driverMessage = {
    "to": expoTokenDriver,
    "sound": "default",
    "body": "Driver Notification Body"
  };
  
  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(passengerMessage)
  });

  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(driverMessage)
  });
})
