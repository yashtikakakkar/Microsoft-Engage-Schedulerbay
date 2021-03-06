import "./tdetails.css";
import logo from "./logo.png";
import firebase from "../firebase";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

let Tdetails = () => {
  
  const db = firebase.firestore();

  function submitTeacherDetails() {
    let Id = document.querySelector(".id");
    let Name = document.querySelector(".name");
    let Email = document.querySelector(".email");
    let Subject = document.querySelector(".subject");

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        db.collection("teachers")
          .doc(user.email)
          .set(
            {
              id: Id.value,
              name: Name.value,
              email: Email.value,
              subjects: [],
              classes: [],
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
                  placeholder="Enter your Employee ID"
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
              {/* <div className="input">
                {" "}
                <input
                  type="text"
                  class="subject"
                  placeholder="Enter your Subject Name"
                />{" "}
              </div> */}
              <div className="input">
                {" "}
                <Link
                  to="../teacher"
                  onClick={submitTeacherDetails}
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

export default Tdetails;
