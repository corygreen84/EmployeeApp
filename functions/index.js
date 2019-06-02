const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.scheduledFunction = functions.pubsub.schedule('2 * * * *').timeZone('America/Los_Angles').onRun((context) => {
    console.log("Hey there");
});
