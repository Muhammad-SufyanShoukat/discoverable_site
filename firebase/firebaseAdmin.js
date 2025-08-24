const admin = require('firebase-admin');
const serviceAccount = require('./undiscovered-recruits-app-edc1239681d0.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
module.exports = admin;
