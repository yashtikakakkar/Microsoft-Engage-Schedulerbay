import "./home.css";
import logo from "./logo.png";
import { signInWithGoogle, auth } from "../firebase";
import { useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "../firebase";

let Home = () => {
  const [role, setRole] = useState("");
  const db = firebase.firestore();
  let flag = true;

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        let a = document.createElement("a");
        if (role == "teacher") {
          db.collection("teachers")
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                if (doc.id === user.email) {
                  a.href = "./teacher";
                  a.click();
                } else {
                  a.href = "./teacherDetails";
                }
              });
            });
        }
        if (role == "student")  {
          db.collection("students")
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                if (doc.id === user.email) {
                  a.href = "./student";
                  a.click();
                } else {
                  a.href = "./studentDetails";
                }
              });
            });
        }
        a.click();
      }
    });
  });

  // let user = useContext(authContext);

  return (
    <>
      {/* {user ? <Redirect to="/teacherDetails" /> : ""} */}
      <div className="main-div">
        <div className="nav top">
          <div className="nav-content">
            <div className="logo-div">
              <img className="logo" src={logo} alt="logo" />
            </div>
            <div className="sign-in">
              Already a member?{" "}
              <button
                onClick={() => {
                  signInWithGoogle();
                }}
                type="button"
                class="btn btn-outline-light"
              >
                Sign In
              </button>
            </div>
          </div>
          <hr />
        </div>
        <div className="content">
          <div className="image">
            <img
              className="descImage"
              src="https://microsoft.acehacker.com/fte2021/img/demo-content/images/scheduler.png"
              alt="desc image"
            />
          </div>
          <div className="text">
            <h1>
              <b>
                BRINGING HYBRID TO
                <br />L I F E
              </b>
            </h1>
            <p>Now schedule your hybrid classes with ease</p>
            <div className="buttons">
              Join now as a
              <button
                onClick={() => {
                  signInWithGoogle();
                  setRole("teacher");
                }}
                type="button"
                class="btn btn-outline-light"
              >
                Teacher
              </button>
              or a
              <button
                onClick={() => {
                  signInWithGoogle();
                  setRole("student");
                }}
                type="button"
                class="btn btn-outline-light"
                style={{ marginRight: "0%" }}
              >
                Student
              </button>
            </div>
          </div>
        </div>
        <div className="spacer layer flip bottom"></div>
      </div>
    </>
  );
};

export default Home;
