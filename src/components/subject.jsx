import "./subject.css";
import logo from "./logo.png";

let Subject = () => {
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
          <div className="subject-content">
            <div className="form">
              <form>
                <div class="form-row col-md-6">
                  <div class="col-md-4 mb-3">
                    <label for="validationServer01">First name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationServer01"
                      placeholder="First name"
                      value="Mark"
                      contentEditable="true"
                      required
                    />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="validationServer02">Last name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationServer02"
                      placeholder="Last name"
                      value="Otto"
                      required
                    />
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="validationServerUsername">Subject</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        id="validationServerUsername"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend3"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="form-row col-md-6">
                  <div class="col-md-6 mb-3">
                    <label for="inputState">State</label>
                    <select id="inputState" class="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck3"
                        contentEditable
                        required
                      />
                      <label class="form-check-label" for="invalidCheck3">
                        Both Vaccinations Done
                      </label>
                    </div>
                  </div>
                </div>

                <button class="btn btn-primary" type="submit">
                  Check Availability
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;
