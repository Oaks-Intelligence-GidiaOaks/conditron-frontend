import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import * as routes from "../../routes/CONSTANT";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./auth.css";
import { dashboard_logo } from "../../assets";
import { useLoginUserMutation } from "../../service/user.service";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import rtkMutation from "../../utils/rtkMutation";
import { formatErrorResponse } from "../../utils/formatErrorResponse";
import validate from "validate.js";
import { showAlert } from "../../static/alert";

const constraints = {
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
};

function Login() {
  const [loginUser, { isLoading, error, isSuccess }] = useLoginUserMutation({
    provideTag: ["User"],
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await rtkMutation(loginUser, values);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Login Successful!", "success");
      navigate(routes.DASHBOARD);
    }
  }, [isSuccess, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                Welcome to <br /> Conditron
              </h1>
              <p className="auth-text pt-3">
                Your one stop platform for your asset risk <br /> assesment
              </p>
            </div>

            <div className="col-lg-5">
              <div className="card shadow auth-card mt-2">
                <div className="p-lg-5 p-3">
                  <h1 className="auth-title text-center pt-2">Login</h1>
                  <p className="auth-subtitle pt-3 text-center">
                    (Please enter account details to login)
                  </p>

                  <div className="p-lg-4">
                    <Form
                      onSubmit={onSubmit}
                      validate={validateForm}
                      render={({
                        handleSubmit,
                        form,
                        submitting,
                        pristine,
                      }) => (
                        <form onSubmit={handleSubmit}>
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
                              placeholder="Enter Email"
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
                              Password <span className="required">*</span>
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
                            {form.getState().submitFailed &&
                              form.getState().errors.password && (
                                <span className="text-danger">
                                  {form.getState().errors.password}
                                </span>
                              )}
                          </div>

                          {error && (
                            <div className="input_error text-danger text-center">
                              {formatErrorResponse(error)}
                            </div>
                          )}

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
                                "Confirm"
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                    />
                  </div>
                  <p className="pt-4 text-center">
                    <Link to={routes.REGISTER} className="link">
                      Sign up
                    </Link>
                    <span className="link-text ms-2">
                      if you don’t have an account
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

export default Login;
