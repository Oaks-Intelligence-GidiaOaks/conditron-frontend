import "./Menu.css";
import * as images from "../../../../assets";
import * as routes from "../../../../routes/CONSTANT";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Mobile() {
  const [pathname, setPathName] = useState();
  const location = useLocation();

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <img src={images.dashboard_logo} className="img-fluid" alt="" />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column align-items-start pt-4">
            <NavLink
              to={routes.DASHBOARD}
              exact="true"
              activeclassname="active"
              className="menu-links me-5 pb-3"
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

            {user && user?.role !== "SuperAdmin" ? (
              <>
                <NavLink
                  to={routes.ASSETS}
                  exact="true"
                  activeclassname="active"
                  className="menu-links me-5 pb-3"
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
                  to={routes.VARIABLES}
                  exact="true"
                  activeclassname="active"
                  className="menu-links me-5 pb-3"
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
                  exact="true"
                  activeclassname="active"
                  className="menu-links me-5 pb-3"
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
                  exact="true"
                  activeclassname="active"
                  className="menu-links me-5 pb-3"
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
                  to={routes.RISK_ANALYSIS}
                  exact="true"
                  activeclassname="active"
                  className="menu-links me-5 pb-3"
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
                  exact="true"
                  activeclassname="active"
                  className="menu-links me-5 pb-3"
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
                  exact="true"
                  activeclassname="active"
                  className="menu-links me-5 pb-3"
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
                  to={routes.ORGANIZATIONS}
                  exact="true"
                  activeclassname="active"
                  className="menu-links me-5 pb-3"
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Mobile;
