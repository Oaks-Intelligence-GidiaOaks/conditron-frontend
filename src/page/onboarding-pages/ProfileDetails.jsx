import { OnboardingBanner } from "../../components/layout";
import * as images from "../../assets";
import { Form, Field } from "react-final-form";
import "./onboarding.css";

function ProfileDetails() {
  const onSubmit = (values) => {
    console.log(values);
  };

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
          <p className="instructions-text px-lg-5">
            Please provide us with the following information to help complete
            your account opening
          </p>
        </div>
        <div className="row justify-content-center pt-5 px-lg-5 align-items-center">
          <div className="col-lg-5">
            <img
              src={images.step_1}
              alt=""
              className="d-none d-md-none d-lg-flex"
            />
          </div>
          <div className="col-lg-5">
            <h5 className="step-form-heading">Profile Details</h5>
            <div className="step-form-box">
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Entity name <span className="required">*</span>
                      </label>
                      <Field
                        name="business_name"
                        component="input"
                        type="text"
                        className="form-control input shadow-none"
                        placeholder="Business name"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Contact name (Main) <span className="required">*</span>
                      </label>
                      <Field
                        name="contact_name"
                        component="input"
                        type="text"
                        className="form-control input shadow-none"
                        placeholder="Enter name"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Contact Email (Main) <span className="required">*</span>
                      </label>
                      <Field
                        name="contact_email"
                        component="input"
                        type="email"
                        className="form-control input shadow-none"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Date of formation <span className="required">*</span>
                      </label>
                      <Field
                        name="date_of_formation"
                        component="input"
                        type="date"
                        className="form-control input shadow-none"
                      />
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn submit-btn mt-3">
                        Next
                      </button>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
