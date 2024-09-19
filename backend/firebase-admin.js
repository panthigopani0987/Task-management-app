const admin = require('firebase-admin');
const serviceAccount = require('./config/task-management-app-4c116-firebase-adminsdk-molge-b9dd5a70c1.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
