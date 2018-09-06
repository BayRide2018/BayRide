const functions = require('firebase-functions');
const fetch = require('node-fetch');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// For clarification or help, see the following links
// FROM https://www.youtube.com/watch?v=R2D6J10fhA4&feature=youtu.be
// FROM https://github.com/nathvarun/React-Native-Firebase-Tutorials/tree/master/Project%20Files/6%20Push%20Notifications



exports.sendPushNotificationConfirmation = functions.firestore.document("lot_history/{expiredLot}").onCreate((snap, context) => {
  const lotObj = snap.data();
  const lotId = context.params.expiredLot;

  const expoTokenPassenger = lotObj.passengerExpoToken;
  const expoTokenDriver = lotObj.driverExpoToken;

  let passengerMessage = {
    "to": expoTokenPassenger,
    "sound": "default",
    "body": "Time to start your trip! Please head towards the pickup location"
  };

  let driverMessage = {
    "to": expoTokenDriver,
    "sound": "default",
    "body": "You won! You're the driver for this trip! Please head towards the pickup location"
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

  const expoTokenPassenger = newValue.passengerExpoToken;
  const expoTokenDriver = previousValue.driverExpoToken; // We need this to be the PREV driver, so that
  const price = newValue.offer;
  const passengerBody = `Someone offered a lower price on your ride! The new price is ${price}`;
  const driverBody = `Someone offered a lower price on the ride you bid on! The new price is ${price}`;

  let passengerMessage = {
    "to": expoTokenPassenger,
    "sound": "default",
    "body": passengerBody
  };

  let driverMessage = {
    "to": expoTokenDriver,
    "sound": "default",
    "body": driverBody
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
