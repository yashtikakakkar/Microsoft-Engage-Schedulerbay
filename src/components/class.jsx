import "./class.css";
import logo from "./logo.png";
import "react-calendar/dist/Calendar.css";
import firebase from "../firebase";
import { useEffect, useState, useContext, createElement } from "react";
import { Context } from "./context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

let Class = () => {
  const db = firebase.firestore();
  const [tuid, setTuid] = useContext(Context);
  const uid = tuid;
  let navigate = useNavigate();
  const [className, setClassName] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [mon, setMon] = useState("");
  const [tues, setTues] = useState("");
  const [wed, setWed] = useState("");
  const [thurs, setThurs] = useState("");
  const [fri, setFri] = useState("");
  const [sat, setSat] = useState("");

  useEffect(() => {
    db.collection("classes")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id === uid) {
            setClassName(doc.data().className);
            setType(doc.data().classType);
            setSubject(doc.data().subject);
          }
        });
      });

    db.collection("classes")
      .doc(uid)
      .collection("timetable")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id === uid) {
            setMon(doc.data().Monday);
            setTues(doc.data().Tuesday);
            setWed(doc.data().Wednesday);
            setThurs(doc.data().Thursday);
            setFri(doc.data().Friday);
            setSat(doc.data().Saturday);
          }
        });
      });
  }, []);

  function seeList() {
    let date = document.querySelector(".date");
    let given = new Date(date.value);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let day = days[given.getDay()];
        if (
          (day == "mon" && mon != "") ||
          (day == "tues" && tues != "") ||
          (day == "wed" && wed != "") ||
          (day == "thurs" && thurs != "") ||
          (day == "fri" && fri != "") ||
          (day == "sat" && sat != "")
        ) {
          let date =
            given.getDate() +
            "-" +
            (given.getMonth() + 1) +
            "-" +
            given.getFullYear();

          let list = document.createElement("div");
          list.classList.add("list-modal");
          let innerdiv = document.createElement("div");
          innerdiv.classList.add("list-inner");
          let heading = document.createElement("h4");
          heading.innerText = "List of Students";
          // let close = document.createElement("span");
          // close.classList.add("material-icons");
          // close.innerText = "close";
          // close.onclick = () => {
          //   grid.remove(div);
          // };
          innerdiv.append(heading);
          list.append(innerdiv);

          let grid = document.querySelector(".inner");

          const ref = db
            .collection("instance")
            .doc(date)
            .collection(uid)
            .doc(uid);

          ref.get().then((snapshot) => {
            if (snapshot.exists) {
              ref.onSnapshot((doc) => {
                if (doc.data().students.length === 0) {
                  let text = document.createElement("h6");
                  text.innerText = "No student has booked an offline seat yet.";
                  innerdiv.append(text);
                } else {
                  let ol = document.createElement("ol");
                  for (let i = 0; i < doc.data().students.length; i++) {
                    let li = document.createElement("li");
                    li.innerText = doc.data().students[i];
                    ol.append(li);
                  }
                  innerdiv.append(ol);
                }
              });
            } else {
              let text = document.createElement("h6");
              text.innerText = "No student has booked an offline seat yet.";
              innerdiv.append(text);
            }
          });

          grid.append(list);

          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              list.remove();
            }
          });
        } else {
          alert(
            "Please select a valid day ie when there is a class acc to Time Table."
          );
        }
      }
    });
  }

  return (
    <>
      <div className="class-div">
        <div className="inner">
          <div className="nav top">
            <div className="nav-content">
              <div className="logo-div">
                <img className="logo" src={logo} alt="logo" />
              </div>
              <div class="sign-out">
                <button
                  onClick={() => {
                    const auth = getAuth();
                    onAuthStateChanged(auth, (user) => {
                      if (user) {
                        auth.signOut().then(() => {
                          navigate("../");
                        });
                      }
                    });
                  }}
                  type="button"
                  class="btn btn-outline-light"
                >
                  Log out
                </button>
              </div>
            </div>
            <hr />
          </div>
          {/* <div className="list-modal">
            <div className="list-inner">
              <h4>List of Students</h4>
              <span class="material-icons">close</span>
              <ol class="list">
                <li>Yashtika Kakkar</li>
              </ol>
            </div>
          </div> */}
          <div className="class-content">
            <h2>
              C L A S S &gt; {className} - {subject} {type}
            </h2>
            <h6>Joining Code: {uid}</h6>
            <div className="class-inner">
              <div className="class-details">
                <h4>TimeTable</h4>
                <table>
                  <thead>
                    <th>Day</th>
                    <th>Time</th>
                  </thead>
                  <tr>
                    <td>Monday</td>
                    <td>{mon}</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>{tues}</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>{wed}</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>{thurs}</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>{fri}</td>
                  </tr>
                  <tr>
                    <td>Saturday</td>
                    <td>{sat}</td>
                  </tr>
                </table>
              </div>
              <div className="subject-form">
                <div className="form-div">
                  <h4>See the list of students attending offline mode</h4>
                  <div className="input2">
                    Select Date:{" "}
                    <input class="date" type="date" placeholder="dd-mm-yyyy" />
                  </div>
                  <div className="input2">
                    <button onClick={seeList} className="btn btn-outline-light">
                      See List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Class;
