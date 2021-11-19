import "./thomepage.css";
import logo from "./logo.png";

let Shomepage = () => {
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
                <button type="button" class="btn btn-outline-light create-btn">
                  Add New Subject
                </button>
              </div>
            </div>
            <hr />
          </div>
          <div className="t-content">
            <h2 className="">YOUR SUBJECTS</h2>
            <div className="class">
              <div className="class-btn">WEB</div>
              <div className="class-btn">GRID</div>
              <div className="class-btn">WIRELESS</div>
              <div className="class-btn">ACN</div>
              <div className="class-btn">AI</div>
            </div>
          </div>
          <div className="class-details">
              
          </div>
          <div className="spacer layer flip bottom"></div>
        </div>
      </div>
  </>
  );
};

export default Shomepage;
