import * as images from "../../../../assets";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

function Header() {
  return (
    <section className="dashboard-nav">
      <div className="container-fluid">
        <div className="d-flex py-3 ms-lg-5 me-lg-5 justify-content-between align-items-center">
          <div className="ms-lg-5">
            <img
              src={images.dashboard_logo}
              alt="logo"
              className=" w-75 w-sm-25"
            />
          </div>
          <div className="">
            <div className="input-group search-input-group d-none d-md-none d-lg-flex">
              <span
                className="input-group-text serach-btn border-end-0"
                id="basic-addon1"
              >
                <img src={images.search} alt="" />
              </span>
              <input
                type="text"
                className="form-control search-input border-start-0"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <button className="btn d-block d-sm-inline d-md-inline d-lg-none">
              <FaSearch className="search-icon" />
            </button>
          </div>
          <div className="me-lg-5">
            <img src={images.refresh} className="d-none" alt="refresh" />
            <img
              src={images.notification}
              alt="notification"
              className="px-lg-4 px-sm-5"
            />
            <img src={images.avatar} alt="avatar" className="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
