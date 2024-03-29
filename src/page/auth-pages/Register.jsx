import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import * as routes from "../../routes/CONSTANT";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./auth.css";
import { dashboard_logo } from "../../assets";
import { updateFormdata } from "../../redux/slices/register.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "validate.js";
import { showAlert } from "../../static/alert";
import { stelasat_logo, stelasat_logo_sm } from "../../assets";

const constraints = {
  first_name: {
    presence: true,
  },
  last_name: {
    presence: true,
  },
  email: {
    presence: true,
    email: true,
  },
  phone_number: {
    presence: true,
  },
};

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
    dispatch(updateFormdata(values));
    navigate(routes.SETUP_PASSWORD);
    showAlert("Cool", "Enter a password to continue", "success");
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className="bg-auth">
        <div className="container-fluid">
          <div className="logo text-center text-lg-start pt-4 px-lg-5">
            <img src={dashboard_logo} alt="" />
          </div>

          <div className="row justify-content-center align-items-center pb-5">
            <div className="col-lg-5">
              <h1 className="auth-heading">
                Welcome to <br /> Conditron
              </h1>
              <p className="auth-text pt-3">
                Your one stop platform for your asset risk <br /> assesment
              </p>
            </div>

            <div className="col-lg-5">
              <div className="card shadow auth-card">
                <div className="p-lg-5 p-3">
                  <h1 className="auth-title text-center pt-2">Get Started</h1>
                  <p className="auth-subtitle pt-3 text-center">
                    (Fill out the below details to get started)
                  </p>

                  <div className="p-lg-4">
                    <Form
                      onSubmit={onSubmit}
                      validate={validateForm}
                      // initialValues={state || {}}
                      render={({ handleSubmit, form, submitting }) => (
                        <form onSubmit={handleSubmit} autoComplete="off">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              First name <span className="required">*</span>
                            </label>
                            <Field
                              name="first_name"
                              component="input"
                              type="text"
                              className="form-control shadow-none"
                              placeholder="Enter First Name"
                            />
                            {form.getState().submitFailed &&
                              form.getState().errors.first_name && (
                                <span className="text-danger">
                                  {form.getState().errors.first_name}
                                </span>
                              )}
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Last name <span className="required">*</span>
                            </label>
                            <Field
                              name="last_name"
                              component="input"
                              type="text"
                              className="form-control shadow-none"
                              placeholder="Enter Last Name"
                            />
                            {form.getState().submitFailed &&
                              form.getState().errors.last_name && (
                                <span className="text-danger">
                                  {form.getState().errors.last_name}
                                </span>
                              )}
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Email <span className="required">*</span>
                            </label>
                            <Field
                              name="email"
                              component="input"
                              type="email"
                              className="form-control shadow-none"
                              placeholder="Enter email"
                            />
                            {form.getState().submitFailed &&
                              form.getState().errors.email && (
                                <span className="text-danger">
                                  {form.getState().errors.email}
                                </span>
                              )}
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Phone Number <span className="required">*</span>
                            </label>
                            {/* <Field
                              name="country"
                              render={({ input }) => (
                                <Select
                                  options={CountryList().getData()}
                                  value={input.value}
                                  onChange={(selectedOption) =>
                                    input.onChange(selectedOption)
                                  }
                                  isSearchable
                                  placeholder="Select a country..."
                                />
                              )}
                            /> */}
                            <Field
                              name="phone_number"
                              className="form-control shadow-none"
                              render={({ input }) => (
                                <PhoneInput
                                  {...input}
                                  country={
                                    input.value ? input.value.value : null
                                  }
                                  placeholder="Enter phone number"
                                />
                              )}
                            />
                            {form.getState().submitFailed &&
                              form.getState().errors.phone_number && (
                                <span className="text-danger">
                                  {form.getState().errors.phone_number}
                                </span>
                              )}
                          </div>

                          {/* <div className="d-flex justify-content-between">
                            <button
                              type="submit"
                              className="btn submit-btn-cancel mt-3"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn submit-btn mt-3"
                            >
                              Create
                            </button>
                          </div> */}

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
                                "Create"
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                    />
                  </div>
                  <p className="pt-4 text-center">
                    <Link to={routes.LOGIN} className="link">
                      Sign in
                    </Link>
                    <span className="link-text ms-2">
                      if you already have an account
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center pt-4 pb-3">
              <p className="text-sm mb-0">
                A product of{" "}
                <span style={{ backgroundColor: "#2F4F4F", padding: "5px" }}>
                  <img
                    src={stelasat_logo}
                    alt="Stelasat Logo"
                    // width={25}
                    height={25}
                  />
                </span>
              </p>
              <p className="text-center text-sm">
                Copyright &copy; Stellarsat Limited {currentYear}. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
