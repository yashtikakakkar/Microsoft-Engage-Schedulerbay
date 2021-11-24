import "./class.css";
import logo from "./logo.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import firebase from "../firebase";
import { useEffect, useState } from "react";

let Class = () => {
  const db = firebase.firestore();
  let uid = "9WiD75L6R";

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

  return (
    <>
      <div className="class-div">
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
              <div className="calendar">
                Choose a date to see the list of students coming for offline
                class on that day:
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Class;
