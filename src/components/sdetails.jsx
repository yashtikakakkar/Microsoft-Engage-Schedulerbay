import "./tdetails.css";
import logo from "./logo.png";
import firebase from "../firebase";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

let Sdetails = () => {
  const db = firebase.firestore();

  function submitStudentDetails() {
    let Id = document.querySelector(".id");
    let Name = document.querySelector(".name");
    let Email = document.querySelector(".email");
    let Class = document.querySelector(".myclass");

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        db.collection("students")
          .doc(user.email)
          .set(
            {
              eno: Id.value,
              name: Name.value,
              email: Email.value,
              class: Class.value,
              subjects: [],
            },
            { merge: true }
          );
      }
    });
  }

  return (
    <>
      <div className="main-div">
        <div className="inner-div">
          <div className="nav top">
            <div className="nav-content">
              <div className="logo-div">
                <img className="logo" src={logo} alt="logo" />
              </div>
            </div>
            <hr />
          </div>
          <div className="t-details">
            <div className="detail-modal">
              <h3>Enter your Details</h3>
              <div className="input">
                {" "}
                <input
                  type="text"
                  class="id"
                  placeholder="Enter your Admission Number"
                />{" "}
              </div>
              <div className="input">
                {" "}
                <input
                  type="text"
                  class="name"
                  placeholder="Enter your Name"
                />{" "}
              </div>
              <div className="input">
                {" "}
                <input
                  type="text"
                  class="email"
                  placeholder="Enter your Email ID"
                />{" "}
              </div>
              <div className="input">
                {" "}
                <input
                  type="text"
                  class="myclass"
                  placeholder="Enter your Class"
                />{" "}
              </div>
              <div className="input">
                {" "}
                <Link
                  to="../student"
                  onClick={submitStudentDetails}
                  className="btn btn-outline-light"
                >
                  Submit Details
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sdetails;
