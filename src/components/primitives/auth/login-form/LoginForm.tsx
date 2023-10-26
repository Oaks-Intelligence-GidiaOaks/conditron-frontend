import "./LoginForm.scss";
import { Button, Input } from "@/components";
import { Form, Field } from "react-final-form";
// import { Link } from "react-router-dom";

const LoginForm = () => {
  const onSubmit = (values: { [key in string]: string | number }) => {
    console.log(values);
  };
  return (
    <div className="auth_form">
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit, valid }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="auth_form_title">Welcome Back </div>
            {/* <div className="auth_form_sub_title">Log into your account</div> */}
            <div className="field">
              <Field
                name="email"
                component={Input}
                label={"Your email"}
                // validate={required("Email")}
              />
            </div>
            <div className="field">
              <Field
                name="password"
                component={Input}
                label={"Password"}
                password
                // validate={required("Password")}
              />
            </div>
            {/* {error && (
              <div className="input_error">{formatErrorResponse(error)}</div>
            )} */}
            <Button
              type="submit"
              text={"Submit"}
              disabled={!valid}
              className="auth_button_wrap"
              // loading={isLoading}
              // style={{ marginBottom: "52px" }}
            />
            {/* </Link> */}
            {/* <div className="auth_form_sub_title center">
              Don’t have an account yet?{" "}
              <Link
                to={"/register-company"}
                style={{ color: "#005AE3", marginLeft: "6px" }}
              >
                Sign Up
              </Link>
            </div> */}
          </form>
        )}
      />
      <div className="center footer_terms">
        Copyright © We move 2023. All Rights Reserved.
      </div>
    </div>
  );
};

export default LoginForm;
