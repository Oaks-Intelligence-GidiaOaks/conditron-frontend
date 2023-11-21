import * as images from "../../../../assets";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as routes from "../../../../routes/CONSTANT";
import "./Menu.css";

function Menu() {
  const [selectedOption, setSelectedOption] = useState("0");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [pathname, setPathName] = useState();
  const location = useLocation();

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  console.log(pathname, "path");

  return (
    <>
      <section className="bg-white">
        <div className="container-fluid">
          <div className="d-flex me-lg-3 ms-lg-3 py-3 justify-content-between align-items-center">
            <div className="items d-flex align-items-center ms-lg-5 d-none d-md-none d-lg-flex">
              <NavLink
                to={routes.DASHBOARD}
                exact
                activeclassname="active"
                className="menu-links me-5"
              >
                <img
                  src={
                    pathname === routes.DASHBOARD
                      ? images.dashboard_active
                      : images.dashboard
                  }
                  alt=""
                  className="me-1"
                />
                Dashboard
              </NavLink>
              <NavLink
                to={routes.ASSETS}
                exact
                activeclassname="active"
                className="menu-links me-5"
              >
                <img
                  src={
                    pathname === routes.ASSETS
                      ? images.asset_active
                      : images.assets
                  }
                  alt=""
                  className="me-1"
                />
                Assets
              </NavLink>
              <NavLink
                to={routes.ASSETS}
                exact
                activeclassname="active"
                className="menu-links me-5"
              >
                <img
                  src={
                    pathname === routes.RISK_ANALYSIS
                      ? images.risk_active
                      : images.risk
                  }
                  alt=""
                  className="me-1"
                />
                Risk Analysis
              </NavLink>
              <NavLink
                to={routes.DOCS_CENTER}
                exact
                activeclassname="active"
                className="menu-links me-5"
              >
                <img
                  src={
                    pathname === routes.DOCS_CENTER
                      ? images.docs_active
                      : images.docs_center
                  }
                  alt=""
                  className="me-1"
                />
                Document center
              </NavLink>
              <NavLink
                to={routes.ASSETS}
                exact
                activeclassname="active"
                className="menu-links me-5"
              >
                <img
                  src={
                    pathname === routes.SETTINGS
                      ? images.settings_active
                      : images.settings
                  }
                  alt=""
                  className="me-1 svg"
                />
                Settings
              </NavLink>
              <button className="btn">
                <img src={images.logout} alt="" /> Logout
              </button>
            </div>
            <div className="extras d-flex me-lg-5">
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
    </>
  );
}

export default Menu;
