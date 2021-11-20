import "./thomepage.css";
import logo from "./logo.png";
import firebase from "../firebase";
import { useEffect } from "react";

let Thomepage = () => {
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
      Class Name: <input class="name" type="text" />
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
      Total Class Strength: <input type="text" class="total"/>
    </div>
    <div className="input" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
      Allowed Class Strength: <input type="text"  class="allowed"/>
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

      let name = document.querySelector(".name");
      let type = document.querySelector(".class-type");
      let total = document.querySelector(".total");
      let allowed = document.querySelector(".allowed");

      db.collection("classes").add({
        name: name.value,
        type: type.options[type.selectedIndex].text,
        subject: "Web Development",
        allowedStrength: allowed.value,
        totalStrength: total.value,
      });

      let classIcon = document.createElement("div");
      classIcon.classList.add("class-btn");
      classIcon.innerText = name.value;

      div.remove();

      let classdiv = document.querySelector(".class");
      classdiv.append(classIcon);
    });

    let addTTBtn = document.querySelector(".add-tt");
    addTTBtn.addEventListener("click", (e) => {
      e.preventDefault();

      div.remove();

      let ttModal = document.createElement("div");
      ttModal.classList.add("tt-modal");

      ttModal.innerHTML = `<h3>Add Timings</h3><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Monday <input type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Tuesday <input type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Wednesday <input type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Thursday <input type="text" placeholder="10:00 am - 11:00 am"  /></div><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Friday <input type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
      <div className="tt-input" style="width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-content: space-around;">Saturday <input type="text" placeholder="10:00 am - 11:00 am" /></div><br/>
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

      let ttBtn = document.querySelector(".tt-btn");
      ttBtn.addEventListener("click", (e) => {
        e.preventDefault();

        ttModal.remove();

        grid.append(div);
      });
    });
  }

  function loadClasses(e) {

    function renderClass(doc) {

      // console.log(doc.data());
      for (let i = 0; i < doc.data().classes.length; i++) {
        let div = document.createElement("div");
        div.classList.add("class-btn");
        div.innerText = doc.data().classes[i];
        let grid = document.querySelector(".class");
        grid.append(div);
      }
    }

    db.collection("teachers")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id === 'ZnckMOI3uHUB9boYr1Tw')
            renderClass(doc);
        });
      });
  }

  useEffect(() => {
    loadClasses();
  });

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
                  onClick={addClass}
                  class="btn btn-outline-light create-btn"
                >
                  Add New Class
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
