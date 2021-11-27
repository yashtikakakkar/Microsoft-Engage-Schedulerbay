import "./home.css";
import logo from "./logo.png";
import { signInWithGoogle } from "../firebase";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";

let Home = () => {
  const [role, setRole] = useState("");
  const db = firebase.firestore();
  let navigate = useNavigate();

  useEffect(() => {
    let flag = true;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (role === "teacher") {
          db.collection("teachers")
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                if (doc.id === user.email) {
                  navigate("./teacher");
                  flag = false;
                }
              });
            });

          if (flag === true) {
            navigate("./teacherDetails");
          }
        }

        if (role === "student") {
          db.collection("students")
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                if (doc.id === user.email) {
                  navigate("./student");
                  flag = false;
                }
              });
            });

          if (flag === true) {
            navigate("./studentDetails");
          }
        }
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
