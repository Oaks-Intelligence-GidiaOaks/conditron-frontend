// DropzoneComponent.js
import PropTypes from "prop-types";
import Dropzone from "react-dropzone-uploader";

function DropzoneComponent({
  getUploadParams,
  handleChangeStatus,
  handleSubmit,
  label,
  identifier,
  endpoint,
}) {
  return (
    <div className="input-box pb-3 text-center">
      <label
        htmlFor="exampleFormControlInput1"
        className="form-label text-center"
      >
        {label} <span className="required">*</span>
      </label>
      <Dropzone
        getUploadParams={() => getUploadParams(identifier, endpoint)}
        onChangeStatus={(meta, status) =>
          handleChangeStatus(meta, status, identifier)
        }
        accept="image/*,application/pdf,.docx"
        maxFiles={1}
        onSubmit={(files, allFiles) =>
          handleSubmit(files, allFiles, identifier)
        }
        styles={{
          dropzone: {
            maxWidth: "519.556px",
            height: "156.333px",
            borderRadius: "3.889px",
            border: "0.778px solid #A1A4B1",
            background: "#FFF",
            boxShadow: "0px 0px 6.22222px 0.77778px rgba(0, 0, 0, 0.05)",
          },
          inputLabel: {
            color: "#C9C3C3",
            fontSize: "13px",
          },
        }}
        messages={{
          drop: "Drag and drop files or Browse",
          files: "files",
        }}
      />
    </div>
  );
}

DropzoneComponent.propTypes = {
  getUploadParams: PropTypes.func.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  endpoint: PropTypes.string,
};

export default DropzoneComponent;
