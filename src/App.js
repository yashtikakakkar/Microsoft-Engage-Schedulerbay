import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/components/home";
import Thomepage from "./components/thomepage";
import Class from "./components/class";
import Shomepage from "./components/shomepage";
import Subject from "./components/subject";
import Tdetails from "./components/tdetails";
import Sdetails from "./components/sdetails";
import { useState } from "react";
import { Context } from "./components/context";

let App = () => {
  const [tuid, setTuid] = useState("null");
  const [suid, setSuid] = useState("null");

  return (
    <>
      {/* <Navbar /> */}
      <Context.Provider value={([tuid, setTuid], [suid, setSuid])}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="class/*" element={<Class />} />
            <Route path="teacher/*" element={<Thomepage />} />
            <Route path="student/*" element={<Shomepage />} />
            <Route path="subject/*" element={<Subject />} />
            <Route path="teacherDetails/*" element={<Tdetails />} />
            <Route path="studentDetails/*" element={<Sdetails />} />
          </Routes>
        </Router>
      </Context.Provider>
    </>
  );
};

export default App;
