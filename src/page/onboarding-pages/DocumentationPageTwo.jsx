import { OnboardingBanner } from "../../components/layout";
import * as images from "../../assets";
// import { Form, Field } from "react-final-form";
import "./onboarding.css";

function DocumentationPageTwo() {
  return (
    <>
      <OnboardingBanner />
      <div className="container-fluid">
        <div className="d-flex justify-content-between px-lg-5 pt-2 pb-2">
          <div className="icon-back">
            <button className="btn">
              <img src={images.back} alt="" />
            </button>
          </div>
          <div className="d-flex">
            <button className="btn">
              <img src={images.logout} alt="" /> Log out
            </button>
          </div>
        </div>
        <div className="instructions px-lg-5">
          {/* <p className="instructions-text px-lg-5">
            Please provide us with the following information to help complete
            your account opening
          </p> */}
        </div>
        <div className="row justify-content-center pt-5 px-lg-5 pb-5 align-items-center">
          <div className="col-lg-5">
            <img
              src={images.step_4}
              alt=""
              className="d-none d-md-none d-lg-flex"
            />
          </div>
          <div className="col-lg-5">
            <h5 className="step-form-heading">
              Thanks for providing the necessary information. We'll review the
              details and documents and reach out to you once the verification
              process is complete.
            </h5>
            <div className="step-form-box pt-3 text-center">
              <img
                src={images.docx}
                className="img-fluid"
                width={"200"}
                height={"300"}
                alt=""
              />

              <div className="text-center">
                <button type="submit" className="btn submit-btn mt-3">
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocumentationPageTwo;
