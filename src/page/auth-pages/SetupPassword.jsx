import { useState } from "react";
import { Form, Field } from "react-final-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./auth.css";
import { dashboard_logo } from "../../assets";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <section className="bg-auth-small">
        <div className="container-fluid">
          <div className="logo text-center text-lg-start pt-4 px-lg-5">
            <img src={dashboard_logo} alt="" />
          </div>
          <div className="row justify-content-center align-items-center py-5">
            <div className="col-lg-5">
              <h1 className="auth-heading">
                Set up your <br /> password
              </h1>
              <p className="auth-text pt-3">
                Setting up your password will help guarantee your account
                security.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="card shadow auth-card mt-2">
                <div className="p-lg-5 p-3">
                  <h1 className="auth-title text-center pt-2">Password</h1>
                  <p className="auth-subtitle pt-3 text-center">
                    (Please enter a preferred password)
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
                              Enter Password <span className="required">*</span>
                            </label>
                            <div className="input-group">
                              <Field
                                name="password"
                                component="input"
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter Password"
                              />
                              <span
                                className="input-group-text"
                                id="basic-addon2"
                              >
                                <button
                                  type="button"
                                  className="btn"
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? (
                                    <FaEyeSlash className="password-icon" />
                                  ) : (
                                    <FaEye className="password-icon" />
                                  )}
                                </button>
                              </span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput1"
                              className="form-label"
                            >
                              Confirm Password
                              <span className="required">*</span>
                            </label>
                            <div className="input-group">
                              <Field
                                name="confirm_password"
                                component="input"
                                type={showConfirmPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter Password"
                              />
                              <span
                                className="input-group-text"
                                id="basic-addon2"
                              >
                                <button
                                  type="button"
                                  className="btn"
                                  onClick={toggleConfirmPasswordVisibility}
                                >
                                  {showConfirmPassword ? (
                                    <FaEyeSlash className="password-icon" />
                                  ) : (
                                    <FaEye className="password-icon" />
                                  )}
                                </button>
                              </span>
                            </div>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn submit-btn mt-3"
                            >
                              Confirm
                            </button>
                          </div>
                        </form>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
