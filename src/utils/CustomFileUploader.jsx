import { useField } from "react-final-form";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

const CustomFileUploader = ({ name, label }) => {
  const { input, meta } = useField(name);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "*/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      input.onChange(acceptedFiles[0]);
    },
  });

  return (
    <div className="mb-5 text-center">
      <div
        {...getRootProps()}
        className="dropzone-container rounded p-3 w-50 mx-auto d-flex justify-content-center align-items-center bg-light"
        style={{
          border: "1px dashed grey",
          height: "140px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {input.value ? (
          input.value.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(input.value)}
              alt="Selected Image"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <span>{input.value.name}</span>
          )
        ) : (
          <p className="m-0">
            Drag and drop a file here, or click to select a file
          </p>
        )}
      </div>
      <label htmlFor={name} className="form-label text-start">
        {label} <small>(optional)</small>
      </label>

      {meta.touched && meta.error && (
        <span className="text-danger">{meta.error}</span>
      )}
    </div>
  );
};

CustomFileUploader.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default CustomFileUploader;
