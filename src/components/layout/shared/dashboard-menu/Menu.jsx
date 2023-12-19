import * as images from "../../../../assets";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as routes from "../../../../routes/CONSTANT";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../../../static/logout";
import { useSelector } from "react-redux";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { GiHamburgerMenu } from "react-icons/gi";
import Mobile from "./Mobile";

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

  const dispatch = useDispatch();

  const logout = () => {
    handleLogout(dispatch);
  };

  const user = useSelector((state) => state.user.user);

  return (
    <>
      <section className="bg-white">
        <div className="container-fluid">
          <div className="d-flex me-lg-3 ms-lg-3 py-3 justify-content-between align-items-center">
            <div className="items d-flex align-items-center ms-lg-5 d-none d-md-none d-lg-flex">
              {user && user?.role !== "SuperAdmin" ? (
                <>
                  <NavLink
                    to={routes.DASHBOARD}
                    exact
                    activeclassname="active"
                    className="menu-links me-4"
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
                    to={routes.VARIABLES}
                    exact
                    activeclassname="active"
                    className="menu-links me-4"
                  >
                    <img
                      src={
                        pathname === routes.VARIABLES
                          ? images.variables_active
                          : images.variables
                      }
                      alt=""
                      className="me-1"
                    />
                    Variable
                  </NavLink>

                  <NavLink
                    to={routes.CENSORS}
                    exact
                    activeclassname="active"
                    className="menu-links me-4"
                  >
                    <img
                      src={
                        pathname === routes.CENSORS
                          ? images.censor_active
                          : images.censor
                      }
                      alt=""
                      className="me-1"
                    />
                    Sensor
                  </NavLink>
                  <NavLink
                    to={routes.MODELS}
                    exact
                    activeclassname="active"
                    className="menu-links me-4"
                  >
                    <img
                      src={
                        pathname === routes.MODELS
                          ? images.model_active
                          : images.model
                      }
                      alt=""
                      className="me-1"
                    />
                    Model
                  </NavLink>
                  <NavLink
                    to={routes.ASSETS}
                    exact
                    activeclassname="active"
                    className="menu-links me-4"
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
                    to={routes.RISK_ANALYSIS}
                    exact
                    activeclassname="active"
                    className="menu-links me-4"
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
                    className="menu-links me-4"
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
                    to={routes.SETTINGS}
                    exact
                    activeclassname="active"
                    className="menu-links me-4"
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
                </>
              ) : (
                <>
                  <NavLink
                    to={routes.DASHBOARD}
                    exact
                    activeclassname="active"
                    className="menu-links me-4"
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
                    to={routes.ORGANIZATIONS}
                    exact
                    activeclassname="active"
                    className="menu-links me-4"
                  >
                    <img
                      src={
                        pathname === routes.ORGANIZATIONS
                          ? images.users_active
                          : images.users
                      }
                      alt=""
                      className="me-1"
                    />
                    Organizations
                  </NavLink>
                </>
              )}

              <button className="btn" onClick={() => logout()}>
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
            <div className="d-flex justify-content-end d-block d-sm-inline d-md-inline d-lg-none">
              <button
                className="btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
              >
                <GiHamburgerMenu size={30} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* mobile nav */}
      <Mobile />
    </>
  );
}

export default Menu;
