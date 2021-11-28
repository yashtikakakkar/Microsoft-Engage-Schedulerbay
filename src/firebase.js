import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import config from "./config.json";

firebase.initializeApp(config);

// credentials for firebase:
// email: cmittal305@gmail.com
// password: Abc@12345

let provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
firestore.settings({ timestampsInSnapshots: true });

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export default firebase;
