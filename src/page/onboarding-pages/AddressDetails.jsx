import { OnboardingBanner } from "../../components/layout";
import * as images from "../../assets";
import { Form, Field } from "react-final-form";
import "./onboarding.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateOnboarding } from "../../redux/slices/onboarding.slice";
import { showAlert } from "../../static/alert";
import * as routes from "../../routes/CONSTANT";
import validate from "validate.js";
import { countries } from "../../static/countries";
import { handleLogout } from "../../static/logout";

const constraints = {
  country: {
    presence: true,
  },
  state: {
    presence: true,
  },
  address: {
    presence: true,
  },
  postal_code: {
    presence: true,
  },
};

function AddressDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
    dispatch(updateOnboarding(values));
    showAlert(
      "Address details submitted!",
      "Pls submit the following documents",
      "success"
    );
    navigate(routes.DOCUMENTATION_PAGE_ONE);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const logout = () => {
    handleLogout(dispatch);
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
            <button className="btn" onClick={() => logout()}>
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
                validate={validateForm}
                render={({ handleSubmit, form, submitting }) => (
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
                        <option value="">- select country -</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </Field>
                      {form.getState().submitFailed &&
                        form.getState().errors.country && (
                          <span className="text-danger">
                            {form.getState().errors.country}
                          </span>
                        )}
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
                        component="input"
                        type="text"
                        className="form-control input shadow-none"
                        placeholder="Enter State"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.state && (
                          <span className="text-danger">
                            {form.getState().errors.state}
                          </span>
                        )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        First Line of Address
                        <span className="required">*</span>
                      </label>
                      <Field
                        name="address"
                        component="input"
                        type="text"
                        className="form-control input shadow-none"
                        placeholder="Enter Address"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.address && (
                          <span className="text-danger">
                            {form.getState().errors.address}
                          </span>
                        )}
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
                        type="number"
                        className="form-control input shadow-none"
                        placeholder="Enter postal code"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.postal_code && (
                          <span className="text-danger">
                            {form.getState().errors.postal_code}
                          </span>
                        )}
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn submit-btn mt-3"
                        // disabled={submitting || pristine}
                      >
                        {submitting ? (
                          <>
                            <span className="loading-dots">
                              <span className="loading-dots-dot"></span>
                              <span className="loading-dots-dot"></span>
                              <span className="loading-dots-dot"></span>
                            </span>
                          </>
                        ) : (
                          "Next"
                        )}
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
