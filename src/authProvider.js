import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "./firebase";

export const authContext = createContext();

// home, login etc components are its children
let AuthProvider = (props) => {
  // console.log(props);
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    // when authorization changes, from logged in to logged out or vice versa
    // this function is called
    // user -> has null if logged out, else has logged in user's data
    let unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // destructured array -> containing user's data
        let { displayName, email, uid, photoURL } = user;

        let docRef = firestore.collection("users").doc(uid);

        let documentSnapshot = await docRef.get();

        if (!documentSnapshot.exists) {
          docRef.set({
            displayName,
            email,
            photoURL,
          });
        }

        // this data will be updated in the "user" variable via useState on line 8
        setUser({ displayName, email, uid, photoURL });
      } else {
        // if user logged out, no value in user, hence set null too
        setUser(null);
      }

      // when log in/out fxn is completed, loading is done, hence put false via line 9
      setLoading(false);
    });

    // cleanUp fxn called*
    // cleans up effects from previous render, updates value of "user" every render
    return () => {
      unsub();
    };
  }, []);

  return (
    <authContext.Provider value={user}>
      {!loading && props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;