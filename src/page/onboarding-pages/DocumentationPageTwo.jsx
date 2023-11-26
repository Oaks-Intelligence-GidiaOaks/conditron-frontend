import { useEffect } from "react";
import { OnboardingBanner } from "../../components/layout";
import * as images from "../../assets";
import "./onboarding.css";
import rtkMutation from "../../utils/rtkMutation";
import { useRegisterOnboardingMutation } from "../../service/onboarding.service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { showAlert } from "../../static/alert";
import { REGISTER_SUCCESS } from "../../routes/CONSTANT";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../static/logout";

function DocumentationPageTwo() {
  const dispatch = useDispatch();

  const [registerOnboarding, { error, isSuccess }] =
    useRegisterOnboardingMutation({
      provideTag: ["User"],
    });

  const navigate = useNavigate();

  const data = useSelector((state) => state.onboarding);
  console.log(data);

  const complete = async () => {
    await rtkMutation(registerOnboarding, data);
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("hurray!", "Setup completed Successfully", "success");
      navigate(REGISTER_SUCCESS);
    } else if (error) {
      const errorMessage = error?.data?.errors?.[0]?.msg || "An error occurred";
      showAlert("Oops", errorMessage, "error");
    }
  }, [error, isSuccess, navigate]);

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
          {/* <p className="instructions-text px-lg-5">
            Please provide us with the following information to help complete
            your account opening
          </p> */}
        </div>
        <div className="row justify-content-center pt-5 px-lg-5 pb-5 align-items-center">
          <div className="col-lg-5">
            <img
              src={images.step_4}
              alt=""
              className="d-none d-md-none d-lg-flex"
            />
          </div>
          <div className="col-lg-5">
            <h5 className="step-form-heading">
              Thanks for providing the necessary information. We'll review the
              details and documents and reach out to you once the verification
              process is complete.
            </h5>
            <div className="step-form-box pt-3 text-center">
              <img
                src={images.docx}
                className="img-fluid"
                width={"200"}
                height={"300"}
                alt=""
              />

              <div className="text-center">
                <button
                  type="submit"
                  className="btn submit-btn mt-3"
                  onClick={complete}
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocumentationPageTwo;
