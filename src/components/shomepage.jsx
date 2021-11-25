import "./thomepage.css";
import logo from "./logo.png";
import firebase from "../firebase";
import { useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Context } from "./context";

let Shomepage = () => {
  const db = firebase.firestore();
  const [suid, setSuid] = useContext(Context);
  const navigate = useNavigate();

  function addSubject(e) {
    e.preventDefault();

    let preModal = document.querySelector(".class-modal");

    if (preModal != null) {
      return;
    }

    let div = document.createElement("div");
    div.classList.add("class-modal");

    div.innerHTML = `<h3>Join Class</h3>
    <div className="input" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
      Subject Name: <input class="name" type="text" />
    </div>
    <div className="input" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
      Subject Code: <input type="text" class="code"/>
    </div>
    <div className="input" style="width: 70%; display: flex; align-items: center; justify-content: space-between; align-content: space-around;">
      <button type="button" style="display: flex; align-items: center; width: 100%; align-content: space-around; flex-direction: column;" class="btn btn-outline-dark submit">
        Add Subject
      </button>
    </div>`;

    let grid = document.querySelector(".t-content");

    grid.append(div);

    let createBtn = document.querySelector(".submit");

    createBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let Name = document.querySelector(".name");
      let Code = document.querySelector(".code");

      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          db.collection("students")
            .doc(user.email)
            .update({
              subjects: firebase.firestore.FieldValue.arrayUnion(Name.value),
            });

          db.collection("students")
            .doc(user.email)
            .collection("ids")
            .doc(Name.value)
            .set({ id: Code.value });

          db.collection("classes")
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                if (doc.id == Code.value) {
                  alert("Class Added");
                }
              });
            });
        }
      });

      let subjectIcon = document.createElement("div");
      subjectIcon.classList.add("class-btn");
      subjectIcon.id = Code.value;
      subjectIcon.innerText = Name.value;
      div.remove();

      let subjectdiv = document.querySelector(".class");
      subjectdiv.append(subjectIcon);
    });
  }

  function loadSubjects(e) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        db.collection("/students/" + user.email + "/ids")
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              let subjectName = doc.id;
              let uid = doc.data().id;
              let div = document.createElement("div");
              div.classList.add("class-btn");
              div.id = uid;
              div.innerText = subjectName;
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
      setSuid(myid);
      navigate("../subject");
    }
  });

  useEffect(() => {
    loadSubjects();
  }, []);

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
                  onClick={addSubject}
                  class="btn btn-outline-light create-btn"
                >
                  Add New Subject
                </button>
              </div>
            </div>
            <hr />
          </div>
          <div className="t-content">
            <h2 className="">YOUR SUBJECTS</h2>
            <div className="class">
              {/* <div className="class-btn">WEB</div>
              <div className="class-btn">GRID</div>
              <div className="class-btn">WIRELESS</div>
              <div className="class-btn">ACN</div>
              <div className="class-btn">AI</div> */}
            </div>
          </div>
          <div className="class-details"></div>
          <div className="spacer layer flip bottom"></div>
        </div>
      </div>
    </>
  );
};

export default Shomepage;
