import "./home.css";
import logo from "./logo.png";
import { signInWithGoogle, auth } from "../firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

let Home = () => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }, []);

  const [role, setRole] = useState("");
  useEffect(() => {
    console.log(role);
  });

  return (
    <>
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
              <Link to={"/teacher"}>
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
              </Link>
              or a
              <Link to={"/student"}>
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
              </Link>{" "}
            </div>
          </div>
        </div>
        <div className="spacer layer flip bottom"></div>
      </div>
    </>
  );
};

export default Home;
