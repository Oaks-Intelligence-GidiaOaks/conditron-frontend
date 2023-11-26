import { OnboardingBanner } from "../../components/layout";
import * as images from "../../assets";
import { Form, Field } from "react-final-form";
import "./onboarding.css";
import { useDispatch } from "react-redux";
// import { logoutUser } from "../../redux/slices/user.slice";
import { updateOnboarding } from "../../redux/slices/onboarding.slice";
import { showAlert } from "../../static/alert";
import validate from "validate.js";
import * as routes from "../../routes/CONSTANT";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../static/logout";

const constraints = {
  organization_name: {
    presence: true,
  },
  admin_name: {
    presence: true,
  },
  admin_email: {
    presence: true,
    email: true,
  },
  admin_phone: {
    presence: true,
  },
  date_of_incorporation: {
    presence: true,
  },
};

function ProfileDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
    dispatch(updateOnboarding(values));
    showAlert(
      "Profile details submitted!",
      "Pls enter address details",
      "success"
    );
    navigate(routes.ONBOARDING_ADDRESS_DETAILS);
  };

  const logout = () => {
    handleLogout(dispatch);
  };
  const validateForm = (values) => {
    return validate(values, constraints) || {};
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
                validate={validateForm}
                render={({ handleSubmit, form, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Entity name <span className="required">*</span>
                      </label>
                      <Field
                        name="organization_name"
                        component="input"
                        type="text"
                        className="form-control input shadow-none"
                        placeholder="Business name"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.organization_name && (
                          <span className="text-danger">
                            {form.getState().errors.organization_name}
                          </span>
                        )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Contact name (Main) <span className="required">*</span>
                      </label>
                      <Field
                        name="admin_name"
                        component="input"
                        type="text"
                        className="form-control input shadow-none"
                        placeholder="Enter name"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.admin_name && (
                          <span className="text-danger">
                            {form.getState().errors.admin_name}
                          </span>
                        )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Contact Email (Main) <span className="required">*</span>
                      </label>
                      <Field
                        name="admin_email"
                        component="input"
                        type="email"
                        className="form-control input shadow-none"
                        placeholder="Enter email"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.admin_email && (
                          <span className="text-danger">
                            {form.getState().errors.admin_email}
                          </span>
                        )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Contact Phone (Main) <span className="required">*</span>
                      </label>
                      <Field
                        name="admin_phone"
                        component="input"
                        type="number"
                        className="form-control input shadow-none"
                        placeholder="Enter Phone"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.admin_phone && (
                          <span className="text-danger">
                            {form.getState().errors.admin_phone}
                          </span>
                        )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Date of Incorporation
                        <span className="required">*</span>
                      </label>
                      <Field
                        name="date_of_incorporation"
                        component="input"
                        type="date"
                        className="form-control input shadow-none"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.date_of_incorporation && (
                          <span className="text-danger">
                            {form.getState().errors.date_of_incorporation}
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

export default ProfileDetails;
