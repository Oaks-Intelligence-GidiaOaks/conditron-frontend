import * as images from "../../../../assets";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as routes from "../../../../routes/CONSTANT";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
import Mobile from "./Mobile";
import { useSelector } from "react-redux";

function Variations() {
  const [pathname, setPathName] = useState();
  const location = useLocation();

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  const user = useSelector((state) => state.user.user);

  return (
    <>
      <section className="bg-white">
        <div className="container-fluid">
          <div className="d-flex me-lg-3 ms-lg-3 pb-4 justify-content-between align-items-center">
            <div className="items d-flex align-items-center ms-lg-5 d-none d-md-none d-lg-flex">
              {user && user?.role !== "SuperAdmin" && (
                <>
                  <NavLink
                    to={routes.VARIABLES}
                    exact
                    activeclassname="active"
                    className="menu-links me-5"
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
                    className="menu-links me-5"
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
                    className="menu-links me-5"
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
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* mobile nav */}
      <Mobile />
    </>
  );
}

export default Variations;
