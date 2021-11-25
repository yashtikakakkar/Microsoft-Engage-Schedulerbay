import "./subject.css";
import logo from "./logo.png";
import firebase from "../firebase";
import { useEffect, useState, useContext } from "react";
import suid from "./shomepage";
import { Context } from "./context";
import { getAuth, onAuthStateChanged } from "firebase/auth";

let Subject = () => {
  const db = firebase.firestore();
  const [suid, setSuid] = useContext(Context);
  const uid = suid;

  const [className, setClassName] = useState("");
  const [allowedCap, setAllowedCap] = useState(0);
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [mon, setMon] = useState("");
  const [tues, setTues] = useState("");
  const [wed, setWed] = useState("");
  const [thurs, setThurs] = useState("");
  const [fri, setFri] = useState("");
  const [sat, setSat] = useState("");
  const days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

  useEffect(() => {
    db.collection("classes")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id === uid) {
            setClassName(doc.data().className);
            setType(doc.data().classType);
            setSubject(doc.data().subject);
            setAllowedCap(doc.data().allowedCapacity);
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

  function checkAvailability() {
    let date = document.querySelector(".date");
    let vaccine = document.querySelector(".vaccine");

    let today = new Date();
    let given = new Date(date.value);
    let week = new Date();
    week.setDate(week.getDate() + 7);
    

    // const ref = db.collection("classes").doc(uid);
    // ref.get().then((snapshot)=>{
    //   if(snapshot.exists) {
    //     ref.onSnapshot((doc)=>{
    //       allowedCap = doc.data().allowedCapacity;
    //     })
    //   }
    // })

    console.log(allowedCap);

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (today < given && given < week) {
          if (vaccine.checked) {
            let day = days[given.getDay()];
            console.log(day);
            if (
              (day == "mon" && mon != "") ||
              (day == "tues" && tues != "") ||
              (day == "wed" && wed != "") ||
              (day == "thurs" && thurs != "") ||
              (day == "fri" && fri != "") ||
              (day == "sat" && sat != "")
            ) {

              db.collection("instance")
                .doc(given)
                .collection(uid)
                .doc(uid)
                .get()
                .then((snapshot) => {
                  if (snapshot.exists) {
                    db.collection("instance")
                      .doc(given)
                      .collection(uid)
                      .doc(uid)
                      .onSnapshot((doc) => {
                        let curr = doc.data().current;
                        let allowed = doc.data().allowed;
                        if (curr + 1 <= allowed) {
                          alert(
                            "Offline " +
                              subject +
                              " " +
                              type +
                              " for " +
                              given.getDate() +
                              "/" +
                              given.getMonth() +
                              "/" +
                              given.getFullYear() +
                              " booked successfully! Kindly bring the hard copy of vaccination certificate to allow entry on the premises."
                          );
                          db.collection("instance")
                            .doc(given)
                            .collection(uid)
                            .doc(uid)
                            .update(
                              {
                                curr: curr + 1,
                                students:
                                  firebase.firestore.FieldValue.arrayUnion(
                                    user.displayName
                                  ),
                              },
                              { merge: true }
                            );
                        } else {
                          alert(
                            "Allowed capacity reached already. Kindly try again next time."
                          );
                        }
                      });
                  } else {
                    db.collection("instance")
                      .doc(given)
                      .collection(uid)
                      .doc(uid)
                      .set({
                        allowed: allowedCap,
                        current: 1,
                        students: [user.displayName],
                      });
                    alert(
                      "Offline " +
                        subject +
                        " " +
                        type +
                        " for " +
                        given.getDate() +
                        "/" +
                        given.getMonth() +
                        "/" +
                        given.getFullYear() +
                        " booked successfully! Kindly bring the hard copy of vaccination certificate to allow entry on the premises."
                    );
                  }
                });
            } else {
              alert("No slot available for that day");
            }
          } else {
            alert(
              "Both the vaccine doses are compulsory to attend offline classes."
            );
          }
        } else {
          alert("Please select a date within the week.");
        }
      }
    });
  }

  return (
    <>
      <div className="subject-div">
        <div className="inner">
          <div className="nav top">
            <div className="nav-content">
              <div className="logo-div">
                <img className="logo" src={logo} alt="logo" />
              </div>
            </div>
            <hr />
          </div>
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
                  <h4>Attend Class in Offline Mode</h4>
                  <div className="input2">
                    Date:{" "}
                    <input class="date" type="date" placeholder="dd-mm-yyyy" />
                  </div>
                  <div className="input2">
                    Both Vaccine Doses Taken:{" "}
                    <input class="vaccine" type="checkbox" />
                  </div>
                  <div className="input2">
                    <button
                      onClick={checkAvailability}
                      className="btn btn-outline-light"
                    >
                      Check Availability
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

export default Subject;
