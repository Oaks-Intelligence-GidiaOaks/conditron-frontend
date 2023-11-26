import { useState, useEffect, useMemo } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./auth.css";
import { dashboard_logo } from "../../assets";
import validate from "validate.js";
import { updateFormdata } from "../../redux/slices/register.slice";
import { useDispatch, useSelector } from "react-redux";
import rtkMutation from "../../utils/rtkMutation";
import { useRegisterUserMutation } from "../../service/user.service";
import { showAlert } from "../../static/alert";
import * as routes from "../../routes/CONSTANT";
import { useNavigate, Link } from "react-router-dom";

const constraints = {
  password: {
    presence: true,
    length: {
      minimum: 6,
    },
  },
  confirm_password: {
    equality: "password",
  },
};

function SetupPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [registerUser, { error, isSuccess }] = useRegisterUserMutation({
    provideTag: ["User"],
  });

  const state = useSelector((state) => state.register);

  const onSubmit = async (values) => {
    try {
      console.log(values);
      await rtkMutation(registerUser, state);
    } catch (error) {
      // console.log(error);
      showAlert("Oops", error.message || "An error occurred", "error");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(routes.LOGIN);
      showAlert(
        "Account created successfully!",
        "Pls login to continue",
        "success"
      );
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
      // console.log(error.data.message);
    }
  }, [error, isSuccess, navigate]);

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const formSpyComponent = useMemo(
    () => (
      <FormSpy subscription={{ values: true }}>
        {({ values }) => {
          dispatch(updateFormdata(values));
          return null;
        }}
      </FormSpy>
    ),
    [dispatch]
  );

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
                      onSubmit={(values, form) => onSubmit(values, form)}
                      validate={validateForm}
                      render={({ handleSubmit, form, submitting }) => (
                        <form onSubmit={handleSubmit}>
                          {formSpyComponent}

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
                            {form.getState().submitFailed &&
                              form.getState().errors.password && (
                                <span className="text-danger">
                                  {form.getState().errors.password}
                                </span>
                              )}
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
                            {form.getState().submitFailed &&
                              form.getState().errors.confirm_password && (
                                <span className="text-danger">
                                  {form.getState().errors.confirm_password}
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
                                "Confirm"
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                    />
                  </div>
                  <p className="pt-4 text-center">
                    <Link to={routes.REGISTER} className="link btn bg-light">
                      Go Back
                    </Link>
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

export default SetupPassword;
