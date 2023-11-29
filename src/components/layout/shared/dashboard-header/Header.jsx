import * as images from "../../../../assets";
import { FaSearch } from "react-icons/fa";
import "./Header.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Notification from "./Notification";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as routes from "../../../../routes/CONSTANT";

function Header() {
  const navigate = useNavigate();
  const firstUse = useSelector((state) => state.user?.user?.firstUse);

  useEffect(() => {
    if (firstUse === true) {
      navigate(routes.ONBOARDING_PROFILE_DETAILS);
    }
  }, [firstUse, navigate]);

  return (
    <section className="dashboard-nav">
      <div className="container-fluid">
        <div className="d-flex py-3 ms-lg-3 me-lg-3 justify-content-between align-items-center">
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
            {/* <button
              type="button"
              className="btn d-block d-sm-inline d-md-inline d-lg-none"
            >
              <FaSearch className="search-icon" />
            </button> */}
          </div>
          <div className="me-lg-5">
            <img src={images.refresh} className="d-none" alt="refresh" />

            <Notification />
            <Avatar />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
