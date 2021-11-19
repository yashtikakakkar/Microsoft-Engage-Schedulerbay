import "./class.css";
import logo from "./logo.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

let Class = () => {
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
            <h2>C L A S S &gt; IT-II</h2>
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
                    <td>10:00am - 11:00am</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>10:00am - 11:00am</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>No Class</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>10:00am - 11:00am</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>10:00am - 11:00am</td>
                  </tr>
                  <tr>
                    <td>Saturday</td>
                    <td>No Class</td>
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
