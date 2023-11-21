import { OnboardingBanner } from "../../components/layout";
import * as images from "../../assets";
// import { Form, Field } from "react-final-form";
import "./onboarding.css";
import "react-dropzone-uploader/dist/styles.css";
import { useState } from "react";
import DropzoneComponent from "./DropzoneComponent"; // Adjust the path

function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = () => setTick((tick) => tick + 1);
  return update;
}

function DocumentationPageOne() {
  const forceUpdate = useForceUpdate();
  const getUploadParams = (meta, identifier, endpoint) => {
    return {
      url: endpoint,
      headers: { Authorization: "Bearer YourAccessToken" },
      formData: [
        { name: "file", file: meta.file, options: { filename: meta.name } },
        { name: "identifier", value: identifier },
      ],
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
    allFiles.forEach((f) => f.remove());
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
            <button className="btn">
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
                  identifier="idContactPerson"
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
                  identifier="certificateOfIncorporation"
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
                  identifier="letterOfAuthorization"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn submit-btn mt-3">
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
