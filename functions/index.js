const functions = require('firebase-functions');
const fetch = require('node-fetch');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

//send the push notification
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

// exports.sendPushNotificationUpdate = functions.firestore.document("lots/{lotId}").onUpdate((change, context) => {
//   const newValue = change.after.data();
//   const previousValue = change.before.data();

//   const oldDriverId = previousValue.driverId;
//   const passengerId = previousValue.passengerId;
  
//   const expoTokenPassenger = 0; // Get the expoToken of the passengerId from the lot
//   const expoTokenDriver = 0; // Get the expoToken of the !!!!PREVIOUS!!!! driverId from the lot
// })


//     messages.push({
//       "to": expoTokenPassenger,
//       "sound": "default",
//       "body": "Passenger Notification Body"
//     });
//     messages.push({
//       "to": expoTokenDriver,
//       "sound": "default",
//       "body": "Driver Notification Body"
//     });
//     return Promise.all(messages);
//   })
//   .then(messages => {
//     // console.log(messages)
//     fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(messages)
//     });
//   })
//   .catch(err => {
//       console.error(err)
//   });


exports.sendPushNotificationConfirmation = functions.firestore.document("lot_history/{expiredLot}").onCreate((snap, context) => {
  const lotObj = snap.data();
  const lotId = context.params.expiredLot;
  console.log(">>>>>>", lotObj, "<<<<<<");
  console.log("<<<<<<", context, ">>>>>>");

  console.log("Have we updated at all?");
  const expoTokenPassenger = lotObj.passengerExpoToken;

  let message = {
    "to": expoTokenPassenger,
    "sound": "default",
    "body": "Passenger Notification Body"
  };

  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  });

})
  // let messages = [];
  // return functions.firestore.document('lots/{lotId}').onUpdate((change, context) => {
  //   const newValue = change.after.data();
  //   const previousValue = change.before.data();

  //   const expoTokenPassenger = 0; // Get the expoToken of the passengerId from the lot
  //   const expoTokenDriver = 0; // Get the expoToken of the !!!!PREVIOUS!!!! driverId from the lot

  //   // 

  //   messages.push({
  //     "to": expoTokenPassenger,
  //     "sound": "default",
  //     "body": "Passenger Notification Body"
  //   });
  //   messages.push({
  //     "to": expoTokenDriver,
  //     "sound": "default",
  //     "body": "Driver Notification Body"
  //   });
  //   return Promise.all(messages);
  // })
  // .then(messages => {
  //   // console.log(messages)
  //   fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(messages)
  //   });
  // })
  // .catch(err => {
  //     console.error(err)
  // });


// export {}