import "./OnboardingBanner.css";
import * as images from "../../../../assets";
import { useSelector } from "react-redux";

function OnboardingBanner() {
  const state = useSelector((state) => state.register);

  return (
    <section className="bg-onboarding">
      <div className="container-fluid">
        <div className="d-flex justify-content-between py-4 px-lg-5">
          <div className="">
            <img src={images.logo} alt="logo" className="img-fluid w-sm-25" />
            <h4 className="onboarding-title pt-3 d-none d-md-none d-lg-flex">
              Complete Your Registration
            </h4>
          </div>
          <div className="">
            <div className="d-flex">
              <img
                src={images.avatar_big}
                alt=""
                className="d-none d-md-flex d-lg-flex"
              />
              <div className="avatar pt-lg-2 ms-3">
                <p className="avatar-name mb-1">
                  {state.first_name} {state.last_name}
                </p>
                <p className="avatar-status">Incomplete profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OnboardingBanner;
