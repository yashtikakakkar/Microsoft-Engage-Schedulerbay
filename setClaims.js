const admin = require("firebase-admin");

const serviceAccount = require("./schedulerbay-test-firebase-adminsdk-yytvs-d318e5b7c6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const claim = (user) => {
  if (user) {
    const uid = user.uid;
    admin
      .auth()
      .setCustomUserClaims(uid, { isTeacher: true })
      .then(() => {
        console.log("done");
      });
  }
};

export default claim;
