import * as images from "../../../../assets";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BreadCrumb.css";

function BreadCrumb() {
  return (
    <section className="dashboard-crumb">
      <div className="container-fluid">
        <div className="d-flex ms-5 me-5 py-3 justify-content-between align-items-center">
          <div className="">
            <h5 className="crumb-title">Home</h5>
            <p className="crumb-text">
              Hi, welcome to asset risk assessment platform
            </p>
          </div>
          <div className="">
            <div className="d-flex">
              <button className="btn">
                <img src={images.logout} alt="" /> Logout
              </button>
              <select
                className="form-select select-box me-3 ms-4"
                aria-label="Default select example"
              >
                <option selected>My Assets</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <img src={images.stats} alt="stats" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BreadCrumb;
