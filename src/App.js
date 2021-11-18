import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/components/home";
import TeacherSignup from "../src/components/teachersignup";
import StudentSignup from "../src/components/studentsignup";
import Thomepage from "./components/thomepage";
import Class from "./components/class";
import Shomepage from "./components/shomepage";
import Subject from "./components/subject";

let App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="teachersignup/*" element={<TeacherSignup />} />
          <Route path="studentsignup/*" element={<StudentSignup />} />
          <Route path="teacher/*" element={<Thomepage />} />
          <Route path="class/*" element={<Class />} />
          <Route path="student/*" element={<Shomepage />} />
          <Route path="subject/*" element={<Subject />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
