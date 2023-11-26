import { OnboardingBanner } from "../../components/layout";
import * as images from "../../assets";
import "./onboarding.css";
import "react-dropzone-uploader/dist/styles.css";
import { useState, useEffect } from "react";
import DropzoneComponent from "./DropzoneComponent";
import { useNavigate } from "react-router-dom";
import { updateOnboarding } from "../../redux/slices/onboarding.slice";
import { useDispatch } from "react-redux";
import { showAlert } from "../../static/alert";
import * as routes from "../../routes/CONSTANT";
import { replaceUnderscoresAndCapitalize } from "../../utils/formatOutputStrings";
import { handleLogout } from "../../static/logout";

function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = () => setTick((tick) => tick + 1);
  return update;
}

function DocumentationPageOne() {
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [uploadedFiles, setUploadedFiles] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);

  const getUploadParams = (meta, identifier, endpoint) => {
    return {
      url: endpoint,
    };
  };

  const handleChangeStatus = (meta, status, identifier) => {
    console.log(`Status for ${identifier}:`, status, meta);
    forceUpdate();
  };

  const handleSubmit = (files, allFiles, identifier) => {
    console.log(
      `Files submitted for ${identifier}:`,
      files.map((f) => f.meta)
    );

    setUploadedFiles((prevUploadedFiles) => ({
      ...prevUploadedFiles,
      [identifier]: {
        files: files.map((f) => f.meta),
      },
    }));

    setSubmitClicked(true);

    const name = replaceUnderscoresAndCapitalize(identifier);

    showAlert("Great", `${name} has been uploaded successfully`, "success");

    allFiles.forEach((f) => f.remove());
  };

  useEffect(() => {
    if (submitClicked && Object.keys(uploadedFiles).length > 0) {
      console.log("Uploaded Files:", uploadedFiles);
      dispatch(updateOnboarding(uploadedFiles));

      setSubmitClicked(false);
    }
  }, [uploadedFiles, submitClicked, dispatch]);

  const ButtonDisabled = Object.keys(uploadedFiles).length !== 3;
  // console.log(uploadedFiles);

  const finish = () => {
    navigate(routes.DOCUMENTATION_PAGE_TWO);
    showAlert(
      "All 3 documents has been uploaded successfully",
      "Click Finish to proceed",
      "success"
    );
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
        <div className="row justify-content-center pt-5 px-lg-5 align-items-center pb-5">
          <div className="col-lg-5">
            <img
              src={images.step_3}
              alt=""
              className="d-none d-md-none d-lg-flex"
            />
          </div>
          <div className="col-lg-5">
            <h5 className="step-form-heading">Documentation</h5>
            <div className="step-form-box pt-3">
              <div className="input-box pb-3 text-center">
                <DropzoneComponent
                  getUploadParams={(meta) =>
                    getUploadParams(
                      meta,
                      "idContactPerson",
                      "https://httpbin.org/post"
                    )
                  }
                  handleChangeStatus={handleChangeStatus}
                  handleSubmit={handleSubmit}
                  label="ID of contact person (Notarized)"
                  identifier="admin_identity_document"
                />
              </div>

              <div className="input-box pb-3 text-center">
                <DropzoneComponent
                  getUploadParams={(meta) =>
                    getUploadParams(
                      meta,
                      "certificateOfIncorporation",
                      "https://httpbin.org/post"
                    )
                  }
                  handleChangeStatus={handleChangeStatus}
                  handleSubmit={handleSubmit}
                  label="Certificate of Incorporation"
                  identifier="certificate_of_incorporation"
                />
              </div>

              <div className="input-box pb-3 text-center">
                <DropzoneComponent
                  getUploadParams={(meta) =>
                    getUploadParams(
                      meta,
                      "letterOfAuthorization",
                      "https://httpbin.org/post"
                    )
                  }
                  handleChangeStatus={handleChangeStatus}
                  handleSubmit={handleSubmit}
                  label="Letter of authorization to open account"
                  identifier="letter_of_authorization"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn submit-btn mt-3"
                  disabled={ButtonDisabled}
                  onClick={finish}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocumentationPageOne;
