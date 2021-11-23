import "./home.css";
import logo from "./logo.png";
import { signInWithGoogle, auth } from "../firebase";
import { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Redirect } from "react";
import { authContext } from "../authProvider";


let Home = () => {
  const [role, setRole] = useState("");
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        if (role=="teacher")
          <Redirect to="/teacherDetails" />
        if (role=="student")
          <Redirect to="/studentDetails" />
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
