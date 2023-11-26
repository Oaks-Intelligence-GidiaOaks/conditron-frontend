import { useState } from "react";
import * as images from "../../../../assets";
import "./BreadCrumb.css";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../../../static/logout";

function BreadCrumb() {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState("0");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const logout = () => {
    handleLogout(dispatch);
  };

  return (
    <section className="dashboard-crumb">
      <div className="container-fluid">
        <div className="d-flex ms-lg-3 me-lg-3 py-3 justify-content-between align-items-center">
          <div className="ms-lg-5">
            <h5 className="crumb-title">Home</h5>
            <p className="crumb-text d-none d-md-flex">
              Hi, welcome to asset risk assessment platform
            </p>
          </div>
          <div className="d-flex me-lg-5">
            <button className="btn" onClick={() => logout()}>
              <img src={images.logout} alt="" /> Log out
            </button>
            <select
              className="form-select select-box me-lg-3 ms-lg-4"
              aria-label="Default select example"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="0">My Assets</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <img src={images.stats} alt="stats" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BreadCrumb;
