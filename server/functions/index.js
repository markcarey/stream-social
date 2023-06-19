global.__base = __dirname + '/';
const functions = require("firebase-functions");

var social = require(__base + 'social');

exports.socialApi = functions.runWith({secrets: ["SOCIAL_PRIV"]}).https.onRequest((req, res) => {
    return social.api(req, res);
}); // socialApi
