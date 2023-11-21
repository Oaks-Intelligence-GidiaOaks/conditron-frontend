import { OnboardingBanner } from "../../components/layout";
import * as images from "../../assets";
import { Form, Field } from "react-final-form";
import "./onboarding.css";

function AddressDetails() {
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
              src={images.step_2}
              alt=""
              className="d-none d-md-none d-lg-flex"
            />
          </div>
          <div className="col-lg-5">
            <h5 className="step-form-heading">Address Details</h5>
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
                        Country of formation <span className="required">*</span>
                      </label>
                      <Field
                        name="country"
                        component="select"
                        type="text"
                        className="form-control input shadow-none"
                      >
                        <option value="argentina">argentina</option>
                        <option value="germany">germany</option>
                        <option value="england">england</option>
                      </Field>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        City/Province/State <span className="required">*</span>
                      </label>
                      <Field
                        name="state"
                        component="select"
                        type="text"
                        className="form-control input shadow-none"
                      >
                        <option value="argentina">bisas</option>
                        <option value="makta">makta</option>
                        <option value="jahfk">jahfk</option>
                      </Field>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        First Line of Address{" "}
                        <span className="required">*</span>
                      </label>
                      <Field
                        name="address"
                        component="input"
                        type="email"
                        className="form-control input shadow-none"
                        placeholder="Enter Address"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Post code/Zip Code <span className="required">*</span>
                      </label>
                      <Field
                        name="postal_code"
                        component="input"
                        type="text"
                        className="form-control input shadow-none"
                        placeholder="Enter postal code"
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

export default AddressDetails;
