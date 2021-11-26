import "./thomepage.css";
import logo from "./logo.png";
import firebase from "../firebase";
import { useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import shortid from "shortid";
import { useNavigate } from "react-router";
import { Context } from "./context";

let Thomepage = () => {
  const [classId, setClassId] = useState("");
  const [tuid, setTuid] = useContext(Context);
  const navigate = useNavigate();
  const db = firebase.firestore();

  function addClass(e) {
    e.preventDefault();

    let preModal = document.querySelector(".class-modal");

    if (preModal != null) {
      return;
    }

    let div = document.createElement("div");
    div.classList.add("class-modal");

    div.innerHTML = `<h3>Add Class</h3>
    <div className="input" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
    Class Name: <input class="cname" type="text" />
    </div>
    <div className="input" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
    Subject Name: <input class="sname" type="text" />
    </div>
    <div className="input" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
    Class Type:
    <select class="class-type" id="class-type" style="width: 194.4px; height: 30px;">
    <option value="lecture">Lecture</option>
    <option value="tutorial">Tutorial</option>
    <option value="lab">Lab</option>
    </select>
    </div>
    <div className="input" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
    Allowed Class Strength: <input type="text"  class="allowed" />
    </div>
    <div className="input-tt" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
    Time Table:
    <button type="button" style="width: 194.4px; margin-right: -1px;" class="add-tt btn btn-outline-dark">
    Create Time Table
    </button>
    </div>
    <div className="input" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
    <button type="button" style="display: flex; align-items: center; width: 100%; align-content: space-around; flex-direction: column;" class="btn btn-outline-dark submit">
    Create Class
    </button>
    </div>`;

    let grid = document.querySelector(".t-content");

    grid.append(div);

    let createBtn = document.querySelector(".submit");

    createBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let cname = document.querySelector(".cname");
      let sname = document.querySelector(".sname");
      let type = document.querySelector(".class-type");
      let allowed = document.querySelector(".allowed");

      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          db.collection("classes").doc(uid).set({
            className: cname.value,
            subject: sname.value,
            classType: type.value,
            teacher: user.displayName,
            allowedCapacity: allowed.value,
          });

          db.collection("teachers")
            .doc(user.email)
            .collection("ids")
            .doc(cname.value + "-" + sname.value)
            .set({ id: uid });

          db.collection("teachers")
            .doc(user.email)
            .update({
              classes: firebase.firestore.FieldValue.arrayUnion(cname.value),
              subjects: firebase.firestore.FieldValue.arrayUnion(sname.value),
            });
        }
      });

      let classIcon = document.createElement("div");
      classIcon.classList.add("class-btn");
      classIcon.id = uid;
      classIcon.innerText = cname.value + "-" + sname.value;

      div.remove();

      let classdiv = document.querySelector(".class");
      classdiv.append(classIcon);
      alert("The Joining Code for this class is: " + uid);
    });

    let addTTBtn = document.querySelector(".add-tt");
    addTTBtn.addEventListener("click", (e) => {
      e.preventDefault();

      div.remove();

      let ttModal = document.createElement("div");
      ttModal.classList.add("tt-modal");

      ttModal.innerHTML = `<h3>Add Timings</h3><br/>
      <div className="tt-input" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
      Monday <input class="mon" type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Tuesday <input class="tues" type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Wednesday <input class="wed" type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Thursday <input class="thurs" type="text" placeholder="10:00 am - 11:00 am"  /></div><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Friday <input class="fri" type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Saturday <input class="sat" type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
      <div className="input"  style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">
        <button type="button" style="width: 100%" class="tt-btn btn btn-outline-dark">
          Create Time Table
        </button>
      </div>`;

      grid.append(ttModal);

      let mon = document.querySelector(".mon");
      let tues = document.querySelector(".tues");
      let wed = document.querySelector(".wed");
      let thurs = document.querySelector(".thurs");
      let fri = document.querySelector(".fri");
      let sat = document.querySelector(".sat");

      let ttBtn = document.querySelector(".tt-btn");
      ttBtn.addEventListener("click", (e) => {
        e.preventDefault();

        db.collection("classes").doc(uid).collection("timetable").doc(uid).set({
          Monday: mon.value,
          Tuesday: tues.value,
          Wednesday: wed.value,
          Thursday: thurs.value,
          Friday: fri.value,
          Saturday: sat.value,
        });

        ttModal.remove();

        grid.append(div);
      });
    });
  }

  function loadClasses(e) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        db.collection("/teachers/" + user.email + "/ids")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              let classSubjectName = doc.id;
              let uid = doc.data().id;
              let div = document.createElement("div");
              div.classList.add("class-btn");
              div.id = uid;
              div.innerText = classSubjectName;
              let grid = document.querySelector(".class");
              grid.append(div);
            });
          });
      }
      
    });
  }

  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("class-btn")) {
      let myid = e.target.id;
      setTuid(myid);
      navigate("../class");
    }
  });

  const uid = shortid.generate();

  useEffect(() => {
    loadClasses();
  }, []);

  // db.collection("classes")
  //   .doc("82MhxtjM9lvuBlunmLTA")
  //   .collection("imetable")
  //   .doc()
  //   .set({
  //     Monday: "sample",
  //   });

  // db.collection("classes").add({
  //   name: "IT-1",
  //   type: "Lecture",
  //   allowedStrength: 20,
  //   totalStrength: 60,
  //   subject: "Web Dev",
  // });

  return (
    <>
      <div className="main-div">
        <div className="inner-div">
          <div className="nav top">
            <div className="nav-content">
              <div className="logo-div">
                <img className="logo" src={logo} alt="logo" />
              </div>
              <div className="create">
                <button
                  type="button"
                  // onClick={addClass}
                  class="btn btn-outline-light create-btn"
                  onClick={(e) => {
                    setClassId(uid);
                    addClass(e);
                  }}
                >
                  Add New Class
                </button>
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
          <div className="t-content">
            {/* <div className="class-modal">
              <h3>Add Class</h3>
              <div className="input">
                Class Name: <input type="text" />
              </div>
              <div className="input">
                Class Type:{" "}
                <select name="class-type" id="class-type">
                  <option value="lecture">Lecture</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="lab">Lab</option>
                </select>
              </div>
              <div className="input">
                Total Class Strength: <input type="text" />
              </div>
              <div className="input">
                Allowed Class Strength: <input type="text" />
              </div>
              <div className="input-tt">
                Time Table:{" "}
                <button type="button" class="btn btn-outline-dark">
                  {" "}
                  Create{" "}
                </button>
              </div>
              <div className="input">
                <button type="button" class="btn btn-outline-dark">
                  {" "}
                  Create Class{" "}
                </button>{" "}
              </div>
            </div> */}
            {/* <div className="tt-modal">
              <h3>Add Timings</h3><br/>
              <div className="tt-input">Monday <input type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
              <div className="tt-input">Tuesday <input type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
              <div className="tt-input">Wednesday <input type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
              <div className="tt-input">Thursday <input type="text" placeholder="10:00 am - 11:00 am"  /></div><br/>
              <div className="tt-input">Friday <input type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
              <div className="tt-input">Saturday <input type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
              <div className="input">
                <button type="button" class="tt-btn btn btn-outline-dark">
                  {" "}
                  Create Time Table{" "}
                </button>{" "}
              </div>
            </div> */}
            <h2 className="">YOUR CLASSES</h2>
            <div className="class">
              {/* <div className="class-btn">IT-I</div>
              <div className="class-btn">CSE-II</div>
              <div className="class-btn">ECE</div>
              <div className="class-btn">IT-IV</div>
              <div className="class-btn">CSE-I</div> */}
            </div>
          </div>
          <div className="class-details"></div>
          <div className="spacer layer flip bottom"></div>
        </div>
      </div>
    </>
  );
};

export default Thomepage;
