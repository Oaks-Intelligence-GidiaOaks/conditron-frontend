import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import * as routes from "../../routes/CONSTANT";
// import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import CountryList from "react-select-country-list";
import "./auth.css";
import { dashboard_logo } from "../../assets";

function Register() {
  const onSubmit = (values) => {
    console.log(values);
  };

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
                      render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
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
                              name="phone"
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
                          </div>

                          <div className="d-flex justify-content-between">
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
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
