import { Header, DashboardMenu } from "../../../components/layout";
import * as images from "../../../assets";
import "../page.css";
import { useState, useEffect } from "react";
import {
  VerifiedOrganizationBlock,
  UnverifiedOrganizationBlock,
} from "../../../blocks";

function Organizations() {
  const [index, setIndex] = useState(0);
  const tabs = ["Pending Verifications", "Verified Registrations"];
  const Component = {
    0: <UnverifiedOrganizationBlock />,
    1: <VerifiedOrganizationBlock />,
  }[index];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <>
      <Header />
      <DashboardMenu />
      <div className="container-fluid pt-2 pb-2">
        <div className="row px-lg-5">
          <div className="icon-back text-start">
            <button className="btn">
              <img src={images.back} alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center align-items-center px-lg-5">
          <div className="data-box">
            <div className="p-2 d-flex justify-content-between">
              <div className="box-1">
                <p className="header d-flex">
                  <span className="d-none d-md-none d-lg-block me-1">
                    Total Registered
                  </span>
                  Users
                </p>
                <p className="subtitle text-center">
                  1243
                  <span className="users ms-1 d-none d-md-none d-lg-inline-flex">
                    users
                  </span>
                </p>
              </div>

              <div className="box-2">
                <p className="header">Verified</p>
                <p className="subtitle text-center">
                  42
                  <span className="users ms-1 d-none d-md-none d-lg-inline-flex">
                    users
                  </span>
                </p>
              </div>

              <div className="box-3">
                <p className="header"> Unverified</p>
                <p className="subtitle text-center">
                  10
                  <span className="users ms-1 d-none d-md-none d-lg-inline-flex">
                    users
                  </span>
                </p>
              </div>

              <div className="box-4">
                <p className="header d-flex">
                  New
                  <span className="users d-none d-md-none d-lg-block ms-1">
                    Registrations
                  </span>
                </p>
                <p className="subtitle text-center">
                  23
                  <span className="pb-1 ms-2">
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.6875 7.71875C12.5 7.90625 12.25 8 12 8C11.7188 8 11.4688 7.90625 11.2812 7.71875L8 4.4375V14C8 14.5625 7.53125 15 7 15C6.5 15 6 14.5625 6 14V4.4375L2.6875 7.71875C2.3125 8.125 1.65625 8.125 1.28125 7.71875C0.875 7.34375 0.875 6.6875 1.28125 6.3125L6.28125 1.3125C6.65625 0.90625 7.3125 0.90625 7.6875 1.3125L12.6875 6.3125C13.0938 6.6875 13.0938 7.34375 12.6875 7.71875Z"
                        fill="#49AA4C"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row justify-content-center pt-5 pb-4">
          <div className="d-flex justify-content-center gap-4 pb-5">
            {tabs.map((item, idx) => (
              <button
                className={`btn btn-pending ${index === idx && "activetab"} `}
                key={idx}
                onClick={() => {
                  setIndex(idx);
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {Component}
        </div>
      </div>
    </>
  );
}

export default Organizations;
